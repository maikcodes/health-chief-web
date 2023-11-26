const serverUrl = 'http://localhost:4000/api/'
const authURL = serverUrl + 'auth/login'

export class Auth {
  static async login (user) {
    const validUser = await fetch(authURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then((res) => res.json())
      .then((data) => console.log(data))

    return validUser
  }
}
