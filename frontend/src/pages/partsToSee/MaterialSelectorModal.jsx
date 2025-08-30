import React, { useEffect, useState } from "react";

export default function MaterialSelectorModal({ options, selected, onClose, onSave }) {
  const [tempSelected, setTempSelected] = useState([]);

  // selected を配列に正規化して初期チェック状態に反映
  useEffect(() => {
    if (typeof selected === "string") {
      setTempSelected(selected.split(",").map(s => s.trim()));
    } else if (Array.isArray(selected)) {
      setTempSelected(selected);
    } else {
      setTempSelected([]);
    }
  }, [selected]);

  // チェックの切り替え
  const handleToggle = (label) => {
    setTempSelected((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  // 保存処理
  const handleSave = () => {
    onSave(tempSelected);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>素材を選択してください</h3>
        <div className="checkbox-list">
          {options.map((opt) => (
            <label key={opt.code} className="checkbox-item">
              <input
                type="checkbox"
                checked={tempSelected.includes(opt.label)}
                onChange={() => handleToggle(opt.label)}
              />
              {opt.label}
            </label>
          ))}
        </div>
        <div className="modal-actions">
          <button onClick={handleSave}>保存</button>
          <button onClick={onClose} style={{ marginLeft: "10px" }}>キャンセル</button>
        </div>
      </div>
    </div>
  );
}
