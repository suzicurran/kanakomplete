import KanaNode from "./kanaNode";
import KanaTrie from "./kanaTrie";

describe("KanaTrie", () => {
    describe("addWord", () => {
        it('can create the necessary child nodes', () => {
            // arrange
            const enptyParentKanatrie = new KanaTrie();
            const kanastring ='かな';

            // act
            enptyParentKanatrie.addWord(kanastring);

            // assert
            const firstChild = enptyParentKanatrie.rootNode.children[0];
            expect(firstChild.value).toBe('か');
            expect(firstChild.children.length).toBe(1);
            
            const secondChild = firstChild.children[0];
            expect(secondChild.value).toBe('な');
            expect(secondChild.isTerminal).toBe(true);
        })

        it('can add a word whose prefix already exists', () => {
            // arrange
            const kanaTrie = new KanaTrie();
            const raNode = new KanaNode('ら');
            const kuNode = new KanaNode('く', [raNode]);
            const saNode = new KanaNode('さ', [kuNode]);
            kanaTrie.rootNode.children = [saNode];

            // act
            kanaTrie.addWord('さむい');

            // assert
            const shouldBeSaNode = kanaTrie.rootNode.children[0];
            expect(shouldBeSaNode.value).toBe('さ');
            expect(shouldBeSaNode.children.length).toBe(2);

            expect(saNode.children).toContain(kuNode);
            const shouldBeMuNode = saNode.children.find(node => node.value === 'む');
            expect(shouldBeMuNode).toBeDefined();
            expect(shouldBeMuNode?.children.length).toBe(1);

            expect(shouldBeMuNode?.children[0].value).toBe('い');
        })
    })
})