import KanaValidationResult from "./kanaValidatorResult";
import Kana from "./kanaType";

export default class KanaParser { 
    toKana(input: string) {
        const characterArray = input.split("");
        const kanaArray = characterArray.map(character => new Kana(character));
        return kanaArray;
    }
}

//                 result.isValid = false;
// result.errors.push(`${character} in ${input} is not a valid hiragana or katakana character.`)