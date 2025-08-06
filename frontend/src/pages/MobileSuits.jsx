// MobileSuits.jsx
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/MobileSuits.css";
import MobileSuitEditor from "./MobileSuitsEditor";
import MobileSuitHeader from "../components/mobileSuits/MobileSuitHeader";
import MobileSuitImage from "../components/mobileSuits/MobileSuitImage";
import MobileSuitInfo from "../components/mobileSuits/MobileSuitInfo";
import { fetchGumdamInfoByMsNum } from '../api/Controller';
import { getMobileSuitsParts } from '../api/Controller';
import { deleteMobileSuits } from '../api/Controller';

export default function MobileSuits() {
  const [msData, setMsData] = useState(null);
  const [isFront, setIsFront] = useState(true);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingMsData, setEditingMsData] = useState(null);
  
  const [msParts, setMsParts] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  
  const closeModal = () => setIsEditorOpen(false);
  

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
  //遷移時起動
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
        
        // ✅ 追加するAPI呼び出し処理
      	if (data.mobileSuitNumber) {
  			getMobileSuitsParts(data.mobileSuitNumber)
    		.then((partsData) => {
      		setMsParts(partsData); // ← 結果を格納
      		console.log("パーツ情報取得:", partsData);
    	})
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

    const confirmDelete = window.confirm(`モビルスーツナンバー: ${msData.mobileSuitNumber} の設計書を削除しますか？`);
    if (!confirmDelete) return;
    
        const confirmDeleteSecond = window.confirm("最終確認！ 削除を行います。よろしいですか？");
    if (!confirmDeleteSecond) return;

    // ✅ APIで削除実行 → 成功したら home に遷移
    deleteMobileSuits(msData.mobileSuitNumber)
      .then(() => {
        navigate("/home");
      })
      .catch((err) => {
        console.error("削除中にエラー:", err);
        alert("削除に失敗しました");
      });

  } catch (e) {
    console.error("onDelete JSONパースエラー:", e);
  }
};


  if (!msData) return <div>読み込み中...</div>;

  return (
    <div className="container">
      <MobileSuitHeader onHome={handleHome} msData={msData} isFront={isFront} />
      <MobileSuitImage isFront={isFront} msData={msData} onToggle={toggleImage} msParts={msParts} setMsParts={setMsParts}/>
      <MobileSuitInfo msData={msData} onEdit={handleEdit} onDelete={onDelete} />

{/* Register Modal */}

      {isEditorOpen && (
        <div className="modal-overlay" onClick={() => setIsEditorOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal}>× 閉じる</button>
            <MobileSuitEditor
              msData={editingMsData}
              onClose={() => setIsEditorOpen(false)}
              onReload={reloadMsData}
              onComplete={() => {
              setIsEditorOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
