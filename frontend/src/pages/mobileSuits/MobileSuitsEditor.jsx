// MobileSuitEditor.jsx
import "../../styles/MobileSuitsEditor.css";
import EditorFormFields from "../../components/mobileSuits/register/EditorFormFields";
import ModalMessage from "../../components/mobileSuits/register/ModalMessage";
import { useMobileSuitEditor } from "../../hooks/mobileSuit/useMobileSuitEditor";

export default function MobileSuitEditor({ msData, onClose, onReload }) {
  const {
    modalVisible,
    modalMessage,
    belongValue,
    handleSubmit,
  } = useMobileSuitEditor(msData, onReload, onClose);

  if (!msData) return null;

  return (
    <div className="container-mobileSuits">
      <h1>EDIT THIS MOBILE SUIT</h1>
      <form id="register-form" onSubmit={handleSubmit}>
        <EditorFormFields msData={msData} belongValue={belongValue} />
        <div className="button-group">
          <button type="submit" className="submit-button">UPDATE</button>
        </div>
      </form>
      {modalVisible && <ModalMessage message={modalMessage} />}
    </div>
  );
}
