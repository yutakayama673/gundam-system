// hooks/mobileSuit/usePartDetail.js
import { useEffect, useState } from "react";
import { getPartDetail } from "../../../api/mobileSuitsController";

export function usePartDetail(msNumber, partType, partName) {
  const [partInfo, setPartInfo] = useState(null);
  const [error, setError] = useState(null);

  const fetchPartDetail = async () => {
    try {
      const data = await getPartDetail(msNumber, partType, partName);
      setPartInfo(data);
    } catch (e) {
      console.error(e);
      setError("部品の情報を取得できませんでした");
    }
  };

  useEffect(() => {
    fetchPartDetail();
  }, [msNumber, partType, partName]);

  return { partInfo, error, refetch: fetchPartDetail }; // ← refetch を返す
}

