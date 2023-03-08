import {
    Template,
    TemplateProps,
    TemplateRepositoryInterface,
} from '../../../src/template/domain';
import { TemplateRepositoryMock } from './mock';
import { ListTemplatesUsecases } from '../../../src/template/usecases/query';

describe('List template', () => {
    let ctx: Ctx;
    const versionId = 'FAKE_VERSION_UUID';
    const ownerId = 'FAKE_OWNER_ID';

    beforeEach(() => {
        ctx = createCtx();
    });

    test('List template [HAPPY FLOW]', async () => {
        await ctx.givenICreateTemplates(versionId, ownerId);
        const templates = await ctx.whenUserListTemplateForVersion(
            versionId,
            ownerId,
        );
        await ctx.thenIShouldHaveTemplates(templates, ownerId, versionId);
    });
});

const createCtx = () => {
    const templateRepository: TemplateRepositoryInterface =
        new TemplateRepositoryMock();
    const listTemplateUsecases: ListTemplatesUsecases =
        new ListTemplatesUsecases(templateRepository);

    return {
        async givenICreateTemplates(
            versionId: string,
            ownerId: string,
        ): Promise<void> {
            const templateProps1: TemplateProps = {
                name: 'template 1',
                versionId: versionId,
                ownerId,
            };
            const templateProps2: TemplateProps = {
                name: 'template 2',
                versionId: versionId,
                ownerId,
            };
            await templateRepository.create(new Template(templateProps1));
            await templateRepository.create(new Template(templateProps2));
        },
        async whenUserListTemplateForVersion(
            versionId: string,
            ownerId,
        ): Promise<Template[]> {
            return listTemplateUsecases.execute(ownerId, versionId);
        },
        async thenIShouldHaveTemplates(
            templates: Template[],
            ownerId,
            versionId,
        ) {
            expect(templates.length).toBe(2);
            expect(templates[0].name).toBe('template 1');
            expect(templates[0].versionId).toBe(versionId);
            expect(templates[0].ownerId).toBe(ownerId);
            expect(templates[1].name).toBe('template 2');
            expect(templates[1].versionId).toBe(versionId);
            expect(templates[1].ownerId).toBe(ownerId);
        },
    };
};

type Ctx = ReturnType<typeof createCtx>;
