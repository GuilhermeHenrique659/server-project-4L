import IController from "@common/controller/IController";
import { ControllerInput, ControllerOutput } from "@common/types/ControllerIO";
import { CreateCommunityRequestDTO, CreateCommunityResponseDTO } from "./CreateCommunityControllerDTO";
import CommunityServiceFactory from "@modules/community/domain/service/CommunityServiceFactory";
import CommunityPresenter from "../../presenter/CommunityPresenter";

class CreateCommunityController implements IController {
    constructor(private readonly communityServiceFactory: CommunityServiceFactory){}

    public async handle(payload: ControllerInput<CreateCommunityRequestDTO>): Promise<ControllerOutput<CreateCommunityResponseDTO>> {
        const { data: { name, description }, user } = payload;
        const userId = user?.id as string;

        const community = await this.communityServiceFactory.getCreateCommunity().execute({ name, description, userId });

        return CommunityPresenter.createCommunity(community);
    }
}

export default CreateCommunityController;