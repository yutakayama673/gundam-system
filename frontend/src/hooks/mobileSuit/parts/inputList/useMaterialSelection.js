import { useState } from "react";

export const useMaterialSelection = (materials, setMaterials) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const materialOptions = [
    { code: "1", label: "チタン合金" },
    { code: "2", label: "ルナチタニウム" },
    { code: "3", label: "カーボナイト" },
    { code: "4", label: "ガンダリウム合金" },
    { code: "5", label: "その他" },
  ];

  const openMaterialDialog = (index) => {
    setSelectedIndex(index);
    setIsDialogOpen(true);
  };

  const closeMaterialDialog = () => {
    setIsDialogOpen(false);
    setSelectedIndex(null);
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

  const getSelectedMaterialsText = (partName) => {
    const selectedMaterials = materials[partName] ?? [];
    return selectedMaterials.length > 0 
      ? `選択素材: ${selectedMaterials.join(", ")}` 
      : "未選択";
  };

  return {
    selectedIndex,
    isDialogOpen,
    materialOptions,
    openMaterialDialog,
    closeMaterialDialog,
    toggleMaterial,
    getSelectedMaterialsText,
  };
};