import { del, get, post, put } from '@services/http'

const SERVER_NAME = import.meta.env.VITE_BACKEND_SERVER_NAME

function mapData (data) {
  return {
    id: data.id,
    idCard: data.idCard,
    names: data.names,
    lastNames: data.lastNames,
    occupation: data.occupation,
    maritalStatus: data.maritalStatus,
    nationality: data.nationality,
    sex: data.sex,
    phoneNumber: data.phoneNumber,
    location: data.location,
    birthDate: data.birthDate,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }
}

export class PersonServices {
  static async get (id) {
    try {
      const response = await get(`${SERVER_NAME}/api/v1/persons/${id}`)
      return mapData(response)
    } catch (error) {
      throw new Error('Failed to get Person')
    }
  }

  static async getAll (page = 1, limit = 10) {
    try {
      const response = await get(
        `${SERVER_NAME}/api/v1/persons?page=${page}&limit=${limit}`
      )
      const mappedPersons = {
        page: response.page,
        totalPages: response.total_pages,
        results: response.results,
        totalResults: response.total_results,
        data: response.data.map(mapData)
      }

      return mappedPersons
    } catch (error) {
      throw new Error('Failed to get all Persons')
    }
  }

  static async create (data) {
    try {
      await post(`${SERVER_NAME}/api/v1/persons`, data)
      return {
        success: true,
        operation: 'create',
        message: 'Person created successfully.'
      }
    } catch (error) {
      return {
        success: false,
        operation: 'create',
        message: 'Failed to create Person. Please try again later.'
      }
    }
  }

  static async update (id, data) {
    try {
      await put(`${SERVER_NAME}/api/v1/persons/${id}`, data)
      return {
        success: true,
        operation: 'update',
        message: 'Person updated successfully.'
      }
    } catch (error) {
      return {
        success: false,
        operation: 'update',
        message: 'Failed to update Person. Please try again later.'
      }
    }
  }

  static async delete (id) {
    try {
      await del(`${SERVER_NAME}/api/v1/persons/${id}`)
      return {
        success: true,
        operation: 'delete',
        message: 'Person deleted successfully.'
      }
    } catch (error) {
      return {
        success: false,
        operation: 'delete',
        message: 'Failed to delete Person. Please try again later.'
      }
    }
  }
}
