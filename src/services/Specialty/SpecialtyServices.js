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

export class SpecialtyServices {
  static async get (id) {
    try {
      const response = await get(`${SERVER_NAME}/api/v1/specialties/${id}`)
      return mapData(response)
    } catch (error) {
      throw new Error('Failed to get Specialty')
    }
  }

  static async getAll (page = 1, limit = 10) {
    try {
      const response = await get(
        `${SERVER_NAME}/api/v1/specialties?page=${page}&limit=${limit}`
      )
      const mappedSpecialties = {
        page: response.page,
        totalPages: response.total_pages,
        results: response.results,
        totalResults: response.total_results,
        data: response.data.map(mapData)
      }

      return mappedSpecialties
    } catch (error) {
      throw new Error('Failed to get all Specialties')
    }
  }

  static async create (data) {
    try {
      await post(`${SERVER_NAME}/api/v1/specialties`, data)
      return {
        success: true,
        operation: 'create',
        message: 'Specialty created successfully.'
      }
    } catch (error) {
      return {
        success: false,
        operation: 'create',
        message: 'Failed to create Specialty. Please try again later.'
      }
    }
  }

  static async update (id, data) {
    try {
      await put(`${SERVER_NAME}/api/v1/specialties/${id}`, data)
      return {
        success: true,
        operation: 'update',
        message: 'Specialty updated successfully.'
      }
    } catch (error) {
      return {
        success: false,
        operation: 'update',
        message: 'Failed to update Specialty. Please try again later.'
      }
    }
  }

  static async delete (id) {
    try {
      await del(`${SERVER_NAME}/api/v1/specialties/${id}`)
      return {
        success: true,
        operation: 'delete',
        message: 'Specialty deleted successfully.'
      }
    } catch (error) {
      return {
        success: false,
        operation: 'delete',
        message: 'Failed to delete Specialty. Please try again later.'
      }
    }
  }
}
