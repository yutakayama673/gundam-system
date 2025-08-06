export default function ModalMessage({ message }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <p>{message}</p>
      </div>
    </div>
  );
}