export interface VersionRepositoryInterface {
    versionExist(versionId: string): Promise<boolean>;
}

export const VersionRepositoryInterface = Symbol('VersionRepositoryInterface');
