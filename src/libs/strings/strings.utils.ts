export const parseStringToArray = (str: string): string[] => {
    let trimmedValues;
    try {
        // check for empty string
        if (typeof str !== 'string' || str.length === 0) {
            throw new Error('Se esperaba una cadena no vacía como parámetro.');
        }
        const values = str.split(',');
        trimmedValues = values.map((value) => value.trim());
    } catch (error) {

    }
    return trimmedValues;
}