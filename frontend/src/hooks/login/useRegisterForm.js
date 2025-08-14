import { useState } from "react";
import { registerUser } from "../../api/authController";

export function useRegisterForm(onSuccess, onError) {
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    password: "",
    email: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { userId, name, password, email } = formData;

    if (!userId || !name || !password || !email) {
      return "すべての項目を入力してください。";
    }

    if (!/^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/.test(email)) {
      return "メールアドレスの形式が正しくありません";
    }

    return null;
  };

  const submitForm = async () => {
    const errorMessage = validateForm();
    if (errorMessage) {
      onError(errorMessage);
      return;
    }

    const confirmed = window.confirm("この情報で更新しますか？");
    if (!confirmed) return;

    try {
      const result = await registerUser(
        formData.userId,
        formData.name,
        formData.password,
        formData.email
      );

      onSuccess(result.message || "登録完了！");
    } catch (error) {
      console.error("登録失敗:", error);
      onError("登録失敗");
    }
  };

  return { formData, handleChange, submitForm };
}
