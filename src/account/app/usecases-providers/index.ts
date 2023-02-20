import { Provider } from '@nestjs/common';
import { RegistrationUsecaseProvider } from './registration-usecase.provider';
import { LoginUsecaseProvider } from './login-usecase.provider';

export const UsecasesProviders: Provider[] = [
    RegistrationUsecaseProvider,
    LoginUsecaseProvider,
];
