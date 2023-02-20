import {
    Referential,
    ReferentialProps,
    ReferentialRepositoryInterface,
} from '../../../src/referential/domain';
import { ReferentialRepositoryMock } from './mock';
import { UpdateReferentialUsecases } from '../../../src/referential/usecases';

describe('update referential', () => {
    let ctx: Ctx;

    beforeEach(() => {
        ctx = createCtx();
    });

    it('Update referential [HAPPY FLOW]', async () => {
        const dto: ReferentialProps = {
            label: 'Eco-conception',
            isPublic: false,
            ownerId: 'FAKE_UUID',
            description:
                "Référentiel d'éco conception afin d'établir si un projet numérique est eco conçus",
        };
        const createdReferential = await ctx.givenReferential(
            Referential.create(dto),
        );
        const referentialId = createdReferential.id;

        dto.url = 'http://test.fr';
        dto.label = 'updated label';
        dto.id = referentialId;
        await ctx.whenUserUpdateReferential(dto);
        await ctx.checkReferentials(referentialId, dto);
    });
});

const createCtx = () => {
    const referentialRepository: ReferentialRepositoryInterface =
        new ReferentialRepositoryMock();
    const updateReferentialUsecases = new UpdateReferentialUsecases(
        referentialRepository,
    );

    return {
        async givenReferential(referential: Referential): Promise<Referential> {
            await referentialRepository.create(referential);

            return referential;
        },
        async whenUserUpdateReferential(
            updateReferentialDto: ReferentialProps,
        ) {
            await updateReferentialUsecases.execute(
                updateReferentialDto.id,
                'FAKE_UUID',
                updateReferentialDto.label,
                updateReferentialDto.description,
                updateReferentialDto.url,
            );
        },
        async checkReferentials(id: string, dto: ReferentialProps) {
            const referential = await referentialRepository.find(id);
            expect(referential.ownerId).toBe(dto.ownerId);
            expect(referential.url).toBe(dto.url);
            expect(referential.isPublic).toBe(dto.isPublic);
            expect(referential.label).toBe(dto.label);
            expect(referential.description).toBe(dto.description);
        },
    };
};

type Ctx = ReturnType<typeof createCtx>;
