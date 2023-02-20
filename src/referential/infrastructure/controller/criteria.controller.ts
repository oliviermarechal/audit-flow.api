import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { Criteria } from '../../domain';
import { CurrentUser } from '../../../core/app/decorator';
import { LoggedUserInterface } from '../../../core/domain/interfaces/security';
import { JwtGuard } from '../../../core/app/guard';
import {
    CREATE_CRITERIA_USECASES,
    CreateCriteriaUsecases,
    FETCH_CRITERIA_FOR_VERSION_USECASES,
    FetchCriteriaForVersionUsecases,
    LIST_CRITERIA_USECASES,
    ListCriteriaUsecases,
    REMOVE_CRITERIA_USECASES,
    RemoveCriteriaUsecases,
    UPDATE_CRITERIA_USECASES,
    UpdateCriteriaUsecases,
} from '../../usecases';

@Controller()
export class CriteriaController {
    constructor(
        @Inject(LIST_CRITERIA_USECASES)
        private readonly listCriteriaUsecases: ListCriteriaUsecases,
        @Inject(FETCH_CRITERIA_FOR_VERSION_USECASES)
        private readonly fetchCriteriaForVersionUsecases: FetchCriteriaForVersionUsecases,
        @Inject(CREATE_CRITERIA_USECASES)
        private readonly createCriteriaUsecases: CreateCriteriaUsecases,
        @Inject(UPDATE_CRITERIA_USECASES)
        private readonly updateCriteriaUsecases: UpdateCriteriaUsecases,
        @Inject(REMOVE_CRITERIA_USECASES)
        private readonly removeCriteriaUsecases: RemoveCriteriaUsecases,
    ) {}

    @Get('versions/:versionId/criteria')
    @UseGuards(JwtGuard)
    async listCriteria(
        @CurrentUser() loggedUser: LoggedUserInterface,
        @Param() params,
    ): Promise<Criteria[]> {
        return this.listCriteriaUsecases.execute(
            loggedUser.id,
            params.versionId,
        );
    }

    @Post('versions/:versionId/fetch-criteria')
    @UseGuards(JwtGuard)
    async fetchApiCriteria(
        @CurrentUser() loggedUser: LoggedUserInterface,
        @Param() params,
    ): Promise<void> {
        await this.fetchCriteriaForVersionUsecases.execute(
            loggedUser.id,
            params.versionId,
        );
    }

    @Post('/versions/:versionId/criteria')
    @UseGuards(JwtGuard)
    async createCriteria(
        @CurrentUser() loggedUser: LoggedUserInterface,
        @Param() params,
        @Body() body, // TODO create dto
    ): Promise<Criteria> {
        return this.createCriteriaUsecases.execute(
            loggedUser.id,
            params.versionId,
            body,
        );
    }

    @Put('/versions/:versionId/criteria/:criteriaId')
    @UseGuards(JwtGuard)
    async updateCriteria(
        @CurrentUser() loggedUser: LoggedUserInterface,
        @Param() params,
        @Body() body, // TODO create dto
    ): Promise<Criteria> {
        return this.updateCriteriaUsecases.execute(
            loggedUser.id,
            params.criteriaId,
            body,
        );
    }

    @Delete('/versions/:versionId/criteria/:criteriaId')
    @UseGuards(JwtGuard)
    async removeCriteria(
        @CurrentUser() loggedUser: LoggedUserInterface,
        @Param() params,
    ): Promise<void> {
        await this.removeCriteriaUsecases.execute(
            loggedUser.id,
            params.criteriaId,
        );
    }
}
