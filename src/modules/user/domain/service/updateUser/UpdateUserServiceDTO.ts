export type UpdateUserServiceDTO = {
    id: string;
    name?: string;
    email?: string;
    password?: string;
    passwordToConfirm: string;
}