class KanaNode {
    value: string;
    children: KanaNode[];
    isTerminal: boolean;

    // todo: object?
    constructor(value: string, children: KanaNode[] = [], isTerminal: boolean = false) {
        this.value = value;
        this.children = children;
        this.isTerminal = isTerminal;
    }

    // retrieves a child node by value, if one exists
    getChildOrNullByValue(value: string) : KanaNode | null {
        return this.children.find(child => child.value === value) ?? null;
    }

    // takes a KanaNode and adds it to the array of children, merging with existing nodes of same value as necessary
    addChild(newChild: KanaNode) {
        const existingMatch = this.getChildOrNullByValue(newChild.value);

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
}

export default KanaNode;