import React, { useEffect, useState } from "react";
import { getParts, deletePart } from "../../api/controller";

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
  setMaterials
}) {
  const partTypeMap = {
    Head: 1,
    Arms: 2,
    Body: 3,
    Legs: 4,
    Weapon: 5,
  };

  const materialOptions = [
    { code: "1", label: "チタン合金" },
    { code: "2", label: "ルナチタニウム" },
    { code: "3", label: "カーボナイト" },
    { code: "4", label: "ガンダリウム合金" },
    { code: "5", label: "その他" },
  ];

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [initialPartsCount, setInitialPartsCount] = useState(0);

useEffect(() => {
  if (initialPartsCount === 0) {
    setInitialPartsCount(parts.length);
  }

  const fetchPartsDetails = async () => {
    try {
      const response = await getParts({
        msNumber,
        partsTypeId: partTypeMap[partName],
        parts,
      });

      const funcMap = {};
      const descMap = {};
      const mtralMap = {};

      response.forEach((item) => {
        funcMap[item.partsName] = item.function || "";
        descMap[item.partsName] = item.description || "";
        mtralMap[item.partsName] = item.materials
          ? Array.isArray(item.materials)
            ? item.materials
            : item.materials
                .split(",")
                .map((m) => m.trim())
                .filter(Boolean)
          : [];
      });

      setFunctions(funcMap);
      setDescriptions(descMap);
      setMaterials(mtralMap);
    } catch (err) {
      console.error("登録に失敗しました:", err);
    }
  };

  if (msNumber && parts.length > 0 && partTypeMap[partName]) {
    fetchPartsDetails();
  }
}, [msNumber, partName]);

  const handleChange = (index, field, value) => {
    const partKey = parts[index];
    if (!partKey?.trim()) return;

    if (field === "function") {
      setFunctions((prev) => ({ ...prev, [partKey]: value }));
    } else if (field === "description") {
      setDescriptions((prev) => ({ ...prev, [partKey]: value }));
    } else if (field === "materials") {
	  setMaterials((prev) => ({ ...prev, [partKey]: value }));
	}
    
    
  };

  const handleAdd = () => {
    setParts([...parts, ""]);
  };

  const handleRemove = async (index) => {
    if (parts.length === 1) return;

    const partNameToRemove = parts[index];
    const isInitial = index < initialPartsCount;

    const isEmptyNewPart = !partNameToRemove?.trim() ||
      !functions?.[partNameToRemove]?.trim() ||
      !descriptions?.[partNameToRemove]?.trim();

    const confirmDelete = window.confirm(`「${partNameToRemove || "(未入力)"}」を削除しますか？`);
    if (!confirmDelete) return;

    if (!isInitial && isEmptyNewPart) {
      const updatedParts = parts.filter((_, i) => i !== index);
      setParts(updatedParts);

      setFunctions((prev) => {
        const updated = { ...prev };
        delete updated[partNameToRemove];
        return updated;
      });

      setDescriptions((prev) => {
        const updated = { ...prev };
        delete updated[partNameToRemove];
        return updated;
      });
      
      setMaterials((prev) => {
        const updated = { ...prev };
        delete updated[partNameToRemove];
        return updated;
      });

      return;
    }

    try {
      const partTypeId = partTypeMap[partName];
      await deletePart({
        msNumber,
        partTypeId,
        partName: partNameToRemove,
      });

      const updatedParts = parts.filter((_, i) => i !== index);
      setParts(updatedParts);

      setFunctions((prev) => {
        const updated = { ...prev };
        delete updated[partNameToRemove];
        return updated;
      });

      setDescriptions((prev) => {
        const updated = { ...prev };
        delete updated[partNameToRemove];
        return updated;
      });
      
      setMaterials((prev) => {
        const updated = { ...prev };
        delete updated[partNameToRemove];
        return updated;
      });

      alert("削除に成功しました");
      window.location.reload();
    } catch (err) {
      console.error("削除に失敗:", err);
      alert("削除に失敗しました");
    }
  };

  const handlePartNameChange = (index, newNameRaw) => {
    const newName = newNameRaw.trim();
    const oldName = parts[index];

    const updatedParts = [...parts];
    updatedParts[index] = newName;
    setParts(updatedParts);

    if (oldName === newName) return;

    setFunctions((prev) => {
      const updated = { ...prev };
      if (updated[oldName] !== undefined) {
        updated[newName] = updated[oldName];
        delete updated[oldName];
      }
      return updated;
    });

    setDescriptions((prev) => {
      const updated = { ...prev };
      if (updated[oldName] !== undefined) {
        updated[newName] = updated[oldName];
        delete updated[oldName];
      }
      return updated;
    });
    
    setMaterials((prev) => {
      const updated = { ...prev };
      if (updated[oldName] !== undefined) {
        updated[newName] = updated[oldName];
        delete updated[oldName];
      }
      return updated;
    });
  };

  const toggleMaterial = (part, material) => {
    setMaterials((prev) => {
      const current = prev[part] || [];
      const updated = current.includes(material)
        ? current.filter((m) => m !== material)
        : [...current, material];
      return { ...prev, [part]: updated };
    });
  };

  return (
    <div className="parts-input-group">
      <h3>部品リスト</h3>
      {parts.map((part, index) => (
        <div key={index} className="part-input-row">
          <label htmlFor={`part-name-${index}`}>部品名 {index + 1}</label>
          <input
            type="text"
            value={part}
            placeholder="部品名"
            readOnly={index < initialPartsCount}
            onClick={() => {
              if (index < initialPartsCount) {
                alert(`「${part}」は編集できません。\n削除してから再度部品を追加してください。`);
              }
            }}
            onChange={(e) => {
              if (index >= initialPartsCount) {
                handlePartNameChange(index, e.target.value);
              }
            }}
          />

          <div className="form-group">
            <label htmlFor={`function-${index}`}>機能 {index + 1}</label>
            <textarea
              id={`function-${index}`}
              name={`function-${index}`}
              value={functions?.[part] ?? ""}
              onChange={(e) => handleChange(index, "function", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor={`description-${index}`}>説明 {index + 1}</label>
            <textarea
              id={`description-${index}`}
              name={`description-${index}`}
              value={descriptions?.[part] ?? ""}
              onChange={(e) => handleChange(index, "description", e.target.value)}
            />
          </div>

          <div className="form-group">
            <button
              type="button"
              onClick={() => {
                setSelectedIndex(index);
                setIsDialogOpen(true);
              }}
            >
              素材選択
            </button>
            <span style={{ marginLeft: "10px" }}>
              {(materials[part] ?? []).length > 0 ? `選択素材: ${(materials[part] ?? []).join(", ")}` : "未選択"}
            </span>
          </div>

          <div className="form-group">
            <label htmlFor={`partsImage-${index}`}>IMAGE FILE (.png)</label>
            <input
              type="file"
              id={`partsImage-${index}`}
              name="partsImage"
              accept=".png"
            />
          </div>

          <button type="button" onClick={() => handleRemove(index)}>－ 削除</button>
        </div>
      ))}

      <button type="button" onClick={handleAdd}>＋ 新規部品を追加</button>

      {isDialogOpen && selectedIndex !== null && parts[selectedIndex] && (
        <div className="modal-overlay" onClick={() => setIsDialogOpen(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              padding: "20px",
              backgroundColor: "black",
              borderRadius: "8px",
              width: "300px",
              margin: "100px auto",
              color: "white",
            }}
          >
            <h3>素材を選択してください</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {materialOptions.map((option) => (
                <li key={option.code} style={{ marginBottom: "8px" }}>
                  <label style={{ display: "block" }}>
                    <input
                      type="checkbox"
                      checked={(materials[parts[selectedIndex]] ?? []).includes(option.label)}
                      onChange={() => toggleMaterial(parts[selectedIndex], option.label)}
                    />
                    <span style={{ marginLeft: "8px" }}>{option.label}</span>
                  </label>
                </li>
              ))}
            </ul>
            <button onClick={() => setIsDialogOpen(false)}>完了</button>
          </div>
        </div>
      )}
    </div>
  );
}