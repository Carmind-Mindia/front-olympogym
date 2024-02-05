import { UserHubApi } from '@/services/user-hub.api'
import type { User } from '@/services/user-hub.api.types'
import { defineStore } from 'pinia'

// Definir el estado de la tienda
type UsersState = {
  users: User[]
}

export const userStore = defineStore({
  id: 'users',
  state: (): UsersState => ({
    users: []
  }),
  actions: {
    async getAllUsers() {
      try {
        const response = await UserHubApi.GET().getAllUsers()
        this.users = response.data
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
        this.users.push(response.data)
        return response.data
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
      const user = this.users.find((u) => u.Id === id)
      if (user) return user
      throw new Error('Error al obtener usuario')
    },
    async updateUser(user: User) {
      try {
        const response = await UserHubApi.GET().updateUser(user)
        this.users = this.users.map((u) => (u.Id === user.Id ? user : u))
        return response.data
      } catch (error: any) {
        if (isUserHubError(error)) {
          throw new Error(error.response.data.message)
        }
        console.error(error)
        throw new Error('Error al actualizar usuario')
      }
    }
  }
})

const isUserHubError = (error: any) => {
  return error.response && error.response.data && error.response.data.code && error.response.data.message && error.response.data.error
}
