import Kana from "./kanaType";

class KanaNode {
    kana: Kana;
    children: KanaNode[];
    isTerminal: boolean;

    // todo: object?
    constructor(value: Kana, children: KanaNode[] = [], isTerminal: boolean = false) {
        this.kana = value;
        this.children = children;
        this.isTerminal = isTerminal;
    }

    // retrieves a child node by value, if one exists
    getChildOrNullByValue(kana: Kana) : KanaNode | null {
        return this.children.find(child => child.getKanaString() === kana.value) ?? null;
    }

    // takes a KanaNode and adds it to the array of children, merging with existing nodes of same value as necessary
    addChild(newChild: KanaNode) {
        const existingMatch = this.getChildOrNullByValue(newChild.kana);

        if (existingMatch === null) {
            // Add the supplied node as-is
            this.children.push(newChild);
            return;
        }

        // if the new child is terminal, ensure isTerminal is true on the existing one
        if (newChild.isTerminal) {
            existingMatch.isTerminal = true;
        }

        // If the new child had any children, append them by this same method
        if (newChild.children.length > 0) {
            newChild.children.forEach(child => {existingMatch.addChild(child)});
            return;
        }
    }

    getKanaString() {
        return this.kana.value;
    }
}

export default KanaNode;