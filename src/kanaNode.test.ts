import KanaNode from "./kanaNode";

describe("KanaNode", () => {
    it('stores the provided initial value', () => {
        // act
        const kanaNode = new KanaNode('は');

        // assert
        expect(kanaNode.value).toBe('は');
    })

    it('is initialized with an empty array of children', () => {
        // act
        const kanaNode = new KanaNode('の');

        // assert
        expect(kanaNode.children.length).toBe(0);
    })

    describe("addChild", () => {
        it('can add a provided node to an empty array of children', () => {
            // arrange
            const parentNode = new KanaNode('は');
            const nodeToAdd = new KanaNode('か');

            // act
            parentNode.addChild(nodeToAdd);

            // assert
            expect(parentNode.children[0]).toBe(nodeToAdd);
        })

        it('does not add a duplicate child node', () => {
            // arrange
            const parentNode = new KanaNode('は');
            const kaChildToAdd = new KanaNode('か');

            // act
            parentNode.addChild(kaChildToAdd);
            parentNode.addChild(kaChildToAdd);

            // assert
            expect(parentNode.children.length).toBe(1);
        })

        it('merges the children of the provided node into an existing match', () => {
            // arrange
            const parentNode = new KanaNode('ぶ');
            parentNode.addChild(new KanaNode('は'));
            const childToAdd = new KanaNode('は');
            childToAdd.addChild(new KanaNode('そ'));

            // act
            parentNode.addChild(childToAdd);

            // assert
            expect(parentNode.children.length).toBe(1);
            const haChild = parentNode.children[0];
            expect(haChild).not.toBeNull;
            expect(haChild!.children.length).toBe(1);
        })

        it('applies the isTerminal property when merging in a smaller word', () => {
            // arrange
            const iNode = new KanaNode('い');
            const naNode = new KanaNode('な');
            const kaNode = new KanaNode('か');
            naNode.addChild(kaNode);
            iNode.addChild(naNode);

            const childToAdd = new KanaNode('な');
            const terminalNode = new KanaNode('か');
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
            expect(finalNode.value).toBe('か');
            expect(finalNode.children.length).toBe(0);
            expect(finalNode.isTerminal).toBe(true);
        })
    })

    describe("getChildOrNullByValue", () => {
        it('returns a child whose value is an exact match for provided string', () => {
                // arrange
                const parentNode = new KanaNode('は');
                const nodeToAdd = new KanaNode('や');
                parentNode.children.push(nodeToAdd);
    
                // act
                const result = parentNode.getChildOrNullByValue('や');
    
                // assert
                expect(result).toBe(nodeToAdd);
        })

        it('returns null if no child with exact value exists', () => {
            // arrange
            const parentNode = new KanaNode('は');
            parentNode.children.push(
                new KanaNode('の'), 
                new KanaNode('な')
            );

            // act
            const result = parentNode.getChildOrNullByValue('お');

            // assert
            expect(result).toBe(null);
    })
    })
})