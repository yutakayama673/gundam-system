// hooks/mobileSuit/usePartDetail.js
import { useEffect, useState } from "react";
import { getPartDetail } from "../../../api/mobileSuitsController";

export function usePartDetail(msNumber, partType, partName) {
  const [partInfo, setPartInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPartDetail = async () => {
      try {
        const data = await getPartDetail(msNumber, partType, partName);
        setPartInfo(data);
      } catch (e) {
        console.error("部品詳細の取得エラー:", e.response?.data || e.message);
        setError("部品の情報を取得できませんでした");
      }
    };

    fetchPartDetail();
  }, [msNumber, partType, partName]);

  return { partInfo, error };
}
