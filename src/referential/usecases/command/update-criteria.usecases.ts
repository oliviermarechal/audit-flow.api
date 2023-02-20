import { ForbiddenException, Usecases } from '../../../core/domain';
import {
    CriteriaProps,
    CriteriaRepositoryInterface,
    ReferentialVersionRepositoryInterface,
} from '../../domain';

export class UpdateCriteriaUsecases implements Usecases {
    constructor(
        private readonly referentialVersionRepository: ReferentialVersionRepositoryInterface,
        private readonly criteriaRepository: CriteriaRepositoryInterface,
    ) {}

    async execute(userId: string, criteriaId: string, props: CriteriaProps) {
        const criteria = await this.criteriaRepository.find(criteriaId);

        if (
            !(await this.referentialVersionRepository.isOwner(
                criteria.versionId,
                userId,
            ))
        ) {
            throw new ForbiddenException();
        }

        criteria.update({ ...props, versionId: criteria.versionId });

        return this.criteriaRepository.update(criteria);
    }
}

export const UPDATE_CRITERIA_USECASES = Symbol('UpdateCriteriaUsecases');
