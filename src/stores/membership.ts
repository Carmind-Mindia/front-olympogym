import { MembershipApi } from '@/services/olimpo-gym.api'
import type { Membresia } from '@/services/olimpo-gym.api.types'
import { defineStore } from 'pinia'

// Definir el estado de la tienda
type MembershipsState = {
  memberships: Membresia[]
}

export const membershipStore = defineStore({
  id: 'memberships',
  state: (): MembershipsState => ({
    memberships: []
  }),
  actions: {
    async getAllMemberships() {
      try {
        const response = await MembershipApi.GET().getAllMemberships()
        this.memberships = response.data
        return response.data
      } catch (error: any) {
        console.error(error)
        throw new Error('Error al obtener las membresías')
      }
    },
    async createMembership(membership: Membresia) {
      try {
        const response = await MembershipApi.GET().createMembership(membership)
        this.memberships.push(response.data)
        return response.data
      } catch (error: any) {
        console.error(error)
        throw new Error('Error al crear membresía')
      }
    },
    async deactivateMembership(id: string) {
      try {
        await MembershipApi.GET().deactivateMembership(id)
        this.memberships = this.memberships.filter((m) => m._id !== id)
      } catch (error: any) {
        console.error(error)
        throw new Error('Error al desactivar membresía')
      }
    },
    async getMembershipById(id: string) {
      try {
        if (!this.memberships.length) {
          await this.getAllMemberships()
        }
        return this.memberships.find((m) => m._id === id)
      } catch (error: any) {
        console.error(error)
        throw new Error('Error al obtener membresía')
      }
    },
  }
})
