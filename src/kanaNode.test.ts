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
        it('can add a provided node to its children', () => {
            // arrange
            const parentNode = new KanaNode('は');
            const nodeToAdd = new KanaNode('か');

            // act
            parentNode.addChild(nodeToAdd);

            // assert
            expect(parentNode.children[0]).toBe(nodeToAdd);
        })

        it('does not check for duplicates before adding a child node', () => {
            // arrange
            const parentNode = new KanaNode('は');
            const kaChildToAdd = new KanaNode('か');
            const saChildToAdd = new KanaNode('さ');

            // act
            parentNode.addChild(kaChildToAdd);
            parentNode.addChild(saChildToAdd);

            // assert
            expect(parentNode.children.length).toBe(2);
        })
    })

    describe("getChildOrNullByValue", () => {
        it('returns a child whose value is an exact match for provided string', () => {
                // arrange
                const parentNode = new KanaNode('は');
                const nodeToAdd = new KanaNode('や');
                parentNode.addChild(nodeToAdd);
    
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