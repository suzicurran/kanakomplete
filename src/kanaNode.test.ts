import KanaNode from "./kanaNode";
import {describe, it, expect} from '@jest/globals';

describe("KanaNode", () => {
    it('stores the provided initial value', () => {
        // act
        const kanaNode = new KanaNode('は');

        // assert
        expect(kanaNode.value).toBe('は');
    })

    it('is initialized with no children', () => {
        // act
        const kanaNode = new KanaNode('の');

        // assert
        expect(kanaNode.children.length).toBe(0);
    })

    it('can add a provided node to its children', () => {
        // arrange
        const parentNode = new KanaNode('は');
        const nodeToAdd = new KanaNode('か');

        // act
        parentNode.addChild(nodeToAdd);

        // assert
        expect(parentNode.children[0]).toBe(nodeToAdd);
    })
})