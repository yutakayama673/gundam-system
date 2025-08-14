import Register from "../../pages/login/Register"; // あなたの今の Register コンポーネント
import "../../styles/login/Modal.css"; // モーダル用の共通スタイル

export default function RegisterModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          × 閉じる
        </button>
        <Register />
      </div>
    </div>
  );
}
