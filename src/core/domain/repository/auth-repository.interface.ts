import { LoggedUserInterface } from '../interfaces/security';

export interface AuthRepositoryInterface {
    findUserById(id: string): Promise<LoggedUserInterface | null>;
}

export const AuthRepositoryInterface = Symbol('AuthRepositoryInterface');
