import { io, Socket } from 'socket.io-client';
import type { ClientToServerEvents, ServerToClientEvents } from './socket-fingerprint.types';

import { toast } from 'vue3-toastify';

class SocketFingerprintService {
  private socket: Socket<ServerToClientEvents, ClientToServerEvents>;

  constructor() {

    this.socket = io('https://olimpogym.com.ar', { path: "/ws/fingerprint-service/ws", extraHeaders: {"x-api-key": "aaa"}}); // Replace with your server URL
    this.setupEventListeners();
  }

  private setupEventListeners() {
    this.socket.on('connect', () => {
      console.log('Connected to server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    this.socket.on('fingerPrintReaded', (dni: string, nombre: string) => {
      toast.info(`Huella recibida: ${nombre} - ${dni}`);
    });

    // Add more event listeners here
  }
  private static instance: SocketFingerprintService;

  public static getInstance(): SocketFingerprintService {
    if (!SocketFingerprintService.instance) {
      SocketFingerprintService.instance = new SocketFingerprintService();
    }
    return SocketFingerprintService.instance;
  }
}

export default SocketFingerprintService;