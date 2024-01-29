import KanaNode from "./kanaNode";
import Kana from "./kanaType";

describe("KanaNode", () => {
    it('stores the provided initial kana', () => {
        // act
        const kanaNode = new KanaNode(new Kana('は'));

        // assert
        expect(kanaNode.kana.value).toBe('は');
    })

    it('returns the value of internal kana', () => {
        // act
        const kanaNode = new KanaNode(new Kana('え'));

        // assert
        expect(kanaNode.getKanaString()).toBe('え');
    })

    it('is initialized with an empty array of children', () => {
        // act
        const kanaNode = new KanaNode(new Kana('の'));

        // assert
        expect(kanaNode.children.length).toBe(0);
    })

    describe("addChild", () => {
        it('can add a provided node to its children', () => {
            // arrange
            const parentNode = new KanaNode(new Kana('は'));
            const nodeToAdd = new KanaNode(new Kana('な'));

            // act
            parentNode.addChild(nodeToAdd);

            // assert
            expect(parentNode.children[0]).toBe(nodeToAdd);
        })

        it('does not add a duplicate child node', () => {
            // arrange
            const parentNode = new KanaNode(new Kana('は'));
            const kaChildToAdd = new KanaNode(new Kana('な'));

            // act
            parentNode.addChild(kaChildToAdd);
            parentNode.addChild(kaChildToAdd);

            // assert
            expect(parentNode.children.length).toBe(1);
        })

        it('merges the children of the provided node into an existing match', () => {
            // arrange
            const parentNode = new KanaNode(new Kana('ぶ'));
            parentNode.addChild(new KanaNode(new Kana('は')));
            const childToAdd = new KanaNode(new Kana('は'));
            childToAdd.addChild(new KanaNode(new Kana('そ')));

            // act
            parentNode.addChild(childToAdd);

            // assert
            expect(parentNode.children.length).toBe(1);
            const haChild = parentNode.children[0];
            expect(haChild).not.toBeNull;
            expect(haChild.children.length).toBe(1);
        })

        it('can add a word whose prefix already exists', () => {
            // arrange
            const raNode = new KanaNode(new Kana('ら'));
            const kuNode = new KanaNode(new Kana('く'), [raNode]);
            const saNode = new KanaNode(new Kana('さ'), [kuNode]);
            const sakuraParentNode = new KanaNode(new Kana(''), [saNode]);

            const iNode = new KanaNode(new Kana('い'));
            const muNode = new KanaNode(new Kana('む'), [iNode]);
            const samuiNode = new KanaNode(new Kana('さ'), [muNode]);

            // act
            sakuraParentNode.addChild(samuiNode);

            // assert
            const shouldBeSaNode = sakuraParentNode.children[0];
            expect(shouldBeSaNode).toBe(saNode);
            expect(shouldBeSaNode.children.length).toBe(2);

            expect(saNode.children).toContain(kuNode);
            expect(saNode.children).toContain(muNode);

            expect(muNode.children.length).toBe(1);
            expect(muNode.children[0]).toBe(iNode);
        })

        it('applies the isTerminal property when merging in a smaller word', () => {
            // arrange
            const iNode = new KanaNode(new Kana('い'));
            const naNode = new KanaNode(new Kana('な'));
            const kaNode = new KanaNode(new Kana('か'));
            naNode.addChild(kaNode);
            iNode.addChild(naNode);

            const childToAdd = new KanaNode(new Kana('な'));
            const terminalNode = new KanaNode(new Kana('か'));
            terminalNode.isTerminal = true;
            childToAdd.addChild(terminalNode);

            // act
            iNode.addChild(childToAdd);

            // assert
            expect(iNode.children.length).toBe(1);
            const middleNode = iNode.children[0]
            expect(middleNode).not.toBeNull;
            expect(middleNode.children.length).toBe(1);
            const finalNode = middleNode.children[0];
            expect(finalNode.getKanaString()).toBe('か');
            expect(finalNode.children.length).toBe(0);
            expect(finalNode.isTerminal).toBe(true);
        })
    })

    describe("getChildOrNullByValue", () => {
        it('returns a child whose value is an exact match for provided string', () => {
                // arrange
                const parentNode = new KanaNode(new Kana('は'));
                const nodeToAdd = new KanaNode(new Kana('や'));
                parentNode.children.push(nodeToAdd);
    
                // act
                const result = parentNode.getChildOrNullByValue(new Kana('や'));
    
                // assert
                expect(result).toBe(nodeToAdd);
        })

        it('returns null if no child with exact value exists', () => {
            // arrange
            const parentNode = new KanaNode(new Kana('は'));
            parentNode.children.push(
                new KanaNode(new Kana('の')), 
                new KanaNode(new Kana('な'))
            );

            // act
            const result = parentNode.getChildOrNullByValue(new Kana('お'));

            // assert
            expect(result).toBe(null);
    })
    })
})