import {
    Referential,
    ReferentialDataMapping,
    ReferentialRepositoryInterface,
    ReferentialSyncModeEnum,
    ReferentialVersion,
    ReferentialVersionProps,
    ReferentialVersionRepositoryInterface,
    ReferentialVersionStatusEnum,
} from '../../../src/referential/domain';
import {
    ReferentialRepositoryMock,
    ReferentialVersionRepositoryMock,
} from './mock';
import { PublishVersionUsecases } from '../../../src/referential/usecases';

describe('Publish referential version', () => {
    let ctx: Ctx;

    beforeEach(() => {
        ctx = createCtx();
    });

    test('Publish referential version [HAPPY FLOW]', async () => {
        const versionProps: ReferentialVersionProps = {
            id: 'VERSION_FAKE_UUID',
            version: '1.2',
            url: 'https://fake.test',
            syncMode: ReferentialSyncModeEnum.API,
            referentialId: 'todo',
            dataMapping: ReferentialDataMapping.create({
                referentialCriteria: 'criètre',
                identifier: 'identifier',
                label: 'label',
                category: 'category',
                description: 'description',
                versionId: 'VERSION_FAKE_UUID',
            }),
        };

        const version = await ctx.givenReferentialWithDraftVersion(
            Referential.create({
                label: 'Eco-conception',
                ownerId: 'FAKE_OWNER_ID',
                description:
                    "Référentiel d'éco conception afin d'établir si un projet numérique est eco conçus",
            }),
            versionProps,
        );

        await ctx.whenUserPublishVersion(version.id);
        await ctx.thenTheVersionShouldBePublished(
            version.referentialId,
            version.version,
        );
    });
});

const createCtx = () => {
    const referentialRepository: ReferentialRepositoryInterface =
        new ReferentialRepositoryMock();
    const referentialVersionRepository: ReferentialVersionRepositoryInterface =
        new ReferentialVersionRepositoryMock();
    const publishVersionUsecases: PublishVersionUsecases =
        new PublishVersionUsecases(referentialVersionRepository);

    return {
        async givenReferentialWithDraftVersion(
            referential: Referential,
            versionProps: ReferentialVersionProps,
        ): Promise<ReferentialVersion> {
            const savedReferential = await referentialRepository.create(
                referential,
            );
            const version = ReferentialVersion.create({
                ...versionProps,
                referentialId: savedReferential.id,
            });
            const savedVersion = await referentialVersionRepository.save(
                version,
            );

            return savedVersion;
        },
        async whenUserPublishVersion(versionId: string) {
            return publishVersionUsecases.execute(versionId, 'FAKE_OWNER_ID');
        },
        async thenTheVersionShouldBePublished(
            referentialId: string,
            versionNumber: string,
        ) {
            const version = await referentialVersionRepository.findByVersion(
                referentialId,
                versionNumber,
            );

            expect(version).not.toBeNull();
            expect(version.status).toBe(ReferentialVersionStatusEnum.Published);
        },
    };
};

type Ctx = ReturnType<typeof createCtx>;
