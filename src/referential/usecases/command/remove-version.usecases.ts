import { ForbiddenException, Usecases } from '../../../core/domain';
import {
    ReferentialVersionRepositoryInterface,
    ReferentialVersionStatusEnum,
} from '../../domain';

export class RemoveVersionUsecases implements Usecases {
    constructor(
        private readonly referentialVersionRepository: ReferentialVersionRepositoryInterface,
    ) {}

    async execute(userId: string, versionId: string) {
        if (
            !(await this.referentialVersionRepository.isOwner(
                versionId,
                userId,
            ))
        ) {
            throw new ForbiddenException();
        }

        const version = await this.referentialVersionRepository.find(versionId);

        if (version.status !== ReferentialVersionStatusEnum.Draft) {
            throw new Error('Vous ne pouvez pas supprimer une version publié');
        }

        await this.referentialVersionRepository.remove(version.id);
    }
}

export const REMOVE_VERSION_USECASES = Symbol('RemoveVersionUsecases');
