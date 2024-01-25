class KanaNode {
    value: string;
    children: KanaNode[];
    isTerminal: boolean;

    constructor(value: string) {
        this.value = value;
        this.children = [];
        this.isTerminal = false;
    }

    // retrieves a child node by value, if one exists
    getChildOrNullByValue(value: string) : KanaNode | null {
        return this.children.find(child => child.value === value) ?? null;
    }

    // takes a KanaNode and adds it to the array of children, merging with existing nodes of same value as necessary
    addChild(newChild: KanaNode) {
        const existingMatch = this.getChildOrNullByValue(newChild.value);

        // if the value already exists, append the child nodes by this same method
        if (existingMatch && newChild.children.length > 0) {
            newChild.children.forEach(child => {existingMatch.addChild(child)});
            return;
        }

        // if it exists but this was the last node to append, ensure isTerminal is false
        if (existingMatch) {
            existingMatch.isTerminal = true;
            return;
        }

        // else, we can add the supplied node as-is
        this.children.push(newChild);
    }
}

export default KanaNode;