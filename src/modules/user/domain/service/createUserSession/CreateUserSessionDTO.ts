import User from "../../entity/User"

export type CreateUserSessionDTO = {
    email: string,
    password: string
}

export type CreateUserSessionDTOOutput = {
    user: Pick<User, 'id' | 'name'>;
    token: string
}