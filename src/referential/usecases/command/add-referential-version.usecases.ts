import {
    ReferentialRepositoryInterface,
    ReferentialVersion,
    ReferentialVersionProps,
    ReferentialVersionRepositoryInterface,
} from '../../domain';
import { ForbiddenException, Usecases } from '../../../core/domain';

export class AddReferentialVersionUsecases implements Usecases {
    constructor(
        private readonly referentialRepository: ReferentialRepositoryInterface,
        private readonly referentialVersionRepository: ReferentialVersionRepositoryInterface,
    ) {}

    async execute(
        referentialId: string,
        versionProps: ReferentialVersionProps,
        userId: string,
    ): Promise<ReferentialVersion> {
        const referential = await this.referentialRepository.find(
            referentialId,
        );

        if (referential.ownerId !== userId) {
            throw new ForbiddenException();
        }

        const versionExist = referential.hasVersion(versionProps.version);
        if (versionExist) {
            // Create custom error in domain
            throw new Error('version_already_exist');
        }

        const version = ReferentialVersion.create({
            ...versionProps,
            referentialId,
        });
        return this.referentialVersionRepository.save(version);
    }
}

export const ADD_VERSION_USECASES = Symbol('AddReferentialVersionUsecases');
