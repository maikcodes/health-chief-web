import { del, get, post, put } from '@services/http'

const SERVER_NAME = import.meta.env.VITE_BACKEND_SERVER_NAME

function mapData (data) {
  return {
    id: data.id,
    name: data.name,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }
}

export class RoleServices {
  static async get (id) {
    try {
      const response = await get(`${SERVER_NAME}/api/v1/roles/${id}`)
      return mapData(response)
    } catch (error) {
      throw new Error('Failed to get Role')
    }
  }

  static async getAll (page = 1, limit = 10) {
    try {
      const response = await get(
        `${SERVER_NAME}/api/v1/roles?page=${page}&limit=${limit}`
      )
      const mappedRoles = {
        page: response.page,
        totalPages: response.total_pages,
        results: response.results,
        totalResults: response.total_results,
        data: response.data.map(mapData)
      }

      return mappedRoles
    } catch (error) {
      throw new Error('Failed to get all Roles')
    }
  }

  static async create (data) {
    try {
      await post(`${SERVER_NAME}/api/v1/roles`, data)
      return {
        success: true,
        operation: 'create',
        message: 'Role created successfully.'
      }
    } catch (error) {
      return {
        success: false,
        operation: 'create',
        message: 'Failed to create Role. Please try again later.'
      }
    }
  }

  static async update (id, data) {
    try {
      await put(`${SERVER_NAME}/api/v1/roles/${id}`, data)
      return {
        success: true,
        operation: 'update',
        message: 'Role updated successfully.'
      }
    } catch (error) {
      return {
        success: false,
        operation: 'update',
        message: 'Failed to update Role. Please try again later.'
      }
    }
  }

  static async delete (id) {
    try {
      await del(`${SERVER_NAME}/api/v1/roles/${id}`)
      return {
        success: true,
        operation: 'delete',
        message: 'Role deleted successfully.'
      }
    } catch (error) {
      return {
        success: false,
        operation: 'delete',
        message: 'Failed to delete Role. Please try again later.'
      }
    }
  }
}
