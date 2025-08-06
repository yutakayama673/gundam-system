import React, { useEffect, useState } from "react";
import PartsInputList from "./PartsInputList";
import "../../styles/Modal.css";

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
  materials,           // ← 追加
  setMaterials
}) {
  const [initialPartsCount, setInitialPartsCount] = useState(0);
  const [isSaveDisabled, setIsSaveDisabled] = useState(false);

  useEffect(() => {
    setInitialPartsCount(parts.length);
  }, []);

  useEffect(() => {
	
	//新しく追加された部品（既存は対象外）
	//部品名 / 機能 / 説明 / 素材（配列で1件以上）
	//入力漏れが1つでもあると、保存ボタンを無効にする
    const hasInvalidNewPart = parts
      .slice(initialPartsCount)
      .some((name) => {
        const n = name?.trim();
        const f = functions?.[n]?.trim();
        const d = descriptions?.[n]?.trim();
        const m = materials?.[n];
      return !n || !f || !d || !Array.isArray(m) || m.length === 0;
      });

    setIsSaveDisabled(hasInvalidNewPart);
  }, [parts, functions, descriptions, materials, initialPartsCount]);

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
        />

        <div style={{ marginTop: "20px", textAlign: "right" }}>
          <button onClick={onClose} style={{ marginRight: "10px" }}>
            CANCEL
          </button>

          {/* SAVE ボタン */}
          <button
            disabled={isSaveDisabled}
            title={isSaveDisabled ? "すべての項目を入力してください" : ""}
            onClick={onSave}
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
