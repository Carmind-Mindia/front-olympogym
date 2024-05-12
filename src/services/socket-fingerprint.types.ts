export interface ServerToClientEvents {
	fingerPrintReaded: (dni: string, nombre: string) => void
    producerState: (state: ProducerState) => void
    reSync:() => void
}

export enum ProducerState { Active = "active", NotFound = "not_found" }

export interface ClientToServerEvents {
    getAllUsers(callback: (users: Array<IFP_User>) => void): void;
    updateOrCreateuser(fpUser: IFP_User, callback: (updated: boolean) => void): void;
    deleteuser(dni: string, callback: (deleted: boolean) => void): void;
    ping: () => string
}

export interface InterServerEvents {
	ping: () => void
}

export interface SocketData {
    apiKey: string
}

export interface IFP_User {
    _id?: string,
    dni: string,
    name: string,
    lastName: string,
    lastDateVerified?: Date,
    loginId?: string,
    active?: boolean
}

