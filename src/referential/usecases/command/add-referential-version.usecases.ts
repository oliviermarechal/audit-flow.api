import {
    Referential,
    ReferentialRepositoryInterface,
    ReferentialVersion,
    ReferentialVersionProps,
    ReferentialVersionRepositoryInterface,
} from '../../domain';
import { Usecases } from '../../../core/domain';

export class AddReferentialVersionUsecases implements Usecases {
    constructor(
        private readonly referentialRepository: ReferentialRepositoryInterface,
        private readonly referentialVersionRepository: ReferentialVersionRepositoryInterface,
    ) {}

    async execute(
        referentialId: string,
        versionProps: ReferentialVersionProps,
    ): Promise<Referential> {
        const referential = await this.referentialRepository.find(
            referentialId,
        );

        const versionExist = referential.hasVersion(versionProps.version);
        if (versionExist) {
            // Create custom error in domain
            throw new Error('version_already_exist');
        }

        const version = ReferentialVersion.create(versionProps);
        await this.referentialVersionRepository.save(version);

        referential.versions.push(version);

        return referential;
    }
}

export const ADD_VERSION_USECASES = Symbol('AddReferentialVersionUsecases');
