import { del, get, post, put } from '@services/http'

const SERVER_NAME = import.meta.env.VITE_BACKEND_SERVER_NAME

function mapData (data) {
  return data.map((rawObject) => ({
    id: rawObject.id,
    bloodType: rawObject.bloodType,
    personalSurgicalHistory: rawObject.personalSurgicalHistory,
    personalPathologicalHistory: rawObject.personalPathologicalHistory,
    familyPathologicalHistory: rawObject.familyPathologicalHistory,
    allergies: rawObject.allergies,
    createdAt: rawObject.createdAt,
    updatedAt: rawObject.updatedAt
  }))
}

export class AnamnesisServices {
  static async get (id) {
    try {
      const response = await get(`${SERVER_NAME}/api/v1/anamnesis/${id}`)
      return mapData(response)
    } catch (error) {
      throw new Error('Failed to get Anamnesis')
    }
  }

  static async getAll (page = 1, limit = 10) {
    try {
      const response = await get(
        `${SERVER_NAME}/api/v1/anamnesis?page=${page}&limit=${limit}`
      )
      const mappedAnamnesis = {
        page: response.page,
        totalPages: response.total_pages,
        results: response.results,
        totalResults: response.total_results,
        data: mapData(response.data)
      }

      return mappedAnamnesis
    } catch (error) {
      throw new Error('Failed to get all Anamnesis')
    }
  }

  static async create (data) {
    try {
      await post(`${SERVER_NAME}/api/v1/anamnesis`, data)
      return {
        success: true,
        operation: 'create',
        message: 'Anamnesis created successfully.'
      }
    } catch (error) {
      return {
        success: false,
        operation: 'create',
        message: 'Failed to create Anamnesis. Please try again later.'
      }
    }
  }

  static async update (id, data) {
    try {
      await put(`${SERVER_NAME}/api/v1/anamnesis/${id}`, data)
      return {
        success: true,
        operation: 'update',
        message: 'Anamnesis updated successfully.'
      }
    } catch (error) {
      return {
        success: false,
        operation: 'update',
        message: 'Failed to update Anamnesis. Please try again later.'
      }
    }
  }

  static async delete (id) {
    try {
      await del(`${SERVER_NAME}/api/v1/anamnesis/${id}`)
      return {
        success: true,
        operation: 'delete',
        message: 'Anamnesis deleted successfully.'
      }
    } catch (error) {
      return {
        success: false,
        operation: 'delete',
        message: 'Failed to delete Anamnesis. Please try again later.'
      }
    }
  }
}
