import {
    ReferentialRepositoryMock,
    ReferentialVersionRepositoryMock,
} from './mock';
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

describe('List referential', () => {
    let ctx: Ctx;

    beforeEach(() => {
        ctx = createCtx();
    });

    test('Add version to referential [HAPPY FLOW]', async () => {
        const referential = await ctx.givenReferential(
            Referential.create({
                label: 'Eco-conception',
                description:
                    "Référentiel d'éco conception afin d'établir si un projet numérique est eco conçus",
            }),
        );

        const versionProps: ReferentialVersionProps = {
            version: '1.2',
            url: 'https://fake.test',
            syncMode: ReferentialSyncModeEnum.API,
            versionInUrl: false,
            referentialId: referential.id,
            dataMapping: ReferentialDataMapping.create({
                referentialCriteria: 'criètre',
                identifier: 'identifier',
                label: 'label',
                category: 'category',
                description: 'description',
                implement: 'implement',
                control: 'control',
                versionId: referential.id,
            }),
        };

        await ctx.addReferentialVersion(
            versionProps.referentialId,
            ReferentialVersion.create(versionProps),
        );

        const referentials = await ctx.whenUserListReferential();
        await ctx.checkReferentials(referentials, versionProps);
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
        async addReferentialVersion(
            referentialId: string,
            versionProps: ReferentialVersionProps,
        ) {
            await addReferentialVersionUsecases.execute(
                referentialId,
                versionProps,
            );
        },
        async whenUserListReferential() {
            return referentialRepository.findAll();
        },
        async checkReferentials(
            referentials: Referential[],
            versionProps: ReferentialVersionProps,
        ) {
            expect(referentials).toHaveLength(1);
            const referential = referentials[0];
            expect(referential.hasVersion(versionProps.version)).toBe(true);

            const version = referential.getVersion(versionProps.version);
            expect(version.url).toBe(versionProps.url);
            expect(version.dataMapping).not.toBeNull();
            expect(version.dataMapping.label).toBe(version.dataMapping.label);
        },
    };
};

type Ctx = ReturnType<typeof createCtx>;
