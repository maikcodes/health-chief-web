import { del, get, post, put } from '@services/http'

const SERVER_NAME = import.meta.env.VITE_BACKEND_SERVER_NAME

function mapData (data) {
  return {
    id: data.id,
    idPreviousAppointment: data.idPreviousAppointment,
    idPatient: data.idPatient,
    idDoctor: data.idDoctor,
    reason: data.reason,
    appointmentDate: data.appointmentDate,
    appointmentTime: data.appointmentTime,
    status: data.status,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    id_previous_appointment: data.id_previous_appointment
  }
}

export class AppointmentServices {
  static async get (id) {
    try {
      const response = await get(`${SERVER_NAME}/api/v1/appointments/${id}`)
      return mapData(response)
    } catch (error) {
      throw new Error('Failed to get Appointment')
    }
  }

  static async getAll (page = 1, limit = 10) {
    try {
      const response = await get(
        `${SERVER_NAME}/api/v1/appointments?page=${page}&limit=${limit}`
      )
      const mappedAppointments = {
        page: response.page,
        totalPages: response.total_pages,
        results: response.results,
        totalResults: response.total_results,
        data: response.data.map(mapData)
      }

      return mappedAppointments
    } catch (error) {
      throw new Error('Failed to get all Appointments')
    }
  }

  static async create (data) {
    try {
      await post(`${SERVER_NAME}/api/v1/appointments`, data)
      return {
        success: true,
        operation: 'create',
        message: 'Appointment created successfully.'
      }
    } catch (error) {
      return {
        success: false,
        operation: 'create',
        message: 'Failed to create Appointment. Please try again later.'
      }
    }
  }

  static async update (id, data) {
    try {
      await put(`${SERVER_NAME}/api/v1/appointments/${id}`, data)
      return {
        success: true,
        operation: 'update',
        message: 'Appointment updated successfully.'
      }
    } catch (error) {
      return {
        success: false,
        operation: 'update',
        message: 'Failed to update Appointment. Please try again later.'
      }
    }
  }

  static async delete (id) {
    try {
      await del(`${SERVER_NAME}/api/v1/appointments/${id}`)
      return {
        success: true,
        operation: 'delete',
        message: 'Appointment deleted successfully.'
      }
    } catch (error) {
      return {
        success: false,
        operation: 'delete',
        message: 'Failed to delete Appointment. Please try again later.'
      }
    }
  }
}
