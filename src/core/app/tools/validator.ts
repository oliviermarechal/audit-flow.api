export interface ValidatorResult {
    succeeded: boolean;
    message?: string;
}

export interface ValidatorArgument {
    argument: any;
    argumentName: string;
}

export type ValidatorArgumentCollection = ValidatorArgument[];

export class Validator {
    public static combine(guardResults: ValidatorResult[]): ValidatorResult {
        for (const result of guardResults) {
            if (result.succeeded === false) return result;
        }

        return { succeeded: true };
    }

    public static greaterThan(
        minValue: number,
        actualValue: number,
    ): ValidatorResult {
        return actualValue > minValue
            ? { succeeded: true }
            : {
                  succeeded: false,
                  message: `Number given {${actualValue}} is not greater than {${minValue}}`,
              };
    }

    public static againstAtLeast(
        numChars: number,
        text: string,
    ): ValidatorResult {
        return text.length >= numChars
            ? { succeeded: true }
            : {
                  succeeded: false,
                  message: `Text is not at least ${numChars} chars.`,
              };
    }

    public static againstAtMost(
        numChars: number,
        text: string,
    ): ValidatorResult {
        return text.length <= numChars
            ? { succeeded: true }
            : {
                  succeeded: false,
                  message: `Text is greater than ${numChars} chars.`,
              };
    }

    public static againstNullOrUndefined(
        argument: any,
        argumentName: string,
    ): ValidatorResult {
        if (argument === null || argument === undefined) {
            return {
                succeeded: false,
                message: `${argumentName} est manquant`,
            };
        } else {
            return { succeeded: true };
        }
    }

    public static againstNullOrUndefinedBulk(
        args: ValidatorArgumentCollection,
    ): ValidatorResult {
        for (const arg of args) {
            const result = this.againstNullOrUndefined(
                arg.argument,
                arg.argumentName,
            );
            if (!result.succeeded) return result;
        }

        return { succeeded: true };
    }

    public static isOneOf(
        value: any,
        validValues: any[],
        argumentName: string,
    ): ValidatorResult {
        let isValid = false;
        for (const validValue of validValues) {
            if (value === validValue) {
                isValid = true;
            }
        }

        if (isValid) {
            return { succeeded: true };
        } else {
            return {
                succeeded: false,
                message: `${argumentName} isn't oneOf the correct types in ${JSON.stringify(
                    validValues,
                )}. Got "${value}".`,
            };
        }
    }

    public static inRange(
        num: number,
        min: number,
        max: number,
        argumentName: string,
    ): ValidatorResult {
        const isInRange = num >= min && num <= max;
        if (!isInRange) {
            return {
                succeeded: false,
                message: `${argumentName} is not within range ${min} to ${max}.`,
            };
        } else {
            return { succeeded: true };
        }
    }

    public static allInRange(
        numbers: number[],
        min: number,
        max: number,
        argumentName: string,
    ): ValidatorResult {
        let failingResult: ValidatorResult = null;
        for (const num of numbers) {
            const numIsInRangeResult = this.inRange(
                num,
                min,
                max,
                argumentName,
            );
            if (!numIsInRangeResult.succeeded)
                failingResult = numIsInRangeResult;
        }

        if (failingResult) {
            return {
                succeeded: false,
                message: `${argumentName} is not within the range.`,
            };
        } else {
            return { succeeded: true };
        }
    }
}
