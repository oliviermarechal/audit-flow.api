import {
    Referential,
    ReferentialDataMapping,
    ReferentialRepositoryInterface,
    ReferentialSyncModeEnum,
    ReferentialVersion,
    ReferentialVersionProps,
    ReferentialVersionRepositoryInterface,
    UpdateReferentialVersionDataInterface,
} from '../../../src/referential/domain';
import {
    ReferentialRepositoryMock,
    ReferentialVersionRepositoryMock,
} from './mock';
import { UpdateVersionUsecases } from '../../../src/referential/usecases';

describe('Update referential version', () => {
    let ctx: Ctx;

    beforeEach(() => {
        ctx = createCtx();
    });

    test('Update referential version [HAPPY FLOW]', async () => {
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

        const updateVersionData: UpdateReferentialVersionDataInterface = {
            id: version.id,
            url: 'URL_UPDATED',
            version: version.version,
            syncMode: version.syncMode,
            referentialId: version.referentialId,
            status: version.status,
            dataMapping: {
                referentialCriteria: 'critère',
                identifier: 'identifier',
                label: 'label',
                category: 'category',
                description: 'description',
                versionId: 'VERSION_FAKE_UUID',
            },
        };

        await ctx.whenUserUpdateVersion(updateVersionData);
        await ctx.thenTheVersionShouldBeUpdated(version.id, updateVersionData);
    });
});

const createCtx = () => {
    const referentialRepository: ReferentialRepositoryInterface =
        new ReferentialRepositoryMock();
    const referentialVersionRepository: ReferentialVersionRepositoryInterface =
        new ReferentialVersionRepositoryMock();
    const updateVersionUsecases: UpdateVersionUsecases =
        new UpdateVersionUsecases(referentialVersionRepository);

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
            return referentialVersionRepository.save(version);
        },
        async whenUserUpdateVersion(
            version: UpdateReferentialVersionDataInterface,
        ) {
            return updateVersionUsecases.execute(
                version.id,
                version,
                'FAKE_OWNER_ID',
            );
        },
        async thenTheVersionShouldBeUpdated(
            versionId: string,
            data: UpdateReferentialVersionDataInterface,
        ) {
            const version = await referentialVersionRepository.find(versionId);

            expect(version).not.toBeNull();
            expect(version.url).toBe(data.url);
            expect(version.version).toBe(data.version);
            expect(version.dataMapping.referentialCriteria).toBe(
                data.dataMapping.referentialCriteria,
            );
        },
    };
};

type Ctx = ReturnType<typeof createCtx>;
