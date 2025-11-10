import Register from "../Register"; // use local page Register
import "../../../styles/login/Modal.css";

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
