export default function MobileSuitInfo({ msData, onEdit ,onDelete}) {
  return (
    <div className="form-section small-form">
      <div className="info-row" style={{ display: "flex", alignItems: "center" }}>
        <h2 id="ms-title">{msData.mobileSuitNumber} INFORMATION</h2>
          <div style={{ marginLeft: "auto", display: "flex", gap: "8px" }}>
            <button type="button" className="edit-button" onClick={onEdit}>
             EDIT
            </button>
            <button type="button" className="edit-button" onClick={onDelete}>
             DELETE
            </button>
          </div>
     </div>
      <form>
        <div className="info-row">
          <label className="info-label">MOBILE SUIT NUMBER :</label>
          <div className="text-field">{msData.mobileSuitNumber}</div>
          <label className="info-label">MOBILE SUIT NAME :</label>
          <div className="text-field">{msData.mobileSuitName}</div>
          <label className="info-label">PILOT :</label>
          <div className="text-field">{msData.pilot}</div>
        </div>
        <div className="info-row">
          <label className="info-label">START DESIGN DATE :</label>
          <div className="text-field">{msData.startDesignDate}</div>
          <label className="info-label">END DESIGN DATE :</label>
          <div className="text-field">{msData.endDesignDate}</div>
          <label className="info-label">CLIENTS :</label>
          <div className="text-field">{msData.belong}</div>
        </div>
        <label className="info-label">DESCRIPTION</label>
        <div className="description-box">{msData.message}</div>
      </form>
    </div>
  );
}
