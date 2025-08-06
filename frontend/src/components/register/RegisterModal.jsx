import "../../styles/component/register/RegisterModal.css";

export default function RegisterModal({ text }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <p>{text}</p>
      </div>
    </div>
  );
}
