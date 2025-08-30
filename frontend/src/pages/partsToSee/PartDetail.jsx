import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePartDetail } from "../../hooks/mobileSuit/partsToSee/usePartDetail";
import { usePartDetailEdit } from "../../hooks/mobileSuit/partsToSee/usePartDetailEdit";
import MaterialSelectorModal from "./MaterialSelectorModal"; // ← 必要に応じてパス調整

export default function PartDetail() {
  const { msNumber, partType, partName } = useParams();
  const navigate = useNavigate();
  const { partInfo, error, refetch } = usePartDetail(msNumber, partType, partName);
  
  const { editPartInfo } = usePartDetailEdit();
  
  const [functionText, setFunctionText] = useState("");
  const [descriptionText, setDescriptionText] = useState("");


  const materialOptions = [
    { code: "1", label: "チタン合金" },
    { code: "2", label: "ルナチタニウム" },
    { code: "3", label: "カーボナイト" },
    { code: "4", label: "ガンダリウム合金" },
    { code: "5", label: "ミノフスキー粒子" },
    { code: "6", label: "その他" },
  ];

  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (partInfo?.materials) {
      const normalized = Array.isArray(partInfo.materials)
        ? partInfo.materials
        : typeof partInfo.materials === "string"
          ? partInfo.materials.split(",").map(s => s.trim())
          : [];

      setSelectedMaterials(normalized);
	  
	  if (partInfo) {
	      setFunctionText(partInfo.function || "");
	      setDescriptionText(partInfo.description || "");
	    }

    }
  }, [partInfo]);


  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!partInfo) return <div>読み込み中...</div>;

  return (
    <div className="container">
      <h1 className="section-title">
        {isEditMode ? "部品詳細 編集モード" : "部品詳細 参照モード"}
      </h1>

      <div className="form-section">
        <div className="info-row">
          <span className="info-label" style={{ fontSize: "20px" }}>モビルスーツ番号：</span>
          <span className="text-field" style={{ fontSize: "20px" }}>{msNumber}</span>
        </div>
        <div className="info-row">
          <span className="info-label" style={{ fontSize: "20px" }}>部品種別：</span>
          <span className="text-field" style={{ fontSize: "20px" }}>{partType}</span>
        </div>
        <div className="info-row">
          <span className="info-label" style={{ fontSize: "20px" }}>部品名：</span>
          <span className="text-field" style={{ fontSize: "20px" }}>{partName}</span>
        </div>
      </div>

      {/* モード切り替えボタン */}
      <div className="button-container" style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        {isEditMode ? (
          <>
		  <button
		    className="edit-button"
		    onClick={async () => {
				
			  // 確認ダイアログ
			  const isConfirmed = window.confirm("この情報で更新しますか？");
			  if (!isConfirmed) return; // キャンセルなら処理中止
				
		      try {
		        const updatedData = {
		          partName: partName,
		          function: functionText,
		          description: descriptionText,
		          materials: selectedMaterials,
		        };

		        // 1. 編集処理
		        await editPartInfo(msNumber, partType, updatedData, partName); 

		        // 2. 最新情報を再取得
		        await refetch(); 

		        // 3. 編集モード解除
		        setIsEditMode(false);
		      } catch (err) {
		        console.error("部品編集中にエラー:", err);
		        alert("編集に失敗しました");
		      }
		    }}
		  >
		    SAVE
		  </button>
            <button className="register-button" onClick={() => setIsEditMode(false)}>
              CANCEL
            </button>
          </>
        ) : (
          <button className="edit-button" onClick={() => setIsEditMode(true)}>
            EDIT
          </button>
        )}
      </div>

      {/* 画像 */}
      <div className="ms-image-wrapper" style={{ marginBottom: "30px" }}>
        <img
          src={partInfo.imageUrl?.startsWith("http") ? partInfo.imageUrl : `/gundam-system${partInfo.imageUrl}`}
          alt={partName}
          style={{
            width: "100%",
            maxWidth: "600px",
            border: "1px solid cyan",
            borderRadius: "10px",
            display: "block",
            margin: "0 auto",
            boxShadow: "0 0 15px cyan",
          }}
        />
      </div>

      <div className="form-section">
        <h2>部品の機能</h2>
        {isEditMode ? (
          <textarea
            className="description-box"
			value={functionText}
			onChange={(e) => setFunctionText(e.target.value)}
            style={{ width: "100%",height: "200px", boxSizing: "border-box", resize: "none" }}
          />
        ) : (
          <div className="description-box">{partInfo.function}</div>
        )}

        <h2 style={{ marginTop: "20px" }}>部品の説明</h2>
        {isEditMode ? (
          <textarea
            className="description-box"
			value={descriptionText}
			onChange={(e) => setDescriptionText(e.target.value)}
            style={{ width: "100%",height: "200px", boxSizing: "border-box", resize: "none" }}
          />
        ) : (
          <div className="description-box">{partInfo.description}</div>
        )}

        <h2 style={{ marginTop: "20px" }}>部品の素材</h2>
        {isEditMode ? (
          <>
            <div className="description-box">
              {selectedMaterials.length > 0 ? selectedMaterials.join(", ") : "未選択"}
            </div>
            <button className="edit-button" onClick={() => setShowModal(true)}>素材選択</button>
          </>
        ) : (
          <div className="description-box">
            {Array.isArray(partInfo.materials)
              ? partInfo.materials.join(", ")
              : partInfo.materials}
          </div>
        )}
      </div>

      <div className="button-container">
        {!isEditMode && (
          <div className="button-container">
            <button className="back-button" onClick={() => navigate(-1)}>
              ← 戻る
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <MaterialSelectorModal
          options={materialOptions}
          selected={selectedMaterials}
          onClose={() => setShowModal(false)}
          onSave={(newSelection) => {
            setSelectedMaterials(newSelection);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}