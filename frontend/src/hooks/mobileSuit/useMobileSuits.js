// hooks/useMobileSuits.js
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchGumdamInfoByMsNum, 
	getMobileSuitsParts, 
	deleteMobileSuits } from "../../api/mobileSuitsController";

export function useMobileSuits() {
  const [msData, setMsData] = useState(null);
  const [isFront, setIsFront] = useState(true);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingMsData, setEditingMsData] = useState(null);
  const [msParts, setMsParts] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const belongIdToName = {
    "1": "地球連邦軍",
    "2": "ジオン軍",
    "3": "エゥーゴ",
    "4": "ティターンズ",
    "5": "ネオ・ジオン軍",
  };

  const belongNameToId = {
    "地球連邦軍": "1",
    "ジオン軍": "2",
    "エゥーゴ": "3",
    "ティターンズ": "4",
    "ネオ・ジオン軍": "5",
  };

  // 初回表示時にURLからMS情報を取得
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const msParam = params.get("ms");
    if (msParam) {
      try {
        const parsed = JSON.parse(msParam);
        const data = Array.isArray(parsed) ? parsed[0] : parsed;
        const displayData = {
          ...data,
          belong: belongIdToName[data.belong] || data.belong || "",
        };
        setMsData(displayData);

        if (data.mobileSuitNumber) {
          getMobileSuitsParts(data.mobileSuitNumber)
            .then((partsData) => setMsParts(partsData))
            .catch((err) => console.error("パーツ情報取得エラー:", err));
        }
      } catch (e) {
        console.error("JSONパースエラー:", e);
      }
    }
  }, [location]);

  const handleHome = () => navigate("/home");

  const toggleImage = (direction) => setIsFront(direction === "front");

  const handleEdit = () => {
    if (!msData) return;
    const editingData = {
      ...msData,
      belong: belongNameToId[msData.belong] || "",
    };
    setEditingMsData(editingData);
    setIsEditorOpen(true);
  };

  const reloadMsData = async () => {
    try {
      const updated = await fetchGumdamInfoByMsNum(msData.mobileSuitNumber);
      setMsData(updated);
    } catch (e) {
      alert("再読み込みに失敗しました: " + e.message);
    }
  };

  const onDelete = () => {
    try {
      if (!msData?.mobileSuitNumber) return;

      const confirmDelete = window.confirm(
        `モビルスーツナンバー: ${msData.mobileSuitNumber} の設計書を削除しますか？`
      );
      if (!confirmDelete) return;

      const confirmDeleteSecond = window.confirm("最終確認！ 削除を行います。よろしいですか？");
      if (!confirmDeleteSecond) return;

      deleteMobileSuits(msData.mobileSuitNumber)
        .then(() => navigate("/home"))
        .catch((err) => {
          console.error("削除中にエラー:", err);
          alert("削除に失敗しました");
        });
    } catch (e) {
      console.error("onDelete JSONパースエラー:", e);
    }
  };

  return {
    msData,
    isFront,
    isEditorOpen,
    editingMsData,
    msParts,
    setMsParts,
    handleHome,
    toggleImage,
    handleEdit,
    reloadMsData,
    onDelete,
    closeModal: () => setIsEditorOpen(false),
  };
}
