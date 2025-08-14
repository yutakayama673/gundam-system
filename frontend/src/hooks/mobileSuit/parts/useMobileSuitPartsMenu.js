// hooks/useMobileSuitPartsMenu.js
import { useState } from "react";
import { saveParts, getMobileSuitsParts } from "../../../api/mobileSuitsController";
import { useNavigate } from "react-router-dom";

export function useMobileSuitPartsMenu(msData, msParts, setMsParts) {
  const [editPartName, setEditPartName] = useState(null);
  const [editParts, setEditParts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [functions, setFunctions] = useState({});
  const [descriptions, setDescriptions] = useState({});
  const [materials, setMaterials] = useState({});

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

    let partTypeId = partTypeMap[editPartName];

    try {
      const structuredParts = editParts.map((partName, index) => {
        const fileInput = document.getElementById(`partsImage-${index}`);
        return {
          name: partName,
          function: functions[partName] || "",
          description: descriptions[partName] || "",
          materials: materials[partName]?.join(",") || "",
          imageFile: fileInput?.files?.[0] || null,
        };
      });

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
    navigate,
    setEditParts,
    setModalVisible,
    setFunctions,
    setDescriptions,
    setMaterials,
    handleEditClick,
    handleSave,
  };
}
