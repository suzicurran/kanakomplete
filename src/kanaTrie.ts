import KanaNode from "./kanaNode";

class KanaTrie {
    rootNode: KanaNode;

    constructor(rootNode: KanaNode = new KanaNode('')) {
        this.rootNode = rootNode;
    }

    addWord(kanaString: string) {
        // todo: validations
        const kanaArray = kanaString.split("");
        this.insertValues(kanaArray);
    }

    insertValues(values: string[]) {
        const startingValue =  values.pop();
        if (startingValue) {
            const lastNode = new KanaNode(startingValue, [], true);
            const newTrie = values.reduceRight((child, parentValue) => {
                return new KanaNode(parentValue, [child]);
            }, lastNode);
            this.rootNode.addChild(newTrie);
        }
    }
}

export default KanaTrie;