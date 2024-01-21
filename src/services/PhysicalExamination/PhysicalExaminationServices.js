import { del, get, post, put } from '@services/http'

const SERVER_NAME = import.meta.env.VITE_BACKEND_SERVER_NAME

function mapData (data) {
  return {
    id: data.id,
    diseaseCode: data.diseaseCode,
    visualization: data.visualization,
    patientCheck: data.patientCheck,
    diagnosis: data.diagnosis,
    conclusion: data.conclusion,
    managementPlan: data.managementPlan,
    symptomOnsetDate: data.symptomOnsetDate,
    contingencyType: data.contingencyType,
    sickLeaveDays: data.sickLeaveDays,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }
}

export class PhysicalExaminationServices {
  static async get (id) {
    try {
      const response = await get(
        `${SERVER_NAME}/api/v1/physical-examinations/${id}`
      )
      return mapData(response)
    } catch (error) {
      throw new Error('Failed to get Physical Examination')
    }
  }

  static async getAll (page = 1, limit = 10) {
    try {
      const response = await get(
        `${SERVER_NAME}/api/v1/physical-examinations?page=${page}&limit=${limit}`
      )
      const mappedPhysicalExaminations = {
        page: response.page,
        totalPages: response.total_pages,
        results: response.results,
        totalResults: response.total_results,
        data: response.data.map(mapData)
      }

      return mappedPhysicalExaminations
    } catch (error) {
      throw new Error('Failed to get all Physical Examinations')
    }
  }

  static async create (data) {
    try {
      await post(`${SERVER_NAME}/api/v1/physical-examinations`, data)
      return {
        success: true,
        operation: 'create',
        message: 'Physical Examination created successfully.'
      }
    } catch (error) {
      return {
        success: false,
        operation: 'create',
        message:
          'Failed to create Physical Examination. Please try again later.'
      }
    }
  }

  static async update (id, data) {
    try {
      await put(`${SERVER_NAME}/api/v1/physical-examinations/${id}`, data)
      return {
        success: true,
        operation: 'update',
        message: 'Physical Examination updated successfully.'
      }
    } catch (error) {
      return {
        success: false,
        operation: 'update',
        message:
          'Failed to update Physical Examination. Please try again later.'
      }
    }
  }

  static async delete (id) {
    try {
      await del(`${SERVER_NAME}/api/v1/physical-examinations/${id}`)
      return {
        success: true,
        operation: 'delete',
        message: 'Physical Examination deleted successfully.'
      }
    } catch (error) {
      return {
        success: false,
        operation: 'delete',
        message:
          'Failed to delete Physical Examination. Please try again later.'
      }
    }
  }
}
