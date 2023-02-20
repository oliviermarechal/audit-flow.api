import { ReferentialVersionRepositoryInterface } from '../../domain';
import { UPDATE_VERSION_USECASES, UpdateVersionUsecases } from '../../usecases';

export const UpdateVersionUsecaseProvider = {
    inject: [ReferentialVersionRepositoryInterface],
    provide: UPDATE_VERSION_USECASES,
    useFactory: (
        referentialVersionRepository: ReferentialVersionRepositoryInterface,
    ) => {
        return new UpdateVersionUsecases(referentialVersionRepository);
    },
};
