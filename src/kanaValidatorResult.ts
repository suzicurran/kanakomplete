export default class KanaValidatorResult { 
    isValid: boolean;
    errors: string[];

    constructor(isValid: boolean = true, errors = []) {
        this.isValid = isValid;
        this.errors = errors;
    }
}