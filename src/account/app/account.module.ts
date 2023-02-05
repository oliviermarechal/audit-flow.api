import { DynamicModule, Module } from '@nestjs/common';
import { AppAdapters } from '../../core/app';
import { AccountRepositoryInterface } from '../domain/repository';
import { AccountRepository } from '../infrastructure/repository';
import { EncrypterInterface } from '../domain/encrypter';
import { BcryptEncrypter } from '../infrastructure/encrypter';
import {
    LOGIN_USECASES,
    LoginUsecases,
    REGISTRATION_USECASES,
    RegistrationUsecases,
} from '../usecases';
import { AuthController } from '../infrastructure/controller';
import { TokenServiceInterface } from '../domain/token';
import { TokenService } from '../infrastructure/token';
import { JwtModule } from '@nestjs/jwt';

const Providers = [
    { provide: AccountRepositoryInterface, useClass: AccountRepository },
    { provide: EncrypterInterface, useClass: BcryptEncrypter },
    { provide: TokenServiceInterface, useClass: TokenService },
];

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: undefined,
            useFactory: () => ({
                secret: process.env.SECRET,
                signOptions: { expiresIn: '30min' },
            }),
        }),
    ],
    providers: [...AppAdapters, ...Providers],
    controllers: [AuthController],
})
export class AccountModule {
    static forRoot(): DynamicModule {
        return {
            module: AccountModule,
            providers: [
                {
                    inject: [AccountRepositoryInterface, EncrypterInterface],
                    provide: REGISTRATION_USECASES,
                    useFactory: (
                        accountRepository: AccountRepositoryInterface,
                        encrypter: EncrypterInterface,
                    ) => {
                        return new RegistrationUsecases(
                            accountRepository,
                            encrypter,
                        );
                    },
                },
                {
                    inject: [
                        AccountRepositoryInterface,
                        EncrypterInterface,
                        TokenServiceInterface,
                    ],
                    provide: LOGIN_USECASES,
                    useFactory: (
                        accountRepository: AccountRepositoryInterface,
                        encrypter: EncrypterInterface,
                        tokenService: TokenServiceInterface,
                    ) => {
                        return new LoginUsecases(
                            accountRepository,
                            encrypter,
                            tokenService,
                        );
                    },
                },
            ],
        };
    }
}
