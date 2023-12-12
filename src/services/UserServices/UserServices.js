const SERVER_NAME = import.meta.env.VITE_BACKEND_SERVER_NAME

function mapData (data) {
  return data.map((rawObject) => ({
    id: rawObject.id,
    firstNames: rawObject.first_names || 'name',
    lastNames: rawObject.last_names || 'last name',
    image: rawObject.image || 'https://thispersondoesnotexist.com/',
    email: rawObject.email || 'email',
    phone: rawObject.phone || '0000000000'
  }))
}

export class UserServices {
  static async getAll (page = 1, limit = 10) {
    try {
      const response = await fetch(`${SERVER_NAME}/api/v1/users?page=${page}&limit=${limit}`)
      const users = await response.json()
      const mapped = mapData(users.data)

      const mappedUsers = {
        page: users.page,
        totalPages: users.total_pages,
        results: users.results,
        totalResults: users.total_results,
        data: mapped
      }

      return mappedUsers
    } catch (error) {
      throw new Error('Failed to get all users')
    }
  }
}
