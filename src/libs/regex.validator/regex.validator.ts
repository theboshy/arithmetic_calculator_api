export const MATCH_NUMBERS = new RegExp("^-?\\d+(\\.\\d+)?$");
export const MATCH_POSITIVE_NUMBERS = new RegExp(/^\d+(\.\d+)?$/);

export const regexMatcher = (test: string, regexSource: RegExp = MATCH_NUMBERS) => {
    try {
        return regexSource.test(test);
    } catch (error) {
        return -1;
    }
}

//[^0-9] 