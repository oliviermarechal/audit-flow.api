import {
    Body,
    Controller,
    Get,
    Inject,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import {
    LIST_TEMPLATE_USECASES,
    ListTemplatesUsecases,
} from '../../usecases/query';
import { JwtGuard } from '../../../core/app/guard';
import { CurrentUser } from '../../../core/app/decorator';
import { LoggedUserInterface } from '../../../core/domain/interfaces/security';
import { Template } from '../../domain';
import {
    CREATE_TEMPLATE_USECASES,
    CreateTemplateUsecases,
} from '../../usecases/command';

@Controller('templates')
@UseGuards(JwtGuard)
export class TemplateController {
    constructor(
        @Inject(LIST_TEMPLATE_USECASES)
        private readonly listTemplateUsecases: ListTemplatesUsecases,
        @Inject(CREATE_TEMPLATE_USECASES)
        private readonly createTemplateUsecases: CreateTemplateUsecases,
    ) {}

    @Get()
    async list(
        @CurrentUser() loggedUser: LoggedUserInterface,
        @Query() queryParams: any,
    ): Promise<Template[]> {
        return this.listTemplateUsecases.execute(
            loggedUser.id,
            queryParams.versionId,
        );
    }

    @Post()
    async create(
        @CurrentUser() loggedUser: LoggedUserInterface,
        @Body() body,
    ): Promise<Template> {
        return this.createTemplateUsecases.execute(
            loggedUser.id,
            body.versionId,
            body.name,
        );
    }
}
