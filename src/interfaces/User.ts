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
