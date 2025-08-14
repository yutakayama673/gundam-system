import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getGundamInfos, logoutUser } from "../../api/homeController";

export function useHome() {
  const [mobileSuitNumber, setMobileSuitNumber] = useState("");
  const [mobileSuitName, setMobileSuitName] = useState("");
  const [pilot, setPilot] = useState("");
  const [gundamData, setGundamData] = useState([]);
  const [showRegister, setShowRegister] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    loadGundamData();
  }, []);

  const openRegisterModal = () => setShowRegister(true);
  const closeRegisterModal = () => setShowRegister(false);

  // 共通検索関数
  const loadGundamData = async (params) => {
    try {
      const searchParams = params ?? { mobileSuitNumber, mobileSuitName, pilot };
      const data = await getGundamInfos(searchParams);
      setGundamData(data);
    } catch (error) {
      console.error(error);
      alert("検索に失敗しました");
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/");
    } catch (error) {
      console.error("ログアウトエラー:", error);
      alert("ログアウトに失敗しました");
    }
  };

  // 新しい「リセット＆即検索」関数
  const resetFormAndReload = async () => {
    const emptyParams = { mobileSuitNumber: "", mobileSuitName: "", pilot: "" };
    // stateをクリア
    setMobileSuitNumber("");
    setMobileSuitName("");
    setPilot("");
    // 同期的に空条件で検索
    await loadGundamData(emptyParams);
  };

  const editDesign = (ms) => {
    const query = encodeURIComponent(JSON.stringify(ms));
    navigate(`/mobileSuits?ms=${query}`);
  };

  return {
    mobileSuitNumber, setMobileSuitNumber,
    mobileSuitName, setMobileSuitName,
    pilot, setPilot,
    gundamData,
    showRegister, openRegisterModal, closeRegisterModal,
    loadGundamData, handleLogout,
    resetFormAndReload, // ← 新しいリセット関数
    editDesign
  };
}
