import ApiClient from './api.client'
import type { Membresia } from './olimpo-gym.api.types'

export class MembershipApi extends ApiClient {
  private static INSTANCE: MembershipApi

  private static BASE_URL = 'https://olimpogym.com.ar/api/olimpo-gym'

  private constructor() {
    super(MembershipApi.BASE_URL)
  }

  static GET(): MembershipApi {
    if (!MembershipApi.INSTANCE) {
      MembershipApi.INSTANCE = new MembershipApi()
    }
    return MembershipApi.INSTANCE
  }

  getAllMemberships() {
    return this.client.get<Membresia[]>('/membresia')
  }

  createMembership(membershipData: {
    nombre: string;
    precio: number;
    descripcion: string;
    activa?: boolean;
  }) {
    return this.client.post<Membresia>('/membresia', membershipData)
  }

  deactivateMembership(id: string) {
    return this.client.delete(`/membresia?id=${id}`)
  }

  getAllMembershipDurations() {
    return this.client.get<string[]>('/membresia/duracion')
  }
}
