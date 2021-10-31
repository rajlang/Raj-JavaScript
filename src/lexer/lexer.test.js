const lexer = require("./lexer");

// @ponicode
describe("lexer.lexer", () => {
  it("simple mutable variable declaration within a funtion", () => {
    const result = lexer.lexer("fn main() {let alpha = 2;}");
    const object = [
      {
        value: "fn",
        type: "FUNCTION",
        position: { line: 1, column: 1 },
        offset: 1,
      },
      {
        value: "main",
        type: "IDENTIFIER",
        position: { line: 1, column: 4 },
        offset: 6,
      },
      {
        value: "(",
        type: "LPAREN",
        position: { line: 1, column: 8 },
        offset: 7,
      },
      {
        value: ")",
        type: "RPAREN",
        position: { line: 1, column: 9 },
        offset: 8,
      },
      {
        value: "{",
        type: "LBRACE",
        position: { line: 1, column: 11 },
        offset: 10,
      },
      {
        value: "let",
        type: "LET",
        position: { line: 1, column: 12 },
        offset: 13,
      },
      {
        value: "alpha",
        type: "IDENTIFIER",
        position: { line: 1, column: 16 },
        offset: 19,
      },
      { value: "=", type: "EQ", position: { line: 1, column: 22 }, offset: 21 },
      {
        value: "2",
        type: "NUMBER",
        position: { line: 1, column: 24 },
        offset: 23,
      },
      {
        value: "}",
        type: "RBRACE",
        position: { line: 1, column: 26 },
        offset: 25,
      },
      { value: "", type: "EOF", position: { line: 1, column: 28 }, offset: 26 },
    ];
    expect(result).toEqual(object);
  });

  it("simple mutable variable declaration", () => {
    const result = lexer.lexer("let beta = 34;");
    const object = [
      {
        value: "let",
        type: "LET",
        position: { line: 1, column: 1 },
        offset: 2,
      },
      {
        value: "beta",
        type: "IDENTIFIER",
        position: { line: 1, column: 5 },
        offset: 7,
      },
      { value: "=", type: "EQ", position: { line: 1, column: 10 }, offset: 9 },
      {
        value: "34",
        type: "NUMBER",
        position: { line: 1, column: 12 },
        offset: 12,
      },
      { value: "", type: "EOF", position: { line: 1, column: 16 }, offset: 14 },
    ];
    expect(result).toEqual(object);
  });

  it("simple im-mutable variable declaration within a if condition", () => {
    const result = lexer.lexer("if (true) { const PI = 3.1415 }");
    const object = [
      { value: "if", type: "IF", position: { line: 1, column: 1 }, offset: 1 },
      {
        value: "(",
        type: "LPAREN",
        position: { line: 1, column: 4 },
        offset: 3,
      },
      {
        value: "true",
        type: "TRUE",
        position: { line: 1, column: 5 },
        offset: 7,
      },
      {
        value: ")",
        type: "RPAREN",
        position: { line: 1, column: 9 },
        offset: 8,
      },
      {
        value: "{",
        type: "LBRACE",
        position: { line: 1, column: 11 },
        offset: 10,
      },
      {
        value: "const",
        type: "CONST",
        position: { line: 1, column: 13 },
        offset: 16,
      },
      {
        value: "PI",
        type: "IDENTIFIER",
        position: { line: 1, column: 19 },
        offset: 19,
      },
      { value: "=", type: "EQ", position: { line: 1, column: 22 }, offset: 21 },
      {
        value: "3",
        type: "NUMBER",
        position: { line: 1, column: 24 },
        offset: 23,
      },
      {
        value: ".",
        type: "DOT",
        position: { line: 1, column: 25 },
        offset: 24,
      },
      {
        value: "1415",
        type: "NUMBER",
        position: { line: 1, column: 26 },
        offset: 28,
      },
      {
        value: "}",
        type: "RBRACE",
        position: { line: 1, column: 31 },
        offset: 30,
      },
      { value: "", type: "EOF", position: { line: 1, column: 33 }, offset: 31 },
    ];
    expect(result).toEqual(object);
  });

  it("complex Functional necsting and variable declaration", () => {
    const result = lexer.lexer(
      'fn raj() {\n\n  let alpha = 1;\n\n  fn main() {\n\n    const beta = 2;\n\n    fn foo() {\n      return println("Bar")\n    }\n\n    return foo();\n\n  }\n\n  let ten = "10";\n\n  println( alpha + ten )\n\n  fn entry() {\n\n    return main();\n\n  }\n\n  return entry();\n\n}'
    );
    const object = [
      {
        value: "fn",
        type: "FUNCTION",
        position: { line: 1, column: 1 },
        offset: 1,
      },
      {
        value: "raj",
        type: "IDENTIFIER",
        position: { line: 1, column: 4 },
        offset: 5,
      },
      {
        value: "(",
        type: "LPAREN",
        position: { line: 1, column: 7 },
        offset: 6,
      },
      {
        value: ")",
        type: "RPAREN",
        position: { line: 1, column: 8 },
        offset: 7,
      },
      {
        value: "{",
        type: "LBRACE",
        position: { line: 1, column: 10 },
        offset: 9,
      },
      {
        value: "let",
        type: "LET",
        position: { line: 3, column: 3 },
        offset: 16,
      },
      {
        value: "alpha",
        type: "IDENTIFIER",
        position: { line: 3, column: 7 },
        offset: 22,
      },
      { value: "=", type: "EQ", position: { line: 3, column: 13 }, offset: 24 },
      {
        value: "1",
        type: "NUMBER",
        position: { line: 3, column: 15 },
        offset: 26,
      },
      {
        value: "fn",
        type: "FUNCTION",
        position: { line: 5, column: 3 },
        offset: 33,
      },
      {
        value: "main",
        type: "IDENTIFIER",
        position: { line: 5, column: 6 },
        offset: 38,
      },
      {
        value: "(",
        type: "LPAREN",
        position: { line: 5, column: 10 },
        offset: 39,
      },
      {
        value: ")",
        type: "RPAREN",
        position: { line: 5, column: 11 },
        offset: 40,
      },
      {
        value: "{",
        type: "LBRACE",
        position: { line: 5, column: 13 },
        offset: 42,
      },
      {
        value: "const",
        type: "CONST",
        position: { line: 7, column: 5 },
        offset: 53,
      },
      {
        value: "beta",
        type: "IDENTIFIER",
        position: { line: 7, column: 11 },
        offset: 58,
      },
      { value: "=", type: "EQ", position: { line: 7, column: 16 }, offset: 60 },
      {
        value: "2",
        type: "NUMBER",
        position: { line: 7, column: 18 },
        offset: 62,
      },
      {
        value: "fn",
        type: "FUNCTION",
        position: { line: 9, column: 5 },
        offset: 71,
      },
      {
        value: "foo",
        type: "IDENTIFIER",
        position: { line: 9, column: 8 },
        offset: 75,
      },
      {
        value: "(",
        type: "LPAREN",
        position: { line: 9, column: 11 },
        offset: 76,
      },
      {
        value: ")",
        type: "RPAREN",
        position: { line: 9, column: 12 },
        offset: 77,
      },
      {
        value: "{",
        type: "LBRACE",
        position: { line: 9, column: 14 },
        offset: 79,
      },
      {
        value: "return",
        type: "RETURN",
        position: { line: 10, column: 7 },
        offset: 92,
      },
      {
        value: "println",
        type: "IDENTIFIER",
        position: { line: 10, column: 14 },
        offset: 100,
      },
      {
        value: "(",
        type: "LPAREN",
        position: { line: 10, column: 21 },
        offset: 101,
      },
      {
        value: '"',
        type: "DOUBLEQUOTE",
        position: { line: 10, column: 22 },
        offset: 102,
      },
      {
        value: "Bar",
        type: "IDENTIFIER",
        position: { line: 10, column: 23 },
        offset: 105,
      },
      {
        value: '"',
        type: "DOUBLEQUOTE",
        position: { line: 10, column: 26 },
        offset: 106,
      },
      {
        value: ")",
        type: "RPAREN",
        position: { line: 10, column: 27 },
        offset: 107,
      },
      {
        value: "}",
        type: "RBRACE",
        position: { line: 11, column: 5 },
        offset: 113,
      },
      {
        value: "return",
        type: "RETURN",
        position: { line: 13, column: 5 },
        offset: 125,
      },
      {
        value: "foo",
        type: "IDENTIFIER",
        position: { line: 13, column: 12 },
        offset: 129,
      },
      {
        value: "(",
        type: "LPAREN",
        position: { line: 13, column: 15 },
        offset: 130,
      },
      {
        value: ")",
        type: "RPAREN",
        position: { line: 13, column: 16 },
        offset: 131,
      },
      {
        value: "}",
        type: "RBRACE",
        position: { line: 15, column: 3 },
        offset: 137,
      },
      {
        value: "let",
        type: "LET",
        position: { line: 17, column: 3 },
        offset: 144,
      },
      {
        value: "ten",
        type: "IDENTIFIER",
        position: { line: 17, column: 7 },
        offset: 148,
      },
      {
        value: "=",
        type: "EQ",
        position: { line: 17, column: 11 },
        offset: 150,
      },
      {
        value: '"',
        type: "DOUBLEQUOTE",
        position: { line: 17, column: 13 },
        offset: 152,
      },
      {
        value: "10",
        type: "NUMBER",
        position: { line: 17, column: 14 },
        offset: 154,
      },
      {
        value: '"',
        type: "DOUBLEQUOTE",
        position: { line: 17, column: 16 },
        offset: 155,
      },
      {
        value: "println",
        type: "IDENTIFIER",
        position: { line: 19, column: 3 },
        offset: 167,
      },
      {
        value: "(",
        type: "LPAREN",
        position: { line: 19, column: 10 },
        offset: 168,
      },
      {
        value: "alpha",
        type: "IDENTIFIER",
        position: { line: 19, column: 12 },
        offset: 174,
      },
      {
        value: "+",
        type: "PLUS",
        position: { line: 19, column: 18 },
        offset: 176,
      },
      {
        value: "ten",
        type: "IDENTIFIER",
        position: { line: 19, column: 20 },
        offset: 180,
      },
      {
        value: ")",
        type: "RPAREN",
        position: { line: 19, column: 24 },
        offset: 182,
      },
      {
        value: "fn",
        type: "FUNCTION",
        position: { line: 21, column: 3 },
        offset: 188,
      },
      {
        value: "entry",
        type: "IDENTIFIER",
        position: { line: 21, column: 6 },
        offset: 194,
      },
      {
        value: "(",
        type: "LPAREN",
        position: { line: 21, column: 11 },
        offset: 195,
      },
      {
        value: ")",
        type: "RPAREN",
        position: { line: 21, column: 12 },
        offset: 196,
      },
      {
        value: "{",
        type: "LBRACE",
        position: { line: 21, column: 14 },
        offset: 198,
      },
      {
        value: "return",
        type: "RETURN",
        position: { line: 23, column: 5 },
        offset: 210,
      },
      {
        value: "main",
        type: "IDENTIFIER",
        position: { line: 23, column: 12 },
        offset: 215,
      },
      {
        value: "(",
        type: "LPAREN",
        position: { line: 23, column: 16 },
        offset: 216,
      },
      {
        value: ")",
        type: "RPAREN",
        position: { line: 23, column: 17 },
        offset: 217,
      },
      {
        value: "}",
        type: "RBRACE",
        position: { line: 25, column: 3 },
        offset: 223,
      },
      {
        value: "return",
        type: "RETURN",
        position: { line: 27, column: 3 },
        offset: 233,
      },
      {
        value: "entry",
        type: "IDENTIFIER",
        position: { line: 27, column: 10 },
        offset: 239,
      },
      {
        value: "(",
        type: "LPAREN",
        position: { line: 27, column: 15 },
        offset: 240,
      },
      {
        value: ")",
        type: "RPAREN",
        position: { line: 27, column: 16 },
        offset: 241,
      },
      {
        value: "}",
        type: "RBRACE",
        position: { line: 29, column: 1 },
        offset: 245,
      },
      {
        value: "",
        type: "EOF",
        position: { line: 29, column: 3 },
        offset: 246,
      },
    ];
    expect(result).toMatchObject(object);
  });

  it("nothing", () => {
    const result = lexer.lexer("");
    const object = [
      { value: "", type: "EOF", position: { line: 1, column: 2 }, offset: 0 },
    ];
    expect(result).toMatchObject(object);
  });
});
