import {
    Body,
    Controller,
    Get,
    Inject,
    Param,
    Post,
    UseGuards,
} from '@nestjs/common';
import {
    ADD_VERSION_USECASES,
    AddReferentialVersionUsecases,
    CREATE_REFERENTIAL_USECASES,
    CreateReferentialUsecases,
    FETCH_REFERENTIAL_USECASES,
    FetchReferentialUsecases,
    LIST_REFERENTIAL_USECASES,
    ListReferentialUsecases,
} from '../../usecases';
import { Referential } from '../../domain';
import { CurrentUser } from '../../../core/app/decorator';
import { LoggedUserInterface } from '../../../core/domain/interfaces/security';
import { JwtGuard } from '../../../core/app/guard';

@Controller('referentials')
export class ReferentialController {
    constructor(
        @Inject(CREATE_REFERENTIAL_USECASES)
        private readonly createReferentialUsecases: CreateReferentialUsecases,
        @Inject(ADD_VERSION_USECASES)
        private readonly addVersionUsecases: AddReferentialVersionUsecases,
        @Inject(FETCH_REFERENTIAL_USECASES)
        private readonly fetchReferentialUsecases: FetchReferentialUsecases,
        @Inject(LIST_REFERENTIAL_USECASES)
        private readonly listReferentialUsecases: ListReferentialUsecases,
    ) {}

    @Get()
    @UseGuards(JwtGuard)
    async listReferential(
        @CurrentUser() loggedUser: LoggedUserInterface,
    ): Promise<Referential[]> {
        return this.listReferentialUsecases.execute(loggedUser.id);
    }

    @Post()
    @UseGuards(JwtGuard)
    async createReferential(
        @Body() body, // TODO Create DTO
        @CurrentUser() user: LoggedUserInterface,
    ): Promise<Referential> {
        return this.createReferentialUsecases.execute(
            body.label,
            body.description,
            body.public,
            user.id,
            body.url,
        );
    }

    @Post('/:id/versions')
    async addVersionToReferential(
        @Param() params,
        @Body() body,
    ): Promise<Referential> {
        return this.addVersionUsecases.execute(params.id, body);
    }

    @Post('/:id/versions/:version/fetch')
    async fetchVersionReferential(@Param() params): Promise<void> {
        return this.fetchReferentialUsecases.execute(params.id, params.version);
    }
}
