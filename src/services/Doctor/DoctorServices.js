import { del, get, post, put } from '@services/http'

const SERVER_NAME = import.meta.env.VITE_BACKEND_SERVER_NAME

function mapData (data) {
  return {
    id: data.id,
    idSpecialty: data.idSpecialty,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }
}

export class DoctorServices {
  static async get (id) {
    try {
      const response = await get(`${SERVER_NAME}/api/v1/doctors/${id}`)
      return mapData(response)
    } catch (error) {
      throw new Error('Failed to get Doctor')
    }
  }

  static async getAll (page = 1, limit = 10) {
    try {
      const response = await get(
        `${SERVER_NAME}/api/v1/doctors?page=${page}&limit=${limit}`
      )
      const mappedDoctors = {
        page: response.page,
        totalPages: response.total_pages,
        results: response.results,
        totalResults: response.total_results,
        data: response.data.map(mapData)
      }

      return mappedDoctors
    } catch (error) {
      throw new Error('Failed to get all Doctors')
    }
  }

  static async create (data) {
    try {
      await post(`${SERVER_NAME}/api/v1/doctors`, data)
      return {
        success: true,
        operation: 'create',
        message: 'Doctor created successfully.'
      }
    } catch (error) {
      return {
        success: false,
        operation: 'create',
        message: 'Failed to create Doctor. Please try again later.'
      }
    }
  }

  static async update (id, data) {
    try {
      await put(`${SERVER_NAME}/api/v1/doctors/${id}`, data)
      return {
        success: true,
        operation: 'update',
        message: 'Doctor updated successfully.'
      }
    } catch (error) {
      return {
        success: false,
        operation: 'update',
        message: 'Failed to update Doctor. Please try again later.'
      }
    }
  }

  static async delete (id) {
    try {
      await del(`${SERVER_NAME}/api/v1/doctors/${id}`)
      return {
        success: true,
        operation: 'delete',
        message: 'Doctor deleted successfully.'
      }
    } catch (error) {
      return {
        success: false,
        operation: 'delete',
        message: 'Failed to delete Doctor. Please try again later.'
      }
    }
  }
}
