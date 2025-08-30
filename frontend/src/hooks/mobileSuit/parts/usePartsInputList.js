import { useState, useEffect } from "react";
import { getParts, deletePart } from "../../../api/mobileSuitsController";

export function usePartsInputList({ parts, setParts, msNumber, partName, functions, setFunctions, descriptions, setDescriptions, materials, setMaterials }) {
  const partTypeMap = { Head: 1, Arms: 2, Body: 3, Legs: 4, Weapon: 5 };
  const materialOptions = [
    { code: "1", label: "チタン合金" },
    { code: "2", label: "ルナチタニウム" },
    { code: "3", label: "カーボナイト" },
    { code: "4", label: "ガンダリウム合金" },
	{ code: "5", label: "ミノフスキー粒子" },
    { code: "6", label: "その他" },
  ];

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [initialPartsCount, setInitialPartsCount] = useState(0);

  useEffect(() => {
    if (initialPartsCount === 0) setInitialPartsCount(parts.length);

    const fetchPartsDetails = async () => {
      try {
        const response = await getParts({ msNumber, partsTypeId: partTypeMap[partName], parts });
        const funcMap = {}, descMap = {}, mtralMap = {};
        response.forEach((item) => {
          funcMap[item.partsName] = item.function || "";
          descMap[item.partsName] = item.description || "";
          mtralMap[item.partsName] = item.materials ? (Array.isArray(item.materials) ? item.materials : item.materials.split(",").map(m => m.trim()).filter(Boolean)) : [];
        });
        setFunctions(funcMap);
        setDescriptions(descMap);
        setMaterials(mtralMap);
      } catch (err) {
        console.error("登録に失敗しました:", err);
      }
    };

    if (msNumber && parts.length > 0 && partTypeMap[partName]) fetchPartsDetails();
  }, [msNumber, partName]);

  const handleChange = (index, field, value) => {
    const partKey = parts[index];
    if (!partKey?.trim()) return;
    if (field === "function") setFunctions(prev => ({ ...prev, [partKey]: value }));
    else if (field === "description") setDescriptions(prev => ({ ...prev, [partKey]: value }));
    else if (field === "materials") setMaterials(prev => ({ ...prev, [partKey]: value }));
  };

  const handleAdd = () => setParts([...parts, ""]);

  const handleRemove = async (index) => {
    if (parts.length === 1) return;
    const partNameToRemove = parts[index];
    const isInitial = index < initialPartsCount;
    const isEmptyNewPart = !partNameToRemove?.trim() || !functions?.[partNameToRemove]?.trim() || !descriptions?.[partNameToRemove]?.trim();
    const confirmDelete = window.confirm(`「${partNameToRemove || "(未入力)"}」を削除しますか？`);
    if (!confirmDelete) return;

    if (!isInitial && isEmptyNewPart) {
      setParts(parts.filter((_, i) => i !== index));
      setFunctions(prev => { const updated = { ...prev }; delete updated[partNameToRemove]; return updated; });
      setDescriptions(prev => { const updated = { ...prev }; delete updated[partNameToRemove]; return updated; });
      setMaterials(prev => { const updated = { ...prev }; delete updated[partNameToRemove]; return updated; });
      return;
    }

    try {
      const partTypeId = partTypeMap[partName];
      await deletePart({ msNumber, partTypeId, partName: partNameToRemove });
      setParts(parts.filter((_, i) => i !== index));
      setFunctions(prev => { const updated = { ...prev }; delete updated[partNameToRemove]; return updated; });
      setDescriptions(prev => { const updated = { ...prev }; delete updated[partNameToRemove]; return updated; });
      setMaterials(prev => { const updated = { ...prev }; delete updated[partNameToRemove]; return updated; });
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

    setFunctions(prev => { const updated = { ...prev }; if (updated[oldName] !== undefined) { updated[newName] = updated[oldName]; delete updated[oldName]; } return updated; });
    setDescriptions(prev => { const updated = { ...prev }; if (updated[oldName] !== undefined) { updated[newName] = updated[oldName]; delete updated[oldName]; } return updated; });
    setMaterials(prev => { const updated = { ...prev }; if (updated[oldName] !== undefined) { updated[newName] = updated[oldName]; delete updated[oldName]; } return updated; });
  };

  const toggleMaterial = (index, materialLabel) => {
    const partKey = parts[index];
    setMaterials(prev => {
      const current = prev[partKey] || [];
      const updated = current.includes(materialLabel) ? current.filter(m => m !== materialLabel) : [...current, materialLabel];
      return { ...prev, [partKey]: updated };
    });
  };

  const openMaterialDialog = (index) => {
    setSelectedIndex(index);
    setIsDialogOpen(true);
  };

  return {
    partTypeMap,
    materialOptions,
    selectedIndex,
    isDialogOpen,
    initialPartsCount,
    handleChange,
    handleAdd,
    handleRemove,
    handlePartNameChange,
    toggleMaterial,
    openMaterialDialog
  };
}
