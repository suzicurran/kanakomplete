import KanaNode from "./kanaNode";
import Kana from "./kanaType";

class KanaTrie {
    rootNode: KanaNode;

    constructor(rootNode: KanaNode = new KanaNode(new Kana(''))) {
        this.rootNode = rootNode;
    }

    // todo: can I make a type specific to kana characters?
    addKanaWord(values: Kana[]) {``
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