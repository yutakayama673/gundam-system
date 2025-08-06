import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPartDetail } from "../../api/controller";

export default function PartDetail() {
  const { msNumber, partType, partName } = useParams();
  const navigate = useNavigate();

  // モックデータ（本来はAPIで取得）
  
  const [partInfo, setPartInfo] = useState(null);
  const [error, setError] = useState(null);
  
  // ✅ 初回マウント時にAPI呼び出し
  useEffect(() => {
    const fetchPartDetail = async () => {
      try {
        const data = await getPartDetail(msNumber, partType, partName);
        setPartInfo(data);
      } catch (e) {
        console.error("部品詳細の取得エラー:", e);
        setError("部品の情報を取得できませんでした");
      }
    };

    fetchPartDetail();
  }, [msNumber, partType, partName]);

  // ✅ モック表示中またはエラー処理
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!partInfo) return <div>読み込み中...</div>;

  return (
    <div className="container">
      <h1 className="section-title">部品詳細</h1>


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
      
       {/* 🔽 画像を container と form-section の間に配置 */}
<div className="ms-image-wrapper" style={{ marginBottom: "30px" }}>
  <img
    src={`/gundam-system${partInfo.imageUrl}`}
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
        <div className="description-box">{partInfo.function}</div>

        <h2 style={{ marginTop: "20px" }}>部品の説明</h2>
        <div className="description-box">{partInfo.description}</div>
        
                <h2 style={{ marginTop: "20px" }}>部品の素材</h2>
        <div className="description-box">{partInfo.materials}</div>
      </div>

      <div className="button-container">
        <button className="back-button" onClick={() => navigate(-1)}>← 戻る</button>
      </div>
    </div>
  );
}
