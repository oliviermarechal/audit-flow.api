import { ForbiddenException, Usecases } from '../../../core/domain';
import {
    Criteria,
    CriteriaRepositoryInterface,
    ReferentialVersionRepositoryInterface,
} from '../../domain';

export class ListCriteriaUsecases implements Usecases {
    constructor(
        private readonly referentialVersionRepository: ReferentialVersionRepositoryInterface,
        private readonly criteriaRepository: CriteriaRepositoryInterface,
    ) {}

    async execute(userId: string, versionId: string): Promise<Criteria[]> {
        if (
            !(await this.referentialVersionRepository.isOwner(
                versionId,
                userId,
            ))
        ) {
            throw new ForbiddenException();
        }

        return this.criteriaRepository.findByVersion(versionId);
    }
}

export const LIST_CRITERIA_USECASES = Symbol('ListCriteriaUsecases');
