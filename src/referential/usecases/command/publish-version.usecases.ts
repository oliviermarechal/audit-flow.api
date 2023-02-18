import { ForbiddenException, Usecases } from '../../../core/domain';
import {
    ReferentialVersionRepositoryInterface,
    ReferentialVersionStatusEnum,
} from '../../domain';

export class PublishVersionUsecases implements Usecases {
    constructor(
        public readonly referentialVersionRepository: ReferentialVersionRepositoryInterface,
    ) {}
    async execute(versionId: string, userId: string) {
        const isOwner = await this.referentialVersionRepository.isOwner(
            versionId,
            userId,
        );

        if (!isOwner) {
            throw new ForbiddenException();
        }

        return this.referentialVersionRepository.updateStatus(
            versionId,
            ReferentialVersionStatusEnum.Published,
        );
    }
}

export const PUBLISH_VERSION_USECASES = Symbol('PublishVersionUsecases');
