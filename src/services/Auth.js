const SERVER_NAME = import.meta.env.VITE_BACKEND_SERVER_NAME
const authURL = SERVER_NAME + '/api/v1/auth/sign-in'

export class AuthService {
  static async login ({ email, password }) {
    const request = await fetch(authURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    const response = await request.json()

    if (!request.ok) {
      throw new Error(response?.error || 'Error trying to login.')
    }

    return { token: response.token }
  }
}
