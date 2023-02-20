import {
    CriteriaRepositoryInterface,
    ReferentialVersionRepositoryInterface,
} from '../../domain';
import {
    REMOVE_CRITERIA_USECASES,
    RemoveCriteriaUsecases,
} from '../../usecases';

export const RemoveCriteriaUsecaseProvider = {
    inject: [
        ReferentialVersionRepositoryInterface,
        CriteriaRepositoryInterface,
    ],
    provide: REMOVE_CRITERIA_USECASES,
    useFactory: (
        referentialVersionRepository: ReferentialVersionRepositoryInterface,
        criteriaRepository: CriteriaRepositoryInterface,
    ) => {
        return new RemoveCriteriaUsecases(
            referentialVersionRepository,
            criteriaRepository,
        );
    },
};
