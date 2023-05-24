import User from "@modules/user/domain/entity/User";

export type CreateUserServiceDTO = Omit<User, 'id' | 'label'>