import { useState, useEffect } from "react";
import { getParts } from "../../../../api/mobileSuitsController";

export const usePartsData = (msNumber, partName, parts, setFunctions, setDescriptions, setMaterials) => {
  const [initialPartsCount, setInitialPartsCount] = useState(0);

  const partTypeMap = {
    Head: 1,
    Arms: 2,
    Body: 3,
    Legs: 4,
    Weapon: 5,
  };

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

    if (msNumber && parts.length > 0 && partTypeMap[partName] && setFunctions && setDescriptions && setMaterials) {
      fetchPartsDetails();
    }
  }, [msNumber, partName, parts, setFunctions, setDescriptions, setMaterials]);

  return {
    initialPartsCount,
    partTypeMap,
  };
};