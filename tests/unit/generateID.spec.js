const generatedId = require("../../src/utils/generateUUID");

describe("generateUUID", () => {
    it("se é possivel gerar um uuid único", () => {
        const id = generatedId();

        expect(id).toBeDefined();
        expect(typeof id).toBe("string");
        expect(id).toHaveLength(36);
    })
})