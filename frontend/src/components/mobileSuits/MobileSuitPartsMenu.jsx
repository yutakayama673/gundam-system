import React, { useState } from "react";
import PartsEditorModal from './PartsEditorModal';
import { saveParts } from "../../api/controller";
import { getMobileSuitsParts } from "../../api/controller";
import { useNavigate } from "react-router-dom";

const FIXED_PART_NAMES = ["Head", "Arms", "Body", "Legs", "Weapon"];

export default function MobileSuitPartsMenu({ msData, msParts, setMsParts}) {
  const [editPartName, setEditPartName] = useState(null);
  const [editParts, setEditParts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  
  const navigate = useNavigate();

  // 機能・説明の状態管理
  const [functions, setFunctions] = useState({});
  const [descriptions, setDescriptions] = useState({});
  const [materials, setMaterials] = useState({});

  if (!msData || !msData.mobileSuitNumber || !msParts) return null;

  const msNumber = msData.mobileSuitNumber;
  const parts = msParts[msNumber] || {};

  const handleEditClick = (partName, children) => {
    setEditPartName(partName);
    setEditParts(children);
    setModalVisible(true);
  };

// MobileSuitPartsMenu の中
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

    // ✅ 保存後に msParts を最新化したい場合（呼び出し元で setMsParts が必要）
    const updatedParts = await getMobileSuitsParts(msNumber);
    console.log("最新部品一覧:", updatedParts);

    // → 親コンポーネントに setMsParts があるならここで呼ぶべき
    setMsParts(updatedParts)

  } catch (err) {
    console.error(err);
    alert("保存中にエラーが発生しました");
  }
};
  return (
    <div className="dropdown-wrapper">
      <div className="dropdown fixed-dropdown">
        <button className="tab-button">PARTS MENUS</button>
        <ul className="menu fixed-menu">
          {FIXED_PART_NAMES.map((partName) => {
            const children = parts[partName] || [];
            const tooltipText = children.length > 0 ? children.join(", ") : "パーツなし";
            return (
              <li key={partName} className="has-submenu">
                <a href="#" title={tooltipText}>{partName}</a>
                <ul className="submenu">
                  {children.map((child, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/part/${msNumber}/${partName}/${child}`);
                          }}
                         >
                        {child}
                     </a>
                    </li>
                    ))}
                  <li>
                    <a href="#" onClick={(e) => {
                      e.preventDefault();
                      handleEditClick(partName, children);
                    }}>
                      部品編集
                    </a>
                  </li>
                </ul>
              </li>
            );
          })}
        </ul>
      </div>

      {modalVisible && (
        <PartsEditorModal
          parts={editParts}
          setParts={setEditParts}
          onClose={() => setModalVisible(false)}
          onSave={handleSave}
          partName={editPartName}
          msNumber={msNumber}
          functions={functions}
          setFunctions={setFunctions}
          descriptions={descriptions}
          setDescriptions={setDescriptions}
          materials={materials}
          setMaterials={setMaterials}
        />
      )}
    </div>
  );
}
