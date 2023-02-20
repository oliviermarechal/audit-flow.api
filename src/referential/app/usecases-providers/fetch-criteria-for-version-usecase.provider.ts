import {
    CriteriaRepositoryInterface,
    ReferentialGatewayInterface,
    ReferentialVersionRepositoryInterface,
} from '../../domain';
import {
    FETCH_CRITERIA_FOR_VERSION_USECASES,
    FetchCriteriaForVersionUsecases,
} from '../../usecases';

export const FetchCriteriaForVersionUsecaseProvider = {
    inject: [
        CriteriaRepositoryInterface,
        ReferentialVersionRepositoryInterface,
        ReferentialGatewayInterface,
    ],
    provide: FETCH_CRITERIA_FOR_VERSION_USECASES,
    useFactory: (
        criteriaRepository: CriteriaRepositoryInterface,
        referentialVersionRepository: ReferentialVersionRepositoryInterface,
        referentialGateway: ReferentialGatewayInterface,
    ) => {
        return new FetchCriteriaForVersionUsecases(
            criteriaRepository,
            referentialVersionRepository,
            referentialGateway,
        );
    },
};
