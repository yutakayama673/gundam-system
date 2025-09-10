// hooks/useMobileSuitPartsMenu.js
import { useState } from "react";
import { saveParts, getMobileSuitsParts } from "../../../api/mobileSuitsController";
import { useNavigate } from "react-router-dom";

export function useMobileSuitPartsMenu(msData, msParts, setMsParts) {
  const [editPartName, setEditPartName] = useState(null);
  const [editParts, setEditParts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // 各入力項目の state
  const [functions, setFunctions] = useState({});
  const [descriptions, setDescriptions] = useState({});
  const [materials, setMaterials] = useState({});
  const [images, setImages] = useState({});   // ← 追加：画像も hook 側で管理

  const navigate = useNavigate();

  if (!msData || !msData.mobileSuitNumber || !msParts) {
    return { msNumber: null, parts: {}, modalVisible: false };
  }

  const msNumber = msData.mobileSuitNumber;
  const parts = msParts[msNumber] || {};

  const handleEditClick = (partName, children) => {
    setEditPartName(partName);
    setEditParts(children);
    setModalVisible(true);
  };

  const handleSave = async () => {
    const partTypeMap = {
      Head: 1,
      Arms: 2,
      Body: 3,
      Legs: 4,
      Weapon: 5,
    };

    const partTypeId = partTypeMap[editPartName];

    try {
      const structuredParts = editParts.map((partName, index) => ({
        name: partName,
        function: functions[partName] || "",
        description: descriptions[partName] || "",
        materials: materials[partName]?.join(",") || "",
        imageFile: images?.[partName] || null,   // ← state から取得
      }));

      await saveParts({
        msNumber,
        partTypeId,
        editParts: structuredParts,
      });

      alert("保存成功");
      setModalVisible(false);

      const updatedParts = await getMobileSuitsParts(msNumber);
      setMsParts(updatedParts);

    } catch (err) {
      console.error(err);
      alert("保存中にエラーが発生しました");
    }
  };

  return {
    msNumber,
    parts,
    editPartName,
    editParts,
    modalVisible,
    functions,
    descriptions,
    materials,
    images,          // ← 追加
    navigate,
    setEditParts,
    setModalVisible,
    setFunctions,
    setDescriptions,
    setMaterials,
    setImages,       // ← 追加
    handleEditClick,
    handleSave,
  };
}
