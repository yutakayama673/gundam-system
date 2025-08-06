export default function EditorFormFields({ msData, belongValue }) {
  return (
    <>
      <div className="form-group">
        <label htmlFor="mobileSuitNumber">MOBILE SUIT NUMBER ※編集不可</label>
        <input type="text" id="mobileSuitNumber" name="mobileSuitNumber" readOnly defaultValue={msData.mobileSuitNumber} />
      </div>

      <div className="form-group">
        <label htmlFor="mobileSuitName">MOBILE SUIT NAME</label>
        <input type="text" id="mobileSuitName" name="mobileSuitName" defaultValue={msData.mobileSuitName} />
      </div>

      <div className="form-group">
        <label htmlFor="pilot">PILOT</label>
        <input type="text" id="pilot" name="pilot" defaultValue={msData.pilot} />
      </div>

      <div className="form-group">
        <label htmlFor="startDesignDate">START DESIGN DATE</label>
        <input type="text" id="startDesignDate" name="startDesignDate" defaultValue={msData.startDesignDate} />
      </div>

      <div className="form-group">
        <label htmlFor="endDesignDate">END DESIGN DATE</label>
        <input type="text" id="endDesignDate" name="endDesignDate" defaultValue={msData.endDesignDate} />
      </div>

      <div className="form-group">
        <label htmlFor="message">DESCRIPTION</label>
        <textarea id="message" name="message" rows={5} defaultValue={msData.message} />
      </div>

      <select
        id="belong"
        name="belong"
        value={belongValue}
        onChange={(e) => setBelongValue(e.target.value)}
       >
       <option value="">-- 選択してください --</option>
       <option value="1">地球連邦軍</option>
       <option value="2">ジオン軍</option>
       <option value="3">エゥーゴ</option>
       <option value="4">ティターンズ</option>
       <option value="5">ネオジオン軍</option>
     </select>

      <div className="form-group">
        <label htmlFor="imageFront">IMAGE FILE - FRONT (.png)</label>
        <input type="file" id="imageFront" name="imageFront" accept=".png" />
      </div>

      <div className="form-group">
        <label htmlFor="imageBack">IMAGE FILE - BACK (.png)</label>
        <input type="file" id="imageBack" name="imageBack" accept=".png" />
      </div>
    </>
  );
}
