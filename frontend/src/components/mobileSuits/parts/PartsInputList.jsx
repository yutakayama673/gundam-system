import React from "react";
import { usePartsData } from "../../../hooks/mobileSuit/parts/inputList/usePartsData";
import { usePartsOperations } from "../../../hooks/mobileSuit/parts/inputList/usePartsOperations";
import { useMaterialSelection } from "../../../hooks/mobileSuit/parts/inputList/useMaterialSelection";

export default function PartsInputList({
  parts,
  setParts,
  msNumber,
  partName,
  functions,
  setFunctions,
  descriptions,
  setDescriptions,
  materials,
  setMaterials,
  images,
  setImages,
}) {
  const { dbParts, partTypeMap } = usePartsData(
    msNumber,
    partName,
    parts,
    setFunctions,
    setDescriptions,
    setMaterials
  );

  const currentFunctions = functions;
  const currentDescriptions = descriptions;
  const currentMaterials = materials;

  const { handleAdd, handleRemove, checkEditPermission } = usePartsOperations(
    parts,
    setParts,
    msNumber,
    partName,
    dbParts.length, // 初期部品数
    partTypeMap,
    (partName) => {
      setFunctions((prev) => { const updated = { ...prev }; delete updated[partName]; return updated; });
      setDescriptions((prev) => { const updated = { ...prev }; delete updated[partName]; return updated; });
      setMaterials((prev) => { const updated = { ...prev }; delete updated[partName]; return updated; });
	  setImages((prev) => { const updated = { ...prev }; delete updated[partName]; return updated; });
    },
    dbParts // ← 追加
  );

  const {
    selectedIndex,
    isDialogOpen,
    materialOptions,
    openMaterialDialog,
    closeMaterialDialog,
    toggleMaterial,
    getSelectedMaterialsText,
  } = useMaterialSelection(currentMaterials, setMaterials);

  const handleChange = (index, field, value) => {
    const partKey = parts[index];
    if (!partKey?.trim()) return;

    if (field === "function") setFunctions((prev) => ({ ...prev, [partKey]: value }));
    else if (field === "description") setDescriptions((prev) => ({ ...prev, [partKey]: value }));
    else if (field === "materials") setMaterials((prev) => ({ ...prev, [partKey]: value }));
  };

  const handlePartNameChangeWrapper = (index, newNameRaw) => {
    const newName = newNameRaw.trim();
    const oldName = parts[index];
    const updatedParts = [...parts];
    updatedParts[index] = newName;
    setParts(updatedParts);

    if (oldName === newName) return;

    setFunctions((prev) => {
      const updated = { ...prev };
      if (updated[oldName] !== undefined) { updated[newName] = updated[oldName]; delete updated[oldName]; }
      return updated;
    });
    setDescriptions((prev) => {
      const updated = { ...prev };
      if (updated[oldName] !== undefined) { updated[newName] = updated[oldName]; delete updated[oldName]; }
      return updated;
    });
    setMaterials((prev) => {
      const updated = { ...prev };
      if (updated[oldName] !== undefined) { updated[newName] = updated[oldName]; delete updated[oldName]; }
      return updated;
    });
	setImages((prev) => {
	   const updated = { ...prev };
	   if (updated[oldName] !== undefined) {
	     updated[newName] = updated[oldName];
	     delete updated[oldName];
	   }
	   return updated;
	});
  };

  const handlePartNameClick = (index, partName) => {
    checkEditPermission(index, partName);
  };

  return (
    <div className="parts-input-group">
      <h3>部品リスト</h3>
      {parts.map((part, index) => (
        <div key={index} className="part-input-row">
          <label>部品名 {index + 1}</label>
          <input
            type="text"
            value={part}
            placeholder="部品名"
            readOnly={dbParts.includes(part)}
            onClick={() => handlePartNameClick(index, part)}
            onChange={(e) => handlePartNameChangeWrapper(index, e.target.value)}
          />

          <div className="form-group">
            <label>機能 {index + 1}</label>
            <textarea
              value={currentFunctions?.[part] ?? ""}
              onChange={(e) => handleChange(index, "function", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>説明 {index + 1}</label>
            <textarea
              value={currentDescriptions?.[part] ?? ""}
              onChange={(e) => handleChange(index, "description", e.target.value)}
            />
          </div>

          <div className="form-group">
            <button type="button" onClick={() => openMaterialDialog(index)}>素材選択</button>
            <span style={{ marginLeft: "10px" }}>{getSelectedMaterialsText(part)}</span>
          </div>

          <div className="form-group">
            <label>IMAGE FILE (.png)</label>
			<input
			    type="file"
			    accept=".png"
				onChange={(e) => {
				   const file = e.target.files[0] || null;
				   const partKey = parts[index]?.trim();
				   console.log("onChange file:", partKey, file);  // ← debug
				   setImages((prev) => ({ ...prev, [partKey]: file }));
				 }}
			  />
          </div>

          <button type="button" onClick={() => handleRemove(index, currentFunctions, currentDescriptions)}>－ 削除</button>
        </div>
      ))}

      <button type="button" onClick={handleAdd}>＋ 新規部品を追加</button>

      {isDialogOpen && selectedIndex !== null && parts[selectedIndex] && (
        <div className="modal-overlay" onClick={closeMaterialDialog}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding:"20px", backgroundColor:"black", borderRadius:"8px", width:"300px", margin:"100px auto", color:"white" }}>
            <h3>素材を選択してください</h3>
            <ul style={{ listStyle:"none", padding:0 }}>
              {materialOptions.map((option) => (
                <li key={option.code} style={{ marginBottom:"8px" }}>
                  <label style={{ display:"block" }}>
                    <input
                      type="checkbox"
                      checked={(currentMaterials[parts[selectedIndex]] ?? []).includes(option.label)}
                      onChange={() => toggleMaterial(parts[selectedIndex], option.label)}
                    />
                    <span style={{ marginLeft:"8px" }}>{option.label}</span>
                  </label>
                </li>
              ))}
            </ul>
            <button onClick={closeMaterialDialog}>完了</button>
          </div>
        </div>
      )}
    </div>
  );
}
