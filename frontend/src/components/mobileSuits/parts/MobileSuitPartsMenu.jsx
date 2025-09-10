import React from "react";
import PartsEditorModal from './PartsEditorModal';
import { useMobileSuitPartsMenu } from "../../../hooks/mobileSuit/parts/useMobileSuitPartsMenu";

const FIXED_PART_NAMES = ["Head", "Arms", "Body", "Legs", "Weapon"];

export default function MobileSuitPartsMenu({ msData, msParts, setMsParts }) {
  const {
    msNumber,
    parts,
    editPartName,
    editParts,
    modalVisible,
    functions,
    descriptions,
    materials,
	images,
    navigate,
    setEditParts,
    setModalVisible,
    setFunctions,
    setDescriptions,
    setMaterials,
    handleEditClick,
    handleSave,
	setImages,
  } = useMobileSuitPartsMenu(msData, msParts, setMsParts);

  if (!msNumber) return null;

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
		  images={images}
		  setImages={setImages}
		  
        />
      )}
    </div>
  );
}
