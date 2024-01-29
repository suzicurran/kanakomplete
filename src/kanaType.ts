import wanakana from 'wanakana';
export default class Kana {
    value: string;
    
    constructor(character: string) {
        const isValid = wanakana.isKana(character) && character.length === 1;
        if (!isValid) {
            //throw
        }
        this.value = character;
    }

    equals(otherKana: Kana) {
        return this.value === otherKana.value;
    }
}
