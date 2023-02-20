import { ReferentialVersionRepositoryInterface } from '../../domain';
import {
    PUBLISH_VERSION_USECASES,
    PublishVersionUsecases,
} from '../../usecases';

export const PublishVersionUsecaseProvider = {
    inject: [ReferentialVersionRepositoryInterface],
    provide: PUBLISH_VERSION_USECASES,
    useFactory: (
        referentialVersionRepository: ReferentialVersionRepositoryInterface,
    ) => {
        return new PublishVersionUsecases(referentialVersionRepository);
    },
};
