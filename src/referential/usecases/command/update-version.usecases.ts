import {
    ReferentialVersion,
    ReferentialVersionRepositoryInterface,
    UpdateReferentialVersionDataInterface,
} from '../../domain';
import { ForbiddenException, Usecases } from '../../../core/domain';

export class UpdateVersionUsecases implements Usecases {
    constructor(
        private readonly referentialVersionRepository: ReferentialVersionRepositoryInterface,
    ) {}

    async execute(
        versionId: string,
        updateVersionData: UpdateReferentialVersionDataInterface,
        userId: string,
    ): Promise<ReferentialVersion> {
        const isOwner = await this.referentialVersionRepository.isOwner(
            versionId,
            userId,
        );

        if (!isOwner) {
            throw new ForbiddenException();
        }

        const version = await this.referentialVersionRepository.find(versionId);

        version.update(updateVersionData);
        return this.referentialVersionRepository.update(version);
    }
}

export const UPDATE_VERSION_USECASES = Symbol('UpdateVersionUsecases');
