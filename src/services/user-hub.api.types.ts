export interface User {
    UserName: string;
    Password: string;
    FirstName: string;
    LastName: string;
    Roles: string[];
    DocumentType: number; //1: DNI
    DocumentNumber: string;
    RecoverPasswordToken: string;
    MustChangePassword: boolean;
    FCMToken: string;
    FCMCreateTimeStamp: string;
    AvatarColor: string;
    Phone: string;
}