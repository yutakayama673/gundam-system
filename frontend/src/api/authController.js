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