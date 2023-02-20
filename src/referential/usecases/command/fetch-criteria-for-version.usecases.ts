import {
    Criteria,
    CriteriaRepositoryInterface,
    ReferentialGatewayInterface,
    ReferentialVersionRepositoryInterface,
} from '../../domain';
import { ForbiddenException, Usecases } from '../../../core/domain';

export class FetchCriteriaForVersionUsecases implements Usecases {
    constructor(
        private readonly criteriaRepository: CriteriaRepositoryInterface,
        private readonly referentialVersionRepository: ReferentialVersionRepositoryInterface,
        private readonly referentialGateway: ReferentialGatewayInterface,
    ) {}

    async execute(userId: string, versionId: string): Promise<void> {
        const version = await this.referentialVersionRepository.find(versionId);
        if (
            !(await this.referentialVersionRepository.isOwner(
                versionId,
                userId,
            ))
        ) {
            throw new ForbiddenException();
        }

        const criterias = await this.referentialGateway.fetchReferential(
            version,
        );

        if (criterias?.length > 0) {
            for (const criteriaData of criterias) {
                const criteria: Criteria = Criteria.create({
                    externalId: criteriaData.externalId,
                    label: criteriaData.label,
                    category: criteriaData.category,
                    description: criteriaData.description,
                    versionId: criteriaData.versionId,
                });

                await this.criteriaRepository.save(criteria);
            }
        }
    }
}

export const FETCH_CRITERIA_FOR_VERSION_USECASES = Symbol(
    'FetchCriteriaForVersionUseCases',
);
