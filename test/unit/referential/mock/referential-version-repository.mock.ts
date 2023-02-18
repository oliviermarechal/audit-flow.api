import {
    ReferentialVersion,
    ReferentialVersionRepositoryInterface,
    ReferentialVersionStatusEnum,
} from '../../../../src/referential/domain';

export class ReferentialVersionRepositoryMock
    implements ReferentialVersionRepositoryInterface
{
    private versions = new Map<string, ReferentialVersion>();

    async find(versionId: string): Promise<ReferentialVersion> {
        let version: ReferentialVersion;
        this.versions.forEach((v) => {
            if (v.id === versionId) {
                version = v;
            }
        });

        return version;
    }

    async save(version: ReferentialVersion): Promise<ReferentialVersion> {
        this.versions.set(
            `${version.referentialId}_${version.version}`,
            version,
        );

        return version;
    }

    async updateStatus(
        versionId: string,
        status: ReferentialVersionStatusEnum,
    ): Promise<ReferentialVersion> {
        const version = await this.find(versionId);
        version.status = status;

        return this.save(version);
    }

    async update(version: ReferentialVersion): Promise<ReferentialVersion> {
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

    async isOwner(versionId: string, userId: string): Promise<boolean> {
        return true;
    }

    async findByVersion(
        referentialId: string,
        version: string,
    ): Promise<ReferentialVersion> {
        return this.versions.get(`${referentialId}_${version}`);
    }
}
