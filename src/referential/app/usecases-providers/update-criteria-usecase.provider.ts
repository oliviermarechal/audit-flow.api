import {
    CriteriaRepositoryInterface,
    ReferentialVersionRepositoryInterface,
} from '../../domain';
import {
    UPDATE_CRITERIA_USECASES,
    UpdateCriteriaUsecases,
} from '../../usecases';

export const UpdateCriteriaUsecaseProvider = {
    inject: [
        ReferentialVersionRepositoryInterface,
        CriteriaRepositoryInterface,
    ],
    provide: UPDATE_CRITERIA_USECASES,
    useFactory: (
        referentialVersionRepository: ReferentialVersionRepositoryInterface,
        criteriaRepository: CriteriaRepositoryInterface,
    ) => {
        return new UpdateCriteriaUsecases(
            referentialVersionRepository,
            criteriaRepository,
        );
    },
};
