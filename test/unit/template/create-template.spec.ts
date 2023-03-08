import {
    Template,
    TemplateProps,
    TemplateRepositoryInterface,
} from '../../../src/template/domain';
import { TemplateRepositoryMock } from './mock';

describe('Create template', () => {
    let ctx: Ctx;
    const versionId = 'FAKE_VERSION_UUID';
    const ownerId = 'FAKE_OWNER_ID';

    beforeEach(() => {
        ctx = createCtx();
    });

    test('Create template [HAPPY FLOW]', async () => {
        const templateProps = await ctx.givenTemplateProps(versionId, ownerId);
        const template = await ctx.whenUserCreateTemplate(templateProps);
        if (template instanceof Template) {
            await ctx.thenIShouldVerifyCreatedTemplate(
                template.id,
                ownerId,
                versionId,
            );
        } else {
            throw new Error('Template must be defined in this test case');
        }
    });

    test('Create template [ERROR FLOW]', async () => {
        const template = await ctx.whenUserCreateTemplate({
            name: 'template 1',
            versionId: versionId,
        });

        if (typeof template === 'string') {
            await ctx.thenTheTemplateWasNotCreated(
                template,
                'ownerId est manquant',
            );
        } else {
            throw new Error('Template must be a string error message');
        }
    });
});

const createCtx = () => {
    const templateRepository: TemplateRepositoryInterface =
        new TemplateRepositoryMock();

    return {
        async givenTemplateProps(
            versionId: string,
            ownerId: string,
        ): Promise<TemplateProps> {
            return {
                name: 'template 1',
                versionId: versionId,
                ownerId,
            };
        },
        async whenUserCreateTemplate(props: any): Promise<Template | string> {
            const template = Template.create(props);

            return typeof template !== 'string'
                ? await templateRepository.create(template)
                : template;
        },
        async thenIShouldVerifyCreatedTemplate(
            templateId: string,
            ownerId,
            versionId,
        ) {
            const template = await templateRepository.find(templateId);

            expect(template.name).toBe('template 1');
            expect(template.versionId).toBe(versionId);
            expect(template.ownerId).toBe(ownerId);
        },
        async thenTheTemplateWasNotCreated(
            errorMessage: string,
            message: string,
        ) {
            expect(errorMessage).toBe(message);
        },
    };
};

type Ctx = ReturnType<typeof createCtx>;
