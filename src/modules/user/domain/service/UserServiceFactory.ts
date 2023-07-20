import CreateUserService from "./createUser/CreateUserService";
import IUserRepository from "../repository/IUserRepository";
import CreateInterestUserService from "./createInterestUser/CreateInterestUserService";
import IHashProvider from "@common/provider/hash/IHashProvider";
import AuthenticateProvider from "@common/provider/auth/AuthenticateProvider";
import CreateUserSessionService from "./createUserSession/CreateUserSessionService";
import IFileProvider from "@common/provider/file/IFileProvider";
import IFileRepository from "@modules/file/domain/repository/IFileRepository";
import UpdateAvatarService from "./updateAvatar/UpdateAvatarSevice";

class UserServiceFactory {
    constructor (private readonly _userRepository: IUserRepository,
        private readonly _hashProvider: IHashProvider,
        private readonly _authProvider: AuthenticateProvider,
        private readonly _fileProvider: IFileProvider,
        private readonly _fileRepository: IFileRepository) {}

    public getCreateUser() {
        return new CreateUserService(this._userRepository, this._hashProvider);
    }

    public getCreateSession () {
        return new CreateUserSessionService(this._userRepository, this._hashProvider, this._authProvider);
    }

    public getUpdateAvatar(){
        return new UpdateAvatarService(this._userRepository, this._fileProvider, this._fileRepository);
    }

    public getCreateInterestUser() {
        return new CreateInterestUserService(this._userRepository);
    }
}

export default UserServiceFactory