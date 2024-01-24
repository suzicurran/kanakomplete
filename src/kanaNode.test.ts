import KanaNode from "./kanaNode";
import {describe, it, expect} from '@jest/globals';

describe("KanaNode", () => {
    it('stores the provided initial value', () => {
        const kananode = new KanaNode('は');
        expect(kananode.value).toBe('は');
    })
})