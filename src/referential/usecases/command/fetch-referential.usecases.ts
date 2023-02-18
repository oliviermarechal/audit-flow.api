import {
    Criteria,
    CriteriaRepositoryInterface,
    ReferentialGatewayInterface,
    ReferentialRepositoryInterface,
} from '../../domain';
import { ForbiddenException, Usecases } from '../../../core/domain';

export class FetchReferentialUsecases implements Usecases {
    constructor(
        private readonly criteriaRepository: CriteriaRepositoryInterface,
        private readonly referentialRepository: ReferentialRepositoryInterface,
        private readonly referentialGateway: ReferentialGatewayInterface,
    ) {}

    async execute(
        referentialId: string,
        version: string,
        userId: string,
    ): Promise<void> {
        const referential = await this.referentialRepository.find(
            referentialId,
        );

        if (referential.ownerId !== userId) {
            throw new ForbiddenException();
        }

        if (!referential.hasVersion(version)) {
            throw new Error(`Version ${version} was not found`);
        }

        const criterias = await this.referentialGateway.fetchReferential(
            referential,
            version,
        );

        if (criterias?.length > 0) {
            for (const criteriaData of criterias) {
                const criteria: Criteria = {
                    externalId: criteriaData.externalId,
                    label: criteriaData.label,
                    category: criteriaData.category,
                    description: criteriaData.description,
                    implement: criteriaData.implement,
                    control: criteriaData.control,
                    referentialId: criteriaData.referentialId,
                };

                await this.criteriaRepository.save(criteria);
            }
        }
    }
}

export const FETCH_REFERENTIAL_USECASES = 'FetchReferentielUseCases';
