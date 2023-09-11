import User from "@modules/user/domain/entity/User";

class UserPresenter {
    static createUserSession(user: User, token: string) {
        return {
            user: {
                id: user.id,
                name: user.name,
                avatar: user.avatar?.filename
            },
            token
        }
    }

    static updateUser(user: Partial<User>) {
        delete user.password;
        return user
    }

    static getUser(user: User) {
        if (user.password) {
            const { password, ...data } = user;
            return {
                ...data
            };
        }
        return user;
    }
}

export default UserPresenter;