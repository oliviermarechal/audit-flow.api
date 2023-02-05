const snakeToCamel = (str: string) => {
    return str
        .toLowerCase()
        .replace(/([-_][a-z])/g, (group) =>
            group.toUpperCase().replace('_', ''),
        );
};

export const objectKeysToCamelCase = async <T>(obj: any): Promise<T> => {
    const repl = {} as T;
    Object.keys(obj).map((key: string) => {
        repl[snakeToCamel(key)] = obj[key];
    });

    return repl;
};
