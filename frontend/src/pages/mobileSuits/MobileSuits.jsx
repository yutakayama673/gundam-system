// MobileSuits.jsx
import "../../styles/MobileSuits.css";
import MobileSuitEditor from "./MobileSuitsEditor";
import MobileSuitHeader from "../../components/mobileSuits/MobileSuitHeader";
import MobileSuitImage from "../../components/mobileSuits/MobileSuitImage";
import MobileSuitInfo from "../../components/mobileSuits/MobileSuitInfo";
import { useMobileSuits } from "../../hooks/mobileSuit/useMobileSuits";

export default function MobileSuits() {
  const {
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
    closeModal,
  } = useMobileSuits();

  if (!msData) return <div>読み込み中...</div>;

  return (
    <div className="container">
      <MobileSuitHeader onHome={handleHome} msData={msData} isFront={isFront} />
      <MobileSuitImage
        isFront={isFront}
        msData={msData}
        onToggle={toggleImage}
        msParts={msParts}
        setMsParts={setMsParts}
      />
      <MobileSuitInfo msData={msData} onEdit={handleEdit} onDelete={onDelete} />

      {isEditorOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal}>× 閉じる</button>
            <MobileSuitEditor
              msData={editingMsData}
              onClose={closeModal}
              onReload={reloadMsData}
              onComplete={closeModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}
