import { ReferentialVersionRepositoryInterface } from '../../domain';
import { REMOVE_VERSION_USECASES, RemoveVersionUsecases } from '../../usecases';

export const RemoveVersionUsecaseProvider = {
    inject: [ReferentialVersionRepositoryInterface],
    provide: REMOVE_VERSION_USECASES,
    useFactory: (
        referentialVersionRepository: ReferentialVersionRepositoryInterface,
    ) => {
        return new RemoveVersionUsecases(referentialVersionRepository);
    },
};
