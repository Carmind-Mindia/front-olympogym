import { io, Socket } from 'socket.io-client'
import type { ClientToServerEvents, IFP_User, ServerToClientEvents } from './socket-fingerprint.types'

import { toast } from 'vue3-toastify'

class SocketFingerprintService {
  private socket: Socket<ServerToClientEvents, ClientToServerEvents>
  private timeout_callbacks_ms = 3000

  constructor() {
    this.socket = io('http://localhost:3005', { path: '/ws', extraHeaders: { 'x-api-key': 'aaa' } }) // Replace with your server URL
    this.setupEventListeners()
  }

  private setupEventListeners() {
    this.socket.on('connect', () => {
      console.log('Connected to server')
    })

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server')
    })

    this.socket.on('fingerPrintReaded', (dni: string, nombre: string) => {
      toast.info(`Huella recibida: ${nombre} - ${dni}`)
      console.log(`Huella recibida: ${nombre} - ${dni}`)
    })

    // Add more event listeners here
  }

  public setupReSyncCallback(callback: () => void) {
    this.socket.on('reSync', callback)
  }

  public getAllUsers(): Promise<IFP_User[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject()
      }, this.timeout_callbacks_ms)
      this.socket.emit('getAllUsers', (users: IFP_User[]) => {
        resolve(users)
      })
    })
  }

  public updateOrCreateUser(user: IFP_User): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject()
      }, this.timeout_callbacks_ms)
      this.socket.emit('updateOrCreateuser', user, (created: boolean) => {
        if (created) {
          resolve()
        } else {
          reject()
        }
      })
    })
  }

  public deleteUser(dni: string): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject()
      }, this.timeout_callbacks_ms)
      this.socket.emit('deleteuser', dni, (deleted: boolean) => {
        if (deleted) {
          resolve()
        } else {
          reject()
        }
      })
    })
  }

  private static instance: SocketFingerprintService

  public static getInstance(): SocketFingerprintService {
    if (!SocketFingerprintService.instance) {
      SocketFingerprintService.instance = new SocketFingerprintService()
    }
    return SocketFingerprintService.instance
  }
}

export default SocketFingerprintService
