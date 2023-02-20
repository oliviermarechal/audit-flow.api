import { ForbiddenException, Usecases } from '../../../core/domain';
import {
    Criteria,
    CriteriaProps,
    CriteriaRepositoryInterface,
    ReferentialVersionRepositoryInterface,
} from '../../domain';

export class CreateCriteriaUsecases implements Usecases {
    constructor(
        private readonly referentialVersionRepository: ReferentialVersionRepositoryInterface,
        private readonly criteriaRepository: CriteriaRepositoryInterface,
    ) {}

    async execute(userId, versionId: string, props: CriteriaProps) {
        if (
            !(await this.referentialVersionRepository.isOwner(
                versionId,
                userId,
            ))
        ) {
            throw new ForbiddenException();
        }

        return this.criteriaRepository.save(
            Criteria.create({ ...props, versionId }),
        );
    }
}

export const CREATE_CRITERIA_USECASES = Symbol('CreateCriteriaUsecases');
