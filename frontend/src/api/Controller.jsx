// src/api/Controller.jsx

const API_BASE_URL = '/gundam-system/api'

/**
 * ログインAPI呼び出し
 * @param {string} employeeId
 * @param {string} password
 * @returns {Promise<object>} 成功時はレスポンスJSON、失敗時はthrow
 */
export async function loginUser(employeeId, password) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ employeeId, password })
  })

  if (!response.ok) {
    throw new Error('ログイン失敗')
  }

  return response.json()
}

/**
 * 登録用のAPI
 *@param {string} userId
 *@param {string} name
 *@param {string} password
 *@param {string} email
 */
 export async function registerUser(userId, name, password, email ) {
	
	const res = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeId: userId, name, password, email })
    })
	if (!res.ok) {
    	throw new Error('新規登録失敗')
    }

  return res.json()
}

/**
 * ガンダムデータをクエリ付きで取得する
 * @param {Object} params - クエリパラメータ（任意）
 * @returns {Promise<Array>} - モビルスーツ情報の配列
 */
export async function getGundamInfos(params = {}) {
  const query = new URLSearchParams(params).toString()
  const url = `${API_BASE_URL}/gumdamInfos?${query}`

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('データ取得に失敗しました')
  }
  return response.json()
}

/**
 * ログアウトAPI
 * セッション破棄のみ。レスポンスはプレーンテキストやredirect文字列等
 */
export async function logoutUser() {
  const response = await fetch(`${API_BASE_URL}/logout`)
  if (!response.ok) {
    throw new Error('ログアウトに失敗しました')
  }
  return response.text() // 特に返り値は使わない前提でもOK
}

/**
 * モビルスーツマスタ新規登録
 * 
 */
export async function registMoblieSuitsInfo(data) {
  const res = await fetch(`${API_BASE_URL}/gumdamInfoRegister`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`HTTP ${res.status}: ${errorText}`);
  }

  return res.json(); // 成功時はJSONを返す
}

/**
 * モビルスーツマスタ情報更新
 * 
 */
export async function updateMoblieSuitsInfo(mobileSuitNumber, msData) {
	
	 const response = await fetch(`${API_BASE_URL}/updateGumdamInfo/${mobileSuitNumber}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(msData),
     })
  if (!response.ok) {
    throw new Error('更新に失敗しました')
  }
  return response.text() // 特に返り値は使わない前提でもOK
}

/**
 * モビルスーツマスタ情報削除
 * 
 */
export async function deleteMobileSuits(mobileSuitNumber) {
  const response = await fetch(`${API_BASE_URL}/deleteMobileSuits/${mobileSuitNumber}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }
  });

  if (!response.ok) {
    throw new Error("削除に失敗しました");
  }

  return response.text(); // ← 返り値は使わない前提でOK
}

/**
 * ファイル更新処理
 * 
 */
export async function uploadMobileSuitImagesHome(mobileSuitNumber, imageFront, imageBack) {
  const formData = new FormData();
  formData.append("mobileSuitNumber", mobileSuitNumber);
  if (imageFront) formData.append("imageFront", imageFront);
  if (imageBack) formData.append("imageBack", imageBack);

  const response = await fetch(`${API_BASE_URL}/uploadImagesHome`, {
    method: "POST",
    body: formData,
  });

  const resultText = await response.text();
  if (!response.ok) {
    throw new Error(resultText || "画像アップロードに失敗しました");
  }

  return resultText;
}

/**
 * ファイル更新処理
 * 
 */
export async function uploadMobileSuitImages(mobileSuitNumber, imageFront, imageBack) {
  const formData = new FormData();
  formData.append("mobileSuitNumber", mobileSuitNumber);
  if (imageFront) formData.append("imageFront", imageFront);
  if (imageBack) formData.append("imageBack", imageBack);

  const response = await fetch(`${API_BASE_URL}/updateImagesMs`, {
    method: "POST",
    body: formData,
  });

  const resultText = await response.text();
  if (!response.ok) {
    throw new Error(resultText || "画像アップロードに失敗しました");
  }

  return resultText;
}

/**
 * 更新情報取得処理
 * 
 */
export async function fetchGumdamInfoByMsNum(mobileSuitNumber) {
  const response = await fetch(`${API_BASE_URL}/gumdamInfoMsNum?mobileSuitNumber=${encodeURIComponent(mobileSuitNumber)}`);
  if (!response.ok) {
    throw new Error("再取得失敗");
  }
  const jsonData = await response.json();
  return Array.isArray(jsonData) ? jsonData[0] : jsonData;
}
/**
 * 部品情報取得処理
 * 
 */
export async function getMobileSuitsParts(msNumber) {
  const res = await fetch(`${API_BASE_URL}/getMobileSuitsParts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ msNumber }),
  });
  if (!res.ok) throw new Error("通知失敗");
  return await res.json(); // ← 必ず返す！
}

/**
 * 部品登録API呼び出し
 * @param {Object} payload - { msNumber, partsTypeId, parts }
 * @returns {Promise<Object>} - APIからのレスポンスJSON
 */
export async function getParts(payload) {
  try {
    const res = await fetch(`${API_BASE_URL}/getMobileSuitsPartsInfo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("登録失敗");

    const result = await res.json();
    console.log("登録成功:", result);
    return result;
  } catch (err) {
    console.error("登録エラー:", err);
    throw err;
  }
}


/**
 * 部品情報登録
 * @param String msNumber
 * @param String partTypeId
 * @param String editParts
 * @returns {Promise<Object>} - APIからのレスポンスJSON
 */
export async function saveParts({ msNumber, partTypeId, editParts }) {
  const formData = new FormData();
  formData.append("msNumber", msNumber);
  formData.append("partTypeId", partTypeId);

  editParts.forEach((part, index) => {
    formData.append(`parts[${index}].partName`, part.name || "");
    formData.append(`parts[${index}].partsIndex`, index + 1);
    formData.append(`parts[${index}].partsFunction`, part.function || "");
    formData.append(`parts[${index}].description`, part.description || "");
    formData.append(`parts[${index}].materials`, part.materials || "");

    if (part.imageFile) {
      formData.append(`parts[${index}].imageFile`, part.imageFile); // ← Javaのフィールド名と合わせた
    }
  });

  const res = await fetch(`${API_BASE_URL}/saveMobileSuitsPartsInfo`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("保存に失敗しました");
  }

  return await res.json();
}

/**
 * 部品情報削除
 * @param String msNumber
 * @param String partTypeId
 * @param String partName
 * @returns 
 */
export async function deletePart({ msNumber, partTypeId, partName }) {
  const res = await fetch(`${API_BASE_URL}/deletePart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ msNumber, partTypeId, partName }),
  });

  const resultText = await res.text(); // ← text() に変更

  if (!res.ok) throw new Error("部品削除に失敗しました");

  return resultText; // "削除に成功しました" が返ってくる
}

// API: 部品詳細取得
export async function getPartDetail(msNumber, partType, partName) {
  const response = await fetch(`${API_BASE_URL}/detail?msNumber=${msNumber}&partType=${partType}&partName=${partName}`);
  if (!response.ok) throw new Error("部品詳細の取得に失敗しました");
  return await response.json();
}

