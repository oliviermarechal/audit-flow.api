import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ReferentialModule } from '../../referential/app/referential.module';
import { AppAdapters } from './app.adapters';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { JwtGuard } from './guard';
import { AuthRepository } from '../infrastructure/repository';
import { AuthRepositoryInterface } from '../domain/repository';
import { AccountModule } from '../../account/app/account.module';

const AppProviders = [
    JwtStrategy,
    JwtGuard,
    { provide: AuthRepositoryInterface, useClass: AuthRepository },
];

@Module({
    imports: [
        // BoundedContext
        ReferentialModule.forRoot(),
        AccountModule.forRoot(),

        // Dependencies
        ConfigModule.forRoot(),
        JwtModule.registerAsync({
            imports: undefined,
            useFactory: () => ({
                secret: process.env.SECRET,
                signOptions: { expiresIn: '30min' },
            }),
        }),
    ],
    controllers: [],
    providers: [...AppAdapters, ...AppProviders],
    exports: [...AppAdapters, ...AppProviders],
})
export class AppModule {}
