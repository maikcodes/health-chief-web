import { del, get, post, put } from '@services/http'

const SERVER_NAME = import.meta.env.VITE_BACKEND_SERVER_NAME

function mapData (data) {
  return {
    id: data.id,
    menarche: data.menarche,
    lastMenstruationDate: data.lastMenstruationDate,
    menstrualCycle: data.menstrualCycle,
    menstrualCycleDuration: data.menstrualCycleDuration,
    dysmenorrhea: data.dysmenorrhea,
    pregnanciesCount: data.pregnanciesCount,
    abortionsCount: data.abortionsCount,
    cesareansCount: data.cesareansCount,
    normalDeliveriesCount: data.normalDeliveriesCount,
    liveChildren: data.liveChildren,
    contraceptiveMethod: data.contraceptiveMethod,
    sexualDebutAge: data.sexualDebutAge,
    sexualPartnersCount: data.sexualPartnersCount,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }
}

export class GOHServices {
  static async get (id) {
    try {
      const response = await get(`${SERVER_NAME}/api/v1/gynecological-obstetric-histories/${id}`)
      return mapData(response)
    } catch (error) {
      throw new Error('Failed to get Gynecological Obstetric History')
    }
  }

  static async getAll (page = 1, limit = 10) {
    try {
      const response = await get(
        `${SERVER_NAME}/api/v1/gynecological-obstetric-histories?page=${page}&limit=${limit}`
      )
      const mappedGOH = {
        page: response.page,
        totalPages: response.total_pages,
        results: response.results,
        totalResults: response.total_results,
        data: response.data.map(mapData)
      }

      return mappedGOH
    } catch (error) {
      throw new Error('Failed to get all Gynecological Obstetric Histories')
    }
  }

  static async create (data) {
    try {
      await post(`${SERVER_NAME}/api/v1/gynecological-obstetric-histories`, data)
      return {
        success: true,
        operation: 'create',
        message: 'Gynecological Obstetric History created successfully.'
      }
    } catch (error) {
      return {
        success: false,
        operation: 'create',
        message:
          'Failed to create Gynecological Obstetric History. Please try again later.'
      }
    }
  }

  static async update (id, data) {
    try {
      await put(`${SERVER_NAME}/api/v1/gynecological-obstetric-histories/${id}`, data)
      return {
        success: true,
        operation: 'update',
        message: 'Gynecological Obstetric History updated successfully.'
      }
    } catch (error) {
      return {
        success: false,
        operation: 'update',
        message:
          'Failed to update Gynecological Obstetric History. Please try again later.'
      }
    }
  }

  static async delete (id) {
    try {
      await del(`${SERVER_NAME}/api/v1/gynecological-obstetric-histories/${id}`)
      return {
        success: true,
        operation: 'delete',
        message: 'Gynecological Obstetric History deleted successfully.'
      }
    } catch (error) {
      return {
        success: false,
        operation: 'delete',
        message:
          'Failed to delete Gynecological Obstetric History. Please try again later.'
      }
    }
  }
}
