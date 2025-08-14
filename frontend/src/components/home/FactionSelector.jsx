import React from "react";
import "../../styles/Home.css"; // 不要かも

export default function FactionSelector({ faction, setFaction }) {
  return (
    <div  style={{
        display: "flex",
        justifyContent: "flex-start", // ← 左寄せに変更
        alignItems: "center",
        gap: "1rem"
      }}>
      {/* 軍勢セレクト */}
      <select
        value={faction}
        onChange={(e) => setFaction(e.target.value)}
        className="faction-select"
      >
        <option value="">-- 軍を選択 --</option>
        <option value="地球連邦軍">地球連邦軍</option>
        <option value="ジオン軍">ジオン軍</option>
        <option value="エゥーゴ">エゥーゴ</option>
        <option value="ティターンズ">ティターンズ</option>
        <option value="ネオジオン">ネオジオン</option>
      </select>
     </div>
  );
}
