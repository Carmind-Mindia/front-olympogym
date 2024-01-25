import { UserHubApi } from '@/services/user-hub.api'
import type { User } from '@/services/user-hub.api.types'
import { defineStore } from 'pinia'

// Definir el estado de la tienda
type Authentication = {
  username?: string
}

export const authStore = defineStore({
  id: 'auth',
  state: (): Authentication => ({
    username: undefined
  }),
  actions: {
    async login(username: string, password: string) {
      try {
        return await UserHubApi.GET().login({ username, password })
      } catch (error: any) {
        if (isUserHubError(error)) {
          throw new Error(error.response.data.message)
        }
        console.error(error)
        throw new Error('Error al iniciar sesión')
      }
    },
    async logout() {
      try {
        return await UserHubApi.GET().logout()
      } catch (error: any) {
        if (isUserHubError(error)) {
          throw new Error(error.response.data.message)
        }
        console.error(error)
        throw new Error('Error al cerrar sesión')
      }
    },
    async forgotPassword(email: string) {
      try {
        return await UserHubApi.GET().sendRecoverPassword(email)
      } catch (error: any) {
        if (isUserHubError(error)) {
          throw new Error(error.response.data.message)
        }
        console.error(error)
        throw new Error('Error al recuperar contraseña')
      }
    },
    async validateResetPasswordCode(code: string, email: string) {
      try {
        return await UserHubApi.GET().validateResetPasswordCode(code, email)
      } catch (error: any) {
        if (isUserHubError(error)) {
          throw new Error(error.response.data.message)
        }
        console.error(error)
        throw new Error('Error al validar código')
      }
    },
    async resetPassword(code: string, email: string, newPassword: string) {
      try {
        return await UserHubApi.GET().resetPassword(code, email, newPassword)
      } catch (error: any) {
        if (isUserHubError(error)) {
          throw new Error(error.response.data.message)
        }
        console.error(error)
        throw new Error('Error al cambiar contraseña')
      }
    },
    async getAllUsers() {
      try {
        const response = await UserHubApi.GET().getAllUsers()
        return response.data
      } catch (error: any) {
        if (isUserHubError(error)) {
          throw new Error(error.response.data.message)
        }
        console.error(error)
        throw new Error('Error al obtener usuarios')
      }
    },
    async createUser(user: User) {
      if (!user.FirstName || !user.LastName || !user.DocumentNumber) throw new Error('Faltan datos obligatorios')

      user.DocumentType = 1
      user.UserName = user.DocumentNumber
      user.Password = user.DocumentNumber

      try {
        const response = await UserHubApi.GET().insertUser(user)
        return response.data
      } catch (error: any) {
        if (isUserHubError(error)) {
          throw new Error(error.response.data.message)
        }
        console.error(error)
        throw new Error('Error al crear usuario')
      }
    }
  }
})

const isUserHubError = (error: any) => {
  return error.response && error.response.data && error.response.data.code && error.response.data.message && error.response.data.error
}
