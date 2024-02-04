import { del, get, post, put } from '@services/http'

const SERVER_NAME = import.meta.env.VITE_BACKEND_SERVER_NAME

function mapData (data) {
  return {
    id: data.id,
    status: data.status,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }
}

export class PatientServices {
  static async get (id) {
    try {
      const response = await get(`${SERVER_NAME}/api/v1/patients/${id}`)
      return mapData(response)
    } catch (error) {
      throw new Error('Failed to get Patient')
    }
  }

  static async getAll (page = 1, limit = 10) {
    try {
      const response = await get(
        `${SERVER_NAME}/api/v1/patients?page=${page}&limit=${limit}`
      )
      const mappedPatients = {
        page: response.page,
        totalPages: response.total_pages,
        results: response.results,
        totalResults: response.total_results,
        data: response.data.map(mapData)
      }

      return mappedPatients
    } catch (error) {
      throw new Error('Failed to get all Patients')
    }
  }

  static async create (data) {
    try {
      console.log(data)
      await post(`${SERVER_NAME}/api/v1/patients`, data)
      return {
        success: true,
        operation: 'create',
        message: 'Patient created successfully.'
      }
    } catch (error) {
      return {
        success: false,
        operation: 'create',
        message: 'Failed to create Patient. Please try again later.'
      }
    }
  }

  static async update (id, data) {
    try {
      await put(`${SERVER_NAME}/api/v1/patients/${id}`, data)
      return {
        success: true,
        operation: 'update',
        message: 'Patient updated successfully.'
      }
    } catch (error) {
      return {
        success: false,
        operation: 'update',
        message: 'Failed to update Patient. Please try again later.'
      }
    }
  }

  static async delete (id) {
    try {
      await del(`${SERVER_NAME}/api/v1/patients/${id}`)
      return {
        success: true,
        operation: 'delete',
        message: 'Patient deleted successfully.'
      }
    } catch (error) {
      return {
        success: false,
        operation: 'delete',
        message: 'Failed to delete Patient. Please try again later.'
      }
    }
  }
}
