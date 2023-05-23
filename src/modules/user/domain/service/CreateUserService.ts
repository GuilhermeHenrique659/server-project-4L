import User from "../entity/User";
import UserRepository from "../repository/UserRepository";

class CreateUserService {
    constructor (
        private readonly _userRepository: UserRepository
    ) {}

    public async execute(data: Record<string, string>) {
        const emailExists = await this._userRepository.findByEmail(data.email);
        console.log(emailExists);
        
        if (emailExists) {
            console.log('email already exists');
            return new User({ email: 'email already exists '})
        }

        const user = new User(data);

        console.log(user);

        return await this._userRepository.save(user);
    }
}

export default CreateUserService;