import User from "@modules/user/domain/entity/User";

export type GetUserControllerOutputDTO = Omit<User, 'password'>