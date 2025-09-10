
import PartsInputList from "./PartsInputList";
import "../../../styles/Modal.css";
import { usePartsEditorModal } from "../../../hooks/mobileSuit/parts/usePartsEditorModal";

export default function PartsEditorModal({
  parts,
  setParts,
  onClose,
  onSave,
  partName,
  msNumber,
  functions,
  setFunctions,
  descriptions,
  setDescriptions,
  materials,
  setMaterials,
  images,
  setImages,
}) {
  const { isSaveDisabled } = usePartsEditorModal({
    parts,
    functions,
    descriptions,
    materials,
  });
  
  
  const handleSave = () => {
    console.log("images state:", images);
    const editParts = parts.map((name, index) => ({
      name: name?.trim() || `part_${index}`,
      function: functions?.[name] || "",
      description: descriptions?.[name] || "",
      materials: Array.isArray(materials?.[name])
        ? materials[name].join(",")
        : "",
      imageFile: images?.[name] || null,
    }));
    console.log("editParts:", editParts);
    onSave(editParts);
  };


  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>EDIT {partName} PARTS</h2>

        <PartsInputList
          parts={parts}
          setParts={setParts}
          msNumber={msNumber}
          partName={partName}
          functions={functions}
          setFunctions={setFunctions}
          descriptions={descriptions}
          setDescriptions={setDescriptions}
          materials={materials}
          setMaterials={setMaterials}
		  images={images}
		  setImages={setImages}
        />

        <div style={{ marginTop: "20px", textAlign: "right" }}>
          <button onClick={onClose} style={{ marginRight: "10px" }}>
            CANCEL
          </button>

          <button
            disabled={isSaveDisabled}
            title={isSaveDisabled ? "すべての項目を入力してください" : ""}
            onClick={handleSave}
            style={{
              cursor: isSaveDisabled ? "not-allowed" : "pointer",
              opacity: isSaveDisabled ? 0.5 : 1,
            }}
          >
            SAVE
          </button>
        </div>

        <button className="modal-close-button" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
}
