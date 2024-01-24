class KanaNode {
    value: string;
    children: KanaNode[];
    isTerminal: boolean;

    constructor(value: string) {
        this.value = value;
        this.children = [];
        this.isTerminal = false;
    }

    getChildOrNullByValue(value: string) {
        return this.children.find(child => child.value === value) ?? null;
    }

    addChild(newChild: KanaNode) {
        this.children.push(newChild);
    }
}

export default KanaNode;