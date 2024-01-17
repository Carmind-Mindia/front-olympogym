export interface User {
    UserName: string;
    Password: string;
    FirstName: string;
    LastName: string;
    roles: string[];
    documentType: number; //1: DNI
    documentNumber: string;
    recoverPasswordToken: string;
    mustChangePassword: boolean;
    FCMToken: string;
    FCMCreateTimeStamp: string;
}