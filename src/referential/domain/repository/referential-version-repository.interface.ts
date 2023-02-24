import { ReferentialVersion, ReferentialVersionStatusEnum } from '../model';

export interface ReferentialVersionRepositoryInterface {
    find(id: string): Promise<ReferentialVersion>;
    save(version: ReferentialVersion): Promise<ReferentialVersion>;
    update(version: ReferentialVersion): Promise<ReferentialVersion>;
    findByReferential(referentialId: string): Promise<ReferentialVersion[]>;
    findByVersion(
        referentialId: string,
        version: string,
    ): Promise<ReferentialVersion>;
    remove(id: string): Promise<void>;
    isOwner(versionId: string, userId: string): Promise<boolean>;
    updateStatus(
        versionId: string,
        status: ReferentialVersionStatusEnum,
    ): Promise<ReferentialVersion>;
}

export const ReferentialVersionRepositoryInterface = Symbol(
    'ReferentialVersionRepositoryInterface',
);
