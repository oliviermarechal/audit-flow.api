import {
    ReferentialVersion,
    ReferentialVersionRepositoryInterface,
} from '../../../../src/referential/domain';

export class ReferentialVersionRepositoryMock
    implements ReferentialVersionRepositoryInterface
{
    private versions = new Map<string, ReferentialVersion>();

    async save(version: ReferentialVersion): Promise<ReferentialVersion> {
        this.versions.set(
            `${version.referentialId}_${version.version}`,
            version,
        );

        return version;
    }

    async findByReferential(
        referentialId: string,
    ): Promise<ReferentialVersion[]> {
        const versions = [];
        this.versions.forEach((v) => {
            if (v.referentialId === referentialId) {
                versions.push(v);
            }
        });

        return versions;
    }

    async findByVersion(
        referentialId: string,
        version: string,
    ): Promise<ReferentialVersion> {
        return this.versions.get(`${referentialId}_${version}`);
    }
}
