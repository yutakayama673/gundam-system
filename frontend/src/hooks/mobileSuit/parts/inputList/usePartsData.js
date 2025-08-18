import { useState, useEffect } from "react";
import { getParts } from "../../../../api/mobileSuitsController";

export const usePartsData = (
  msNumber,
  partName,
  parts,
  setFunctions,
  setDescriptions,
  setMaterials
) => {
  const [dbParts, setDbParts] = useState([]); // ← DBから取得した部品リストを保持

  const partTypeMap = {
    Head: 1,
    Arms: 2,
    Body: 3,
    Legs: 4,
    Weapon: 5,
  };

  useEffect(() => {
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
        const dbPartNames = [];

        response.forEach((item) => {
          dbPartNames.push(item.partsName); // ← DBに存在する部品名を保持
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
        setDbParts(dbPartNames); // ← DBリストを更新
      } catch (err) {
        console.error("登録に失敗しました:", err);
      }
    };

    if (
      msNumber &&
      parts.length >= 0 &&
      partTypeMap[partName] &&
      setFunctions &&
      setDescriptions &&
      setMaterials
    ) {
      fetchPartsDetails();
    }
  }, [msNumber, partName, parts, setFunctions, setDescriptions, setMaterials]);

  return {
    dbParts,       // ← 初期部品リスト
    partTypeMap,
  };
};
