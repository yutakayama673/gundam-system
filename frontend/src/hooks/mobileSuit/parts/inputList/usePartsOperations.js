import { deletePart } from "../../../../api/mobileSuitsController";

export const usePartsOperations = (
  parts,
  setParts,
  msNumber,
  partName,
  initialPartsCount,
  partTypeMap,
  removePartData
) => {
  const handleAdd = () => {
    setParts([...parts, ""]);
  };

  const handleRemove = async (index, currentFunctions, currentDescriptions) => {
    if (parts.length === 1) return;

    const partNameToRemove = parts[index];
    const isInitial = index < initialPartsCount;

    const isEmptyNewPart = !partNameToRemove?.trim() ||
      !currentFunctions?.[partNameToRemove]?.trim() ||
      !currentDescriptions?.[partNameToRemove]?.trim();

    const confirmDelete = window.confirm(`「${partNameToRemove || "(未入力)"}」を削除しますか？`);
    if (!confirmDelete) return;

    if (!isInitial && isEmptyNewPart) {
      const updatedParts = parts.filter((_, i) => i !== index);
      setParts(updatedParts);
      removePartData(partNameToRemove);
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
      removePartData(partNameToRemove);

      alert("削除に成功しました");
      window.location.reload();
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
    if (index < initialPartsCount && index !== 0) {
      alert(`「${partName}」は編集できません。\n削除してから再度部品を追加してください。`);
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