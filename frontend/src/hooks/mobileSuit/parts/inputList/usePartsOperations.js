import { deletePart } from "../../../../api/mobileSuitsController";

export const usePartsOperations = (
  parts,
  setParts,
  msNumber,
  partName,
  initialPartsCount,
  partTypeMap,
  removePartData,
  dbParts // ← 追加
) => {
  const handleAdd = () => {
    setParts([...parts, ""]);
  };

  const handleRemove = async (index, currentFunctions, currentDescriptions) => {
    const partNameToRemove = parts[index];

    if (!partNameToRemove?.trim()) {
      alert("削除対象の部品名がありません");
      return;
    }

    const confirmDelete = window.confirm(
      `「${partNameToRemove}」を削除しますか？`
    );
    if (!confirmDelete) return;

    try {
      // DBに存在する部品ならAPIで削除
      if (dbParts.includes(partNameToRemove)) {
        const partTypeId = partTypeMap[partNameToRemove] || partTypeMap[partName];
        await deletePart({ msNumber, partTypeId, partName: partNameToRemove });
      }

      // stateから削除
      const updatedParts = parts.filter((_, i) => i !== index);
      setParts(updatedParts);
      removePartData(partNameToRemove);

      alert("削除に成功しました");
    } catch (err) {
      console.error("削除に失敗:", err);
      alert("削除に失敗しました");
    }
  };

  const handlePartNameChange = (index, newNameRaw, renamePartData) => {
    const newName = newNameRaw.trim();
    const oldName = parts[index];

    const updatedParts = [...parts];
    updatedParts[index] = newName;
    setParts(updatedParts);

    renamePartData(oldName, newName);
  };

  const checkEditPermission = (index, partName) => {
    // 編集制限だけ
    if (index < initialPartsCount && index !== 0) {
      alert(
        `「${partName}」は編集できません。\n削除してから再度部品を追加してください。`
      );
      return false;
    }
    return true;
  };

  return {
    handleAdd,
    handleRemove,
    handlePartNameChange,
    checkEditPermission,
  };
};
