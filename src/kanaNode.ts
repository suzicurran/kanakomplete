class KanaNode {
    value: string;
    children: KanaNode[];
    isTerminal: boolean;

    constructor(value: string) {
        this.value = value;
        this.children = [];
        this.isTerminal = false;
    }
}

export default KanaNode;