import { sanitize } from "./sanitize";

export function parser(lexemes) {
  const input = sanitize(lexemes);

  const AST = {}; // Abstract Syntax Tree

  function main() {
    AST.sanitized = input;

    return AST;
  }

  return main();
}
