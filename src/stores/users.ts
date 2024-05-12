import SocketFingerprintService from '@/services/socket-fingerprint'
import type { IFP_User } from '@/services/socket-fingerprint.types'
import { defineStore } from 'pinia'

// Definir el estado de la tienda
type UsersState = {
  users: IFP_User[]
}

export const userStore = defineStore({
  id: 'users',
  state: (): UsersState => ({
    users: []
  }),
  actions: {
    async getAllUsers() {
      try {
        const response = await SocketFingerprintService.getInstance().getAllUsers()
        this.users = response
        return response
      } catch (error: any) {
        if (isUserHubError(error)) {
          throw new Error(error.response.data.message)
        }
        console.error(error)
        throw new Error('Error al obtener usuarios')
      }
    },
    async createUser(user: IFP_User) {
      if (!user.dni || !user.name || !user.lastName) throw new Error('Faltan datos obligatorios')

      try {
        await SocketFingerprintService.getInstance().updateOrCreateUser(user)
        this.users.push(user)
      } catch (error: any) {
        if (isUserHubError(error)) {
          throw new Error(error.response.data.message)
        }
        console.error(error)
        throw new Error('Error al crear usuario')
      }
    },
    async getUserById(id: string) {
      if (this.users.length === 0) await this.getAllUsers()
      const user = this.users.find((u) => u._id === id)
      if (user) return user
      throw new Error('Error al obtener usuario')
    },
    async updateUser(user: IFP_User) {
      try {
        await SocketFingerprintService.getInstance().updateOrCreateUser(user)
        this.users = this.users.map((u) => (u._id === user._id ? user : u))
      } catch (error: any) {
        if (isUserHubError(error)) {
          throw new Error(error.response.data.message)
        }
        console.error(error)
        throw new Error('Error al actualizar usuario')
      }
    },
    async deleteUser(dni: string) {
      try {
        await SocketFingerprintService.getInstance().deleteUser(dni)
        this.users = this.users.filter((u) => u.dni !== dni)
      } catch (error: any) {
        if (isUserHubError(error)) {
          throw new Error(error.response.data.message)
        }
        console.error(error)
        throw new Error('Error al eliminar usuario')
      }
    }
  }
})

SocketFingerprintService.getInstance().setupReSyncCallback(() => {
  userStore().getAllUsers()
})

const isUserHubError = (error: any) => {
  return error.response && error.response.data && error.response.data.code && error.response.data.message && error.response.data.error
}
