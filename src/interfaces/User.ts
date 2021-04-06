export interface UserRegisterDTO {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface UserLoginDTO {
    email: string;
    password: string;
}

export interface UserSave {
    name: string;
    email: string;
    password?: string;
}

export interface UserLoad {
    id: number;
    name: string;
    email: string;
}
