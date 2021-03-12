export interface UserRegisterDTO {
    name: string;
    email: string;
    password: string;
    confirm_password: string;
}

export interface UserLoginDTO {
    email: string;
    password: string;
}
