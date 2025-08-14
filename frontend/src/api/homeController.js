
const API_BASE_URL = '/gundam-system/api'

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

