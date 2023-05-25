import User from "../entity/User";

interface IUserRepository {
    findByEmail(email: string): Promise<User | undefined>
    save(user: User): Promise<User>
}

export default IUserRepository;