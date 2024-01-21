import { del, get, post, put } from '@services/http'

const SERVER_NAME = import.meta.env.VITE_BACKEND_SERVER_NAME

function mapData (data) {
  return {
    id: data.id,
    email: data.email,
    password: data.password,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }
}

export class UserServices {
  static async get (id) {
    try {
      const response = await get(`${SERVER_NAME}/api/v1/users/${id}`)
      return mapData(response)
    } catch (error) {
      throw new Error('Failed to get User')
    }
  }

  static async getAll (page = 1, limit = 10) {
    try {
      const response = await get(
        `${SERVER_NAME}/api/v1/users?page=${page}&limit=${limit}`
      )
      const mappedUsers = {
        page: response.page,
        totalPages: response.total_pages,
        results: response.results,
        totalResults: response.total_results,
        data: response.data.map(mapData)
      }

      return mappedUsers
    } catch (error) {
      throw new Error('Failed to get all Users')
    }
  }

  static async create (data) {
    try {
      await post(`${SERVER_NAME}/api/v1/users`, data)
      return {
        success: true,
        operation: 'create',
        message: 'User created successfully.'
      }
    } catch (error) {
      return {
        success: false,
        operation: 'create',
        message: 'Failed to create User. Please try again later.'
      }
    }
  }

  static async update (id, data) {
    try {
      await put(`${SERVER_NAME}/api/v1/users/${id}`, data)
      return {
        success: true,
        operation: 'update',
        message: 'User updated successfully.'
      }
    } catch (error) {
      return {
        success: false,
        operation: 'update',
        message: 'Failed to update User. Please try again later.'
      }
    }
  }

  static async delete (id) {
    try {
      await del(`${SERVER_NAME}/api/v1/users/${id}`)
      return {
        success: true,
        operation: 'delete',
        message: 'User deleted successfully.'
      }
    } catch (error) {
      return {
        success: false,
        operation: 'delete',
        message: 'Failed to delete User. Please try again later.'
      }
    }
  }
}
