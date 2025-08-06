import React from "react";
import MobileSuitPartsMenu from "./MobileSuitPartsMenu"; // パスは必要に応じて調整

export default function MobileSuitImage({ isFront, msData, onToggle ,msParts ,setMsParts }) {
  return (
    <>
    <div className="ms-image-wrapper">
      <div className="side-tab-container">
        <MobileSuitPartsMenu msData={msData} msParts={msParts} setMsParts={setMsParts}/> {/* ← ここ */}
      </div>

      <div className="logo-section">
        <img
          src={`/gundam-system${isFront ? msData.imageFront : msData.imageBack}`}
          alt="MOBILE SUIT"
          className="logo-image"
        />
      </div>

      <div className="form-group">
        <div className="button-container">
          <button type="button" className="back-button" onClick={() => onToggle("front")}>
            ⇦ BACK
          </button>
          <div style={{ marginLeft: "50px" }}></div>
          <button type="button" className="next-button" onClick={() => onToggle("back")}>
            NEXT ⇨
          </button>
        </div>
      </div>
     </div>
    </>
  );
}
