import {
    Referential,
    ReferentialDataMapping,
    ReferentialRepositoryInterface,
    ReferentialSyncModeEnum,
    ReferentialVersion,
    ReferentialVersionProps,
    ReferentialVersionRepositoryInterface,
} from '../../../src/referential/domain';
import { AddReferentialVersionUsecases } from '../../../src/referential/usecases';
import {
    ReferentialRepositoryMock,
    ReferentialVersionRepositoryMock,
} from './mock';

describe('Add version to referential', () => {
    let ctx: Ctx;

    beforeEach(() => {
        ctx = createCtx();
    });

    test('Add version to referential [HAPPY FLOW]', async () => {
        const referential = await ctx.givenReferential(
            Referential.create({
                label: 'Eco-conception',
                ownerId: 'FAKE_USER_ID',
                description:
                    "Référentiel d'éco conception afin d'établir si un projet numérique est eco conçus",
            }),
        );

        const versionProps: ReferentialVersionProps = {
            id: 'VERSION_FAKE_UUID',
            version: '1.2',
            url: 'https://fake.test',
            syncMode: ReferentialSyncModeEnum.API,
            referentialId: referential.id,
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString(),
            dataMapping: ReferentialDataMapping.create({
                referentialCriteria: 'criètre',
                identifier: 'identifier',
                label: 'label',
                category: 'category',
                description: 'description',
                versionId: 'VERSION_FAKE_UUID',
            }),
        };

        await ctx.whenUserAddReferentialVersion(
            versionProps.referentialId,
            versionProps,
        );

        await ctx.thenReferentialShouldHaveVersion(
            referential.id,
            versionProps,
        );
    });
});

const createCtx = () => {
    const referentialRepository: ReferentialRepositoryInterface =
        new ReferentialRepositoryMock();
    const referentialVersionRepository: ReferentialVersionRepositoryInterface =
        new ReferentialVersionRepositoryMock();
    const addReferentialVersionUsecases: AddReferentialVersionUsecases =
        new AddReferentialVersionUsecases(
            referentialRepository,
            referentialVersionRepository,
        );

    return {
        async givenReferential(referential: Referential): Promise<Referential> {
            await referentialRepository.create(referential);

            return referential;
        },
        async whenUserAddReferentialVersion(
            referentialId: string,
            versionProps: ReferentialVersionProps,
        ) {
            await addReferentialVersionUsecases.execute(
                referentialId,
                versionProps,
                'FAKE_USER_ID',
            );
        },
        async thenReferentialShouldHaveVersion(
            referentialId: string,
            versionProps: ReferentialVersionProps,
        ) {
            const referential = await referentialRepository.find(referentialId);

            const versions =
                await referentialVersionRepository.findByReferential(
                    referential.id,
                );
            const version = versions.find(
                (v) => v.version === versionProps.version,
            );
            expect(version).not.toBeNull();
            expect(version.url).toBe(versionProps.url);
            const referentialVersion =
                await referentialVersionRepository.findByVersion(
                    referential.id,
                    versionProps.version,
                );

            expect(referentialVersion).not.toBeNull();
            expect(referentialVersion.url).toBe(versionProps.url);
        },
    };
};

type Ctx = ReturnType<typeof createCtx>;
