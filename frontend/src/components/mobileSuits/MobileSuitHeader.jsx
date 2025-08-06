export default function MobileSuitHeader({ onHome, msData, isFront }) {
  const getFactionLogo = (belong) => {
    switch (belong) {
      case "地球連邦軍":
        return "/gundam-system/png/logos/earth_federation.png";
      case "ジオン軍":
        return "/gundam-system/png/logos/zeon.png";
      case "エゥーゴ":
        return "/gundam-system/png/logos/AEUG.png";
      case "ティターンズ":
        return "/gundam-system/png/logos/titans.png";
      case "ネオ・ジオン軍":
        return "/gundam-system/png/logos/neo_zeon.png";
      default:
        return "/gundam-system/png/anaheimLogo.png";
    }
  };

  const logoSrc = getFactionLogo(msData.belong);

  return (
    <>
      {/* タイトルだけ中央表示 */}
      <div className="title-row">
        <h1 className="title">Design Documents</h1>
      </div>

      {/* HOMEボタンとロゴを左右に配置 */}
      <div className="button-logo-row">
        <button type="button" className="search-button" onClick={onHome}>
          ⇦ HOME
        </button>
        {logoSrc && (
          <img src={logoSrc} alt={msData.belong} className="faction-logo" />
        )}
      </div>

      <div id="ms-section-number" className="section-title">
        {msData.mobileSuitNumber} {isFront ? "FRONT" : "BACK"}
      </div>
    </>
  );
}
