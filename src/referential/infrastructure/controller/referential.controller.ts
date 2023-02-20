import {
    Body,
    Controller,
    Get,
    HttpCode,
    Inject,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import {
    ADD_VERSION_USECASES,
    AddReferentialVersionUsecases,
    CREATE_REFERENTIAL_USECASES,
    CreateReferentialUsecases,
    LIST_REFERENTIAL_USECASES,
    ListReferentialUsecases,
    PUBLISH_VERSION_USECASES,
    PublishVersionUsecases,
    UPDATE_REFERENTIAL_USECASES,
    UPDATE_VERSION_USECASES,
    UpdateReferentialUsecases,
    UpdateVersionUsecases,
} from '../../usecases';
import { Referential, ReferentialVersion } from '../../domain';
import { CurrentUser } from '../../../core/app/decorator';
import { LoggedUserInterface } from '../../../core/domain/interfaces/security';
import { JwtGuard } from '../../../core/app/guard';

@Controller('referentials')
export class ReferentialController {
    constructor(
        @Inject(CREATE_REFERENTIAL_USECASES)
        private readonly createReferentialUsecases: CreateReferentialUsecases,
        @Inject(UPDATE_REFERENTIAL_USECASES)
        private readonly updateReferentialUsecases: UpdateReferentialUsecases,
        @Inject(ADD_VERSION_USECASES)
        private readonly addVersionUsecases: AddReferentialVersionUsecases,
        @Inject(LIST_REFERENTIAL_USECASES)
        private readonly listReferentialUsecases: ListReferentialUsecases,
        @Inject(PUBLISH_VERSION_USECASES)
        private readonly publishVersionUsecases: PublishVersionUsecases,
        @Inject(UPDATE_VERSION_USECASES)
        private readonly updateVersionUsecases: UpdateVersionUsecases,
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

    @Put(':id')
    @HttpCode(200)
    @UseGuards(JwtGuard)
    async updateReferential(
        @Body() body, // TODO Create DTO
        @CurrentUser() user: LoggedUserInterface,
        @Param() params,
    ): Promise<Referential> {
        return this.updateReferentialUsecases.execute(
            params.id,
            user.id,
            body.label,
            body.description,
            body.url,
        );
    }

    @Post('/:id/versions')
    @UseGuards(JwtGuard)
    async addVersionToReferential(
        @Param() params,
        @Body() body,
        @CurrentUser() user: LoggedUserInterface,
    ): Promise<ReferentialVersion> {
        return this.addVersionUsecases.execute(params.id, body, user.id);
    }

    @Put('/:id/versions/:versionId')
    @HttpCode(200)
    @UseGuards(JwtGuard)
    async updateVersion(
        @Param() params,
        @Body() body,
        @CurrentUser() user: LoggedUserInterface,
    ): Promise<ReferentialVersion> {
        return this.updateVersionUsecases.execute(
            params.versionId,
            body,
            user.id,
        );
    }

    @Post('/:id/versions/:versionId/publish')
    @HttpCode(200)
    @UseGuards(JwtGuard)
    async publishVersion(
        @Param() params,
        @CurrentUser() user: LoggedUserInterface,
    ): Promise<ReferentialVersion> {
        return this.publishVersionUsecases.execute(params.versionId, user.id);
    }
}
