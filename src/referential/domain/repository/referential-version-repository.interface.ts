import { ReferentialVersion } from '../model';

export interface ReferentialVersionRepositoryInterface {
    save(version: ReferentialVersion): Promise<ReferentialVersion>;
    findByReferential(referentialId: string): Promise<ReferentialVersion[]>;
    findByVersion(
        referentialId: string,
        version: string,
    ): Promise<ReferentialVersion>;
}

export const ReferentialVersionRepositoryInterface = Symbol(
    'ReferentialVersionRepositoryInterface',
);
