const lexer = require("./lexer");

// @ponicode
describe("lexer.lexer", () => {
  test("Let within Function", () => {
    const result = lexer.lexer("fn main() {let alpha = 2;}");
    const object = [
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
    expect(result).toEqual(object);
  });

  test("Let", () => {
    const result = lexer.lexer("let beta = 34;");
    const object = [
      { value: "let", type: "Let", position: { line: 1, column: 1 } },
      { value: "beta", type: "Identifier", position: { line: 1, column: 5 } },
      { value: "=", type: "Equals", position: { line: 1, column: 10 } },
      { value: " ", type: "Space", position: { line: 1, column: 11 } },
      { value: "34", type: "Integer", position: { line: 1, column: 12 } },
      { value: ";", type: "SemiColon", position: { line: 1, column: 14 } },
      { value: "", type: "EndLn", position: { line: 1, column: 15 } },
    ];
    expect(result).toEqual(object);
  });

  test("Const within Conditional", () => {
    const result = lexer.lexer("if (true) { const PI = 3.1415 }");
    const object = [
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
    expect(result).toEqual(object);
  });
});
