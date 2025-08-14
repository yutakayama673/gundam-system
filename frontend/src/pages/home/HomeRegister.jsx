// HomeRegister.jsx
import "../../styles/HomeRegister.css";
import InputField from "../../components/register/InputField";
import TextArea from "../../components/register/TextArea";
import SelectField from "../../components/register/SelectField";
import FileInput from "../../components/register/FileInput";
import RegisterModal from "../../components/register/RegisterModal";
import { useHomeRegister } from "../../hooks/home/useHomeRegister";

export default function HomeRegister({ onComplete }) {
  const {
    formData,
    modalText,
    showModal,
    handleChange,
    handleFileChange,
    handleSubmit,
  } = useHomeRegister(onComplete);

  return (
    <div className="container-register">
      {showModal && <RegisterModal text={modalText} />}

      <h1>NEW MOBILE SUIT</h1>
      <form onSubmit={handleSubmit}>
        <InputField label="MOBILE SUIT NUMBER" name="mobileSuitNumber" value={formData.mobileSuitNumber} onChange={handleChange} required />
        <InputField label="MOBILE SUIT NAME" name="mobileSuitName" value={formData.mobileSuitName} onChange={handleChange} required />
        <InputField label="PILOT" name="pilot" value={formData.pilot} onChange={handleChange} required />
        <InputField label="START DESIGN DATE" name="startDesignDate" value={formData.startDesignDate} onChange={handleChange} required />
        <InputField label="END DESIGN DATE" name="endDesignDate" value={formData.endDesignDate} onChange={handleChange} required />

        <TextArea label="DESCRIPTION" name="message" value={formData.message} onChange={handleChange} />

        <SelectField
          label="CLIENT"
          name="belong"
          value={formData.belong}
          onChange={handleChange}
          options={[
            { value: "1", label: "地球連邦軍" },
            { value: "2", label: "ジオン軍" },
            { value: "3", label: "エゥーゴ" },
            { value: "4", label: "ティターンズ" },
            { value: "5", label: "ネオジオン軍" },
          ]}
        />

        <FileInput label="IMAGE FILE - FRONT (.png)" name="imageFront" onChange={handleFileChange} />
        <FileInput label="IMAGE FILE - BACK (.png)" name="imageBack" onChange={handleFileChange} />

        <div className="button-group">
          <button type="submit" className="submit-button">UPDATE</button>
        </div>
      </form>
    </div>
  );
}
