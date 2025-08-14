// hooks/useHomeRegister.js
import { useState } from "react";
import { uploadMobileSuitImagesHome, registMoblieSuitsInfo } from "../../api/homeController";

export function useHomeRegister(onComplete) {
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
      onComplete?.();
    } catch (err) {
      alert("エラー: " + err.message);
    }
  };

  return {
    formData,
    modalText,
    showModal,
    handleChange,
    handleFileChange,
    handleSubmit,
  };
}
