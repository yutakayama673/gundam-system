import React, { useState, useEffect } from "react";
import "../styles/MobileSuitsEditor.css";
import { updateMoblieSuitsInfo, uploadMobileSuitImages } from '../api/Controller';
import EditorFormFields from '../components/mobileSuits/register/EditorFormFields';
import ModalMessage from '../components/mobileSuits/register/ModalMessage';

const belongNameToValue = {
  "地球連邦軍": "1",
  "ジオン軍": "2",
  "エゥーゴ": "3",
  "ティターンズ": "4",
  "ネオ・ジオン軍": "5",
};

export default function MobileSuitEditor({ msData, onClose, onReload }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("編集完了!");
  const [belongValue, setBelongValue] = useState("");

  useEffect(() => {
    if (!msData) return;
    const belong = msData.belong;
    if (typeof belong === "string" && belongNameToValue[belong]) {
      setBelongValue(belongNameToValue[belong]);
    } else if (["1", "2", "3", "4", "5"].includes(belong)) {
      setBelongValue(belong);
    } else {
      setBelongValue("");
    }
  }, [msData]);

  if (!msData) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!window.confirm("この情報で更新しますか？")) return;

    const formData = new FormData(e.target);
    const updatedData = Object.fromEntries(formData.entries());
    updatedData.belong = belongValue;
    delete updatedData.imageFront;
    delete updatedData.imageBack;

    try {
      await updateMoblieSuitsInfo(updatedData.mobileSuitNumber, updatedData);
      await updateImages(updatedData.mobileSuitNumber);
      setModalMessage("編集完了!");
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        onReload();
        onClose();
      }, 1500);
    } catch (err) {
      alert("エラー: " + err.message);
    }
  };

  const updateImages = async (msNumber) => {
    const imageFront = document.getElementById('imageFront')?.files[0];
    const imageBack = document.getElementById('imageBack')?.files[0];
    if (!imageFront && !imageBack) {
      if (!window.confirm('画像は変更不要でよろしいですか？')) return;
      return;
    }
    try {
      const result = await uploadMobileSuitImages(msNumber, imageFront, imageBack);
      alert(result);
    } catch (err) {
      alert('画像アップロードエラー: ' + err.message);
    }
  };

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
