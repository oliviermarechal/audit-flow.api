import { DynamicModule, Module } from '@nestjs/common';
import { AppAdapters } from '../../core/app';
import { AccountRepositoryInterface } from '../domain/repository';
import { AccountRepository } from '../infrastructure/repository';
import { EncrypterInterface } from '../domain/encrypter';
import { BcryptEncrypter } from '../infrastructure/encrypter';
import { AuthController } from '../infrastructure/controller';
import { TokenServiceInterface } from '../domain/token';
import { TokenService } from '../infrastructure/token';
import { JwtModule } from '@nestjs/jwt';
import { UsecasesProviders } from './usecases-providers';

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
                signOptions: { expiresIn: '24h' },
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
            providers: [...UsecasesProviders],
        };
    }
}
