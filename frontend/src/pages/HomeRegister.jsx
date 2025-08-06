import { useState } from "react";
import "../styles/HomeRegister.css";
import { uploadMobileSuitImagesHome, registMoblieSuitsInfo } from "../api/Controller";
import InputField from "../components/register/InputField";
import TextArea from "../components/register/TextArea";
import SelectField from "../components/register/SelectField";
import FileInput from "../components/register/FileInput";
import RegisterModal from "../components/register/RegisterModal";

export default function HomeRegister({ onComplete }) {
  const [formData, setFormData] = useState({
    mobileSuitNumber: "",
    mobileSuitName: "",
    pilot: "",
    startDesignDate: "",
    endDesignDate: "",
    message: "",
    belong: "",
  });
  const [imageFront, setImageFront] = useState(null);
  const [imageBack, setImageBack] = useState(null);
  const [modalText, setModalText] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "imageFront") setImageFront(files[0]);
    if (name === "imageBack") setImageBack(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!window.confirm("この情報で更新しますか？")) return;

    const { mobileSuitNumber, mobileSuitName, pilot, startDesignDate, endDesignDate, message, belong } = formData;
    if (!mobileSuitNumber || !mobileSuitName || !pilot || !startDesignDate || !endDesignDate || !message || !belong) {
      alert("すべての項目を入力してください。");
      return;
    }

    try {
      const result = await registMoblieSuitsInfo(formData);
      await uploadMobileSuitImagesHome(mobileSuitNumber, imageFront, imageBack);
      setModalText(result.message || "登録完了！");
      setShowModal(true);
      onComplete();
    } catch (err) {
      alert("エラー: " + err.message);
    }
  };

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
