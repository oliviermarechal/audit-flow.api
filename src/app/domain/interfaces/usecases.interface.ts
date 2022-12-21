export interface UsecasesInterface {
    execute<T>(): Promise<T>;
}
