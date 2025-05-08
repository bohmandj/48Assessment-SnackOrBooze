const unroll = require("./unroll");

describe("#unroll", function () {

  it("is a function", function () {
    expect(typeof unroll).toEqual("function");
  });

  it("correctly unrolls 1x1 square array", function () {
    const oneSquareArr = [[1]];
    const correctResult = [1];
    expect(unroll(oneSquareArr)).toEqual(correctResult);
  })

  it("correctly unrolls 2x2 square array", function () {
    const twoSquareArr = [
      [1, 2],
      [3, 4]
    ];
    const correctResult = [1, 2, 4, 3];
    expect(unroll(twoSquareArr)).toEqual(correctResult);
  })

  it("correctly unrolls 3x3 square array", function () {
    const threeSquareArr = [
      ["a", "b", "c"],
      ["d", "e", "f"],
      ["g", "h", "i"]
    ];
    const correctResult = ["a", "b", "c", "f", "i", "h", "g", "d", "e"];
    expect(unroll(threeSquareArr)).toEqual(correctResult);
  })

  it("correctly unrolls 4x4 square array", function () {
    const fourSquareArr = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16]
    ];
    const correctResult = [1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10];
    expect(unroll(fourSquareArr)).toEqual(correctResult);
  })

});
