const sanitize = require("./sanitize");

// @ponicode
describe("sanitize.sanitize", () => {
  test("0", () => {
    const param1 = [
      { value: "fn", type: "Function", position: { line: 1, column: 1 } },
      { value: "main", type: "Identifier", position: { line: 1, column: 4 } },
      { value: "(", type: "RPar", position: { line: 1, column: 8 } },
      { value: ")", type: "LPar", position: { line: 1, column: 9 } },
      { value: " ", type: "Space", position: { line: 1, column: 10 } },
      { value: "{", type: "RBrac", position: { line: 1, column: 11 } },
      { value: "let", type: "Let", position: { line: 1, column: 12 } },
      { value: "alpha", type: "Identifier", position: { line: 1, column: 16 } },
      { value: "=", type: "Equals", position: { line: 1, column: 22 } },
      { value: " ", type: "Space", position: { line: 1, column: 23 } },
      { value: "2", type: "Integer", position: { line: 1, column: 24 } },
      { value: ";", type: "SemiColon", position: { line: 1, column: 25 } },
      { value: "}", type: "LBrac", position: { line: 1, column: 26 } },
      { value: "", type: "EndLn", position: { line: 1, column: 27 } },
    ];
    const result = sanitize.sanitize(param1);
    const object = [
      { value: "let", type: "Let", position: { line: 1, column: 12 } },
      { value: "alpha", type: "Identifier", position: { line: 1, column: 16 } },
      { value: "=", type: "Equals", position: { line: 1, column: 22 } },
      { value: " ", type: "Space", position: { line: 1, column: 23 } },
      { value: "2", type: "Integer", position: { line: 1, column: 24 } },
    ];
    const object2 = [
      { value: "fn", type: "Function", position: { line: 1, column: 1 } },
      { value: "main", type: "Identifier", position: { line: 1, column: 4 } },
      { value: "(", type: "RPar", position: { line: 1, column: 8 } },
      { value: ")", type: "LPar", position: { line: 1, column: 9 } },
      { value: " ", type: "Space", position: { line: 1, column: 10 } },
      object,
      { value: "", type: "EndLn", position: { line: 1, column: 27 } },
    ];
    expect(result).toEqual(object2);
  });

  test("1", () => {
    const param1 = [
      { value: "let", type: "Let", position: { line: 1, column: 1 } },
      { value: "beta", type: "Identifier", position: { line: 1, column: 5 } },
      { value: "=", type: "Equals", position: { line: 1, column: 10 } },
      { value: " ", type: "Space", position: { line: 1, column: 11 } },
      { value: "34", type: "Integer", position: { line: 1, column: 12 } },
      { value: ";", type: "SemiColon", position: { line: 1, column: 14 } },
      { value: "", type: "EndLn", position: { line: 1, column: 15 } },
    ];
    const result = sanitize.sanitize(param1);
    const object = [
      { value: "let", type: "Let", position: { line: 1, column: 1 } },
      { value: "beta", type: "Identifier", position: { line: 1, column: 5 } },
      { value: "=", type: "Equals", position: { line: 1, column: 10 } },
      { value: " ", type: "Space", position: { line: 1, column: 11 } },
      { value: "34", type: "Integer", position: { line: 1, column: 12 } },
      { value: "", type: "EndLn", position: { line: 1, column: 15 } },
    ];
    expect(result).toEqual(object);
  });

  test("2", () => {
    const param1 = [
      { value: "if", type: "If", position: { line: 1, column: 1 } },
      { value: "(", type: "RPar", position: { line: 1, column: 4 } },
      { value: "true", type: "Boolean", position: { line: 1, column: 5 } },
      { value: ")", type: "LPar", position: { line: 1, column: 9 } },
      { value: " ", type: "Space", position: { line: 1, column: 10 } },
      { value: "{", type: "RBrac", position: { line: 1, column: 11 } },
      { value: " ", type: "Space", position: { line: 1, column: 12 } },
      { value: "const", type: "Const", position: { line: 1, column: 13 } },
      { value: "PI", type: "Identifier", position: { line: 1, column: 19 } },
      { value: "=", type: "Equals", position: { line: 1, column: 22 } },
      { value: " ", type: "Space", position: { line: 1, column: 23 } },
      { value: "3.1415", type: "Float", position: { line: 1, column: 24 } },
      { value: "}", type: "LBrac", position: { line: 1, column: 31 } },
      { value: "", type: "EndLn", position: { line: 1, column: 32 } },
    ];
    const result = sanitize.sanitize(param1);
    const object = [
      { value: " ", type: "Space", position: { line: 1, column: 12 } },
      { value: "const", type: "Const", position: { line: 1, column: 13 } },
      { value: "PI", type: "Identifier", position: { line: 1, column: 19 } },
      { value: "=", type: "Equals", position: { line: 1, column: 22 } },
      { value: " ", type: "Space", position: { line: 1, column: 23 } },
      { value: "3.1415", type: "Float", position: { line: 1, column: 24 } },
    ];
    const object2 = [
      { value: "if", type: "If", position: { line: 1, column: 1 } },
      { value: "(", type: "RPar", position: { line: 1, column: 4 } },
      { value: "true", type: "Boolean", position: { line: 1, column: 5 } },
      { value: ")", type: "LPar", position: { line: 1, column: 9 } },
      { value: " ", type: "Space", position: { line: 1, column: 10 } },
      object,
      { value: "", type: "EndLn", position: { line: 1, column: 32 } },
    ];
    expect(result).toEqual(object2);
  });

  test("3", () => {
    const param1 = [
      { value: "fn", type: "Function", position: { line: 1, column: 1 } },
      { value: "{", type: "RBrac", position: { line: 1, column: 3 } },
      { value: "(", type: "RPar", position: { line: 1, column: 4 } },
      { value: ")", type: "LPar", position: { line: 1, column: 5 } },
      { value: "fn", type: "Function", position: { line: 1, column: 6 } },
      { value: "{", type: "RBrac", position: { line: 1, column: 8 } },
      { value: "(", type: "RPar", position: { line: 1, column: 9 } },
      { value: ")", type: "LPar", position: { line: 1, column: 10 } },
      { value: "}", type: "LBrac", position: { line: 1, column: 11 } },
      { value: "(", type: "RPar", position: { line: 1, column: 12 } },
      { value: ")", type: "LPar", position: { line: 1, column: 13 } },
      { value: "}", type: "LBrac", position: { line: 1, column: 14 } },
      { value: "", type: "EndLn", position: { line: 1, column: 15 } },
    ];
    const result = sanitize.sanitize(param1);
    const object = [
      { value: "(", type: "RPar", position: { line: 1, column: 9 } },
      { value: ")", type: "LPar", position: { line: 1, column: 10 } },
    ];
    const object2 = [
      { value: "(", type: "RPar", position: { line: 1, column: 4 } },
      { value: ")", type: "LPar", position: { line: 1, column: 5 } },
      { value: "fn", type: "Function", position: { line: 1, column: 6 } },
      object,
    ];
    const object3 = [
      { value: "fn", type: "Function", position: { line: 1, column: 1 } },
      object2,
      { value: "(", type: "RPar", position: { line: 1, column: 12 } },
      { value: ")", type: "LPar", position: { line: 1, column: 13 } },
      { value: "", type: "EndLn", position: { line: 1, column: 15 } },
    ];
    expect(result).toEqual(object3);
  });

  test("4", () => {
    const param1 = [
      { value: "{", type: "RBrac", position: { line: 1, column: 1 } },
      { value: "{", type: "RBrac", position: { line: 1, column: 2 } },
      { value: "{", type: "RBrac", position: { line: 1, column: 3 } },
      { value: "{", type: "RBrac", position: { line: 1, column: 4 } },
      { value: "{", type: "RBrac", position: { line: 1, column: 5 } },
      { value: "}", type: "LBrac", position: { line: 1, column: 6 } },
      { value: "}", type: "LBrac", position: { line: 1, column: 7 } },
      { value: "}", type: "LBrac", position: { line: 1, column: 8 } },
      { value: "}", type: "LBrac", position: { line: 1, column: 9 } },
      { value: "{", type: "RBrac", position: { line: 1, column: 10 } },
      { value: "{", type: "RBrac", position: { line: 1, column: 11 } },
      { value: "{", type: "RBrac", position: { line: 1, column: 12 } },
      { value: "}", type: "LBrac", position: { line: 1, column: 13 } },
      { value: "}", type: "LBrac", position: { line: 1, column: 14 } },
      { value: "}", type: "LBrac", position: { line: 1, column: 15 } },
      { value: "{", type: "RBrac", position: { line: 1, column: 16 } },
      { value: "{", type: "RBrac", position: { line: 1, column: 17 } },
      { value: "}", type: "LBrac", position: { line: 1, column: 18 } },
      { value: "}", type: "LBrac", position: { line: 1, column: 19 } },
      { value: "}", type: "LBrac", position: { line: 1, column: 20 } },
      { value: "", type: "EndLn", position: { line: 1, column: 21 } },
    ];
    const result = sanitize.sanitize(param1);
    const object = [[]];
    const object2 = [object];
    const object3 = [object2];
    const object4 = [object3];
    const object5 = [[]];
    const object6 = [object5];
    const object7 = [[]];
    const object8 = [
      object4,
      object6,
      object7,
      { value: "", type: "EndLn", position: { line: 1, column: 21 } },
    ];
    expect(result).toEqual(object8);
  });

  test("5", () => {
    const param1 = [
      { value: "fn", type: "Function", position: { line: 1, column: 1 } },
      { value: "main", type: "Identifier", position: { line: 1, column: 4 } },
      { value: "(", type: "RPar", position: { line: 1, column: 8 } },
      { value: ")", type: "LPar", position: { line: 1, column: 9 } },
      { value: " ", type: "Space", position: { line: 1, column: 10 } },
      { value: "{", type: "RBrac", position: { line: 1, column: 11 } },
      { value: "\n", type: "NewLine", position: { line: 1, column: 12 } },
      { value: " ", type: "Space", position: { line: 2, column: 13 } },
      { value: " ", type: "Space", position: { line: 2, column: 14 } },
      { value: "let", type: "Let", position: { line: 2, column: 15 } },
      { value: "alpha", type: "Identifier", position: { line: 2, column: 19 } },
      { value: "=", type: "Equals", position: { line: 2, column: 25 } },
      { value: " ", type: "Space", position: { line: 2, column: 26 } },
      { value: "1", type: "Integer", position: { line: 2, column: 27 } },
      { value: ";", type: "SemiColon", position: { line: 2, column: 28 } },
      { value: "\n", type: "NewLine", position: { line: 2, column: 29 } },
      { value: " ", type: "Space", position: { line: 3, column: 30 } },
      { value: " ", type: "Space", position: { line: 3, column: 31 } },
      { value: "fn", type: "Function", position: { line: 3, column: 32 } },
      { value: "raj", type: "Identifier", position: { line: 3, column: 35 } },
      { value: "(", type: "RPar", position: { line: 3, column: 38 } },
      { value: ")", type: "LPar", position: { line: 3, column: 39 } },
      { value: " ", type: "Space", position: { line: 3, column: 40 } },
      { value: "{", type: "RBrac", position: { line: 3, column: 41 } },
      { value: "\n", type: "NewLine", position: { line: 3, column: 42 } },
      { value: " ", type: "Space", position: { line: 4, column: 43 } },
      { value: " ", type: "Space", position: { line: 4, column: 44 } },
      { value: " ", type: "Space", position: { line: 4, column: 45 } },
      { value: " ", type: "Space", position: { line: 4, column: 46 } },
      { value: "const", type: "Const", position: { line: 4, column: 47 } },
      { value: "beta", type: "Identifier", position: { line: 4, column: 53 } },
      { value: "=", type: "Equals", position: { line: 4, column: 58 } },
      { value: " ", type: "Space", position: { line: 4, column: 59 } },
      { value: "2", type: "Integer", position: { line: 4, column: 60 } },
      { value: ";", type: "SemiColon", position: { line: 4, column: 61 } },
      { value: "\n", type: "NewLine", position: { line: 4, column: 62 } },
      { value: " ", type: "Space", position: { line: 5, column: 63 } },
      { value: " ", type: "Space", position: { line: 5, column: 64 } },
      { value: "}", type: "LBrac", position: { line: 5, column: 65 } },
      { value: "\n", type: "NewLine", position: { line: 5, column: 66 } },
      { value: "}", type: "LBrac", position: { line: 6, column: 67 } },
      { value: "", type: "EndLn", position: { line: 6, column: 68 } },
    ];
    const result = sanitize.sanitize(param1);
    const object = [
      { value: "\n", type: "NewLine", position: { line: 3, column: 42 } },
      { value: "const", type: "Const", position: { line: 4, column: 47 } },
      { value: "beta", type: "Identifier", position: { line: 4, column: 53 } },
      { value: "=", type: "Equals", position: { line: 4, column: 58 } },
      { value: " ", type: "Space", position: { line: 4, column: 59 } },
      { value: "2", type: "Integer", position: { line: 4, column: 60 } },
      { value: "\n", type: "NewLine", position: { line: 4, column: 62 } },
    ];
    const object2 = [
      { value: "\n", type: "NewLine", position: { line: 1, column: 12 } },
      { value: "let", type: "Let", position: { line: 2, column: 15 } },
      { value: "alpha", type: "Identifier", position: { line: 2, column: 19 } },
      { value: "=", type: "Equals", position: { line: 2, column: 25 } },
      { value: " ", type: "Space", position: { line: 2, column: 26 } },
      { value: "1", type: "Integer", position: { line: 2, column: 27 } },
      { value: "\n", type: "NewLine", position: { line: 2, column: 29 } },
      { value: "fn", type: "Function", position: { line: 3, column: 32 } },
      { value: "raj", type: "Identifier", position: { line: 3, column: 35 } },
      { value: "(", type: "RPar", position: { line: 3, column: 38 } },
      { value: ")", type: "LPar", position: { line: 3, column: 39 } },
      { value: " ", type: "Space", position: { line: 3, column: 40 } },
      object,
    ];
    const object3 = [
      { value: "fn", type: "Function", position: { line: 1, column: 1 } },
      { value: "main", type: "Identifier", position: { line: 1, column: 4 } },
      { value: "(", type: "RPar", position: { line: 1, column: 8 } },
      { value: ")", type: "LPar", position: { line: 1, column: 9 } },
      { value: " ", type: "Space", position: { line: 1, column: 10 } },
      object2,
      { value: "\n", type: "NewLine", position: { line: 5, column: 66 } },
      { value: "", type: "EndLn", position: { line: 6, column: 68 } },
    ];
    expect(result).toEqual(object3);
  });
});
