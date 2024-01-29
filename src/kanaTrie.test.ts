import KanaNode from "./kanaNode";
import KanaTrie from "./kanaTrie";
import Kana from "./kanaType";

describe("KanaTrie", () => {
    describe("addKanaWord", () => {
        it('can create the necessary child nodes', () => {
            // arrange
            const enptyParentKanatrie = new KanaTrie();
            const kanaword =[new Kana('か'), new Kana('な')];

            // act
            enptyParentKanatrie.addKanaWord(kanaword);

            // assert
            const firstChild = enptyParentKanatrie.rootNode.children[0];
            expect(firstChild.getKanaString()).toBe('か');
            expect(firstChild.children.length).toBe(1);
            
            const secondChild = firstChild.children[0];
            expect(secondChild.getKanaString()).toBe('な');
            expect(secondChild.isTerminal).toBe(true);
        })

        it('can add a word whose prefix already exists', () => {
            // arrange
            const kanaTrie = new KanaTrie();
            const raNode = new KanaNode(new Kana('ら'));
            const kuNode = new KanaNode(new Kana('く'), [raNode]);
            const saNode = new KanaNode(new Kana('さ'), [kuNode]);
            kanaTrie.rootNode.children = [saNode];
            const kanaword =[new Kana('さ'), new Kana('む'), new Kana('い')];

            // act
            kanaTrie.addKanaWord(kanaword);

            // assert
            const shouldBeSaNode = kanaTrie.rootNode.children[0];
            expect(shouldBeSaNode.getKanaString()).toBe('さ');
            expect(shouldBeSaNode.children.length).toBe(2);

            expect(saNode.children).toContain(kuNode);
            const shouldBeMuNode = saNode.children.find(node => node.getKanaString() === 'む');
            expect(shouldBeMuNode).toBeDefined();
            expect(shouldBeMuNode?.children.length).toBe(1);

            expect(shouldBeMuNode?.children[0].getKanaString()).toBe('い');
        })
    })
})