import { Controller, Get, Inject } from '@nestjs/common';
import { LIST_CRITERIA_USECASES } from '../../usecases';
import { UsecasesInterface } from '../../../app/domain';

@Controller('criteria')
export class CriteriaController {
    constructor(
        @Inject(LIST_CRITERIA_USECASES)
        private readonly listCriteriaUsecases: UsecasesInterface,
    ) {}

    @Get()
    async listCriteria() {
        return this.listCriteriaUsecases.execute();
    }
}
