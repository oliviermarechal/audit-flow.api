import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { LOGIN_USECASES, REGISTRATION_USECASES } from '../../usecases';
import { Usecases } from '../../../core/domain';
import { Account } from '../../domain/model';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject(REGISTRATION_USECASES)
        private readonly registrationUsecases: Usecases,
        @Inject(LOGIN_USECASES)
        private readonly loginUsecases: Usecases,
    ) {}

    @Post('registration')
    async registration(
        @Body() body,
    ): Promise<{ token: string; account: Account }> {
        await this.registrationUsecases.execute(body.email, body.password);

        return this.loginUsecases.execute(body.email, body.password);
    }

    @Post('login')
    @HttpCode(200)
    async login(@Body() body): Promise<{ token: string; account: Account }> {
        return this.loginUsecases.execute(body.email, body.password);
    }
}
