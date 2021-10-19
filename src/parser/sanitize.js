import { ids } from "../lexer/tokens";

export function sanitize(lexemes) {
  let input = lexemes;
  const output = [];

  let len = input.length;

  let cur = 0; // cursor to track index or progress

  const lexeme = () => input[cur];
  const value = () => input[cur].value;

  const push = (data, target = output) => target.push(data);

  function rmSpaces() {
    const cOutput = [];
    const SPACE = ids.space;
    const ignore = () =>
      lexeme().type === undefined || value() === ";" || value() === undefined;

    function sMain() {
      while (ignore()) cur += 1;

      if (SPACE.test(value())) {
        push(lexeme(), cOutput);
        cur += 1;
        while (SPACE.test(value())) cur += 1;
      }
      push(lexeme(), cOutput);
    }

    while (cur < len) {
      sMain();
      cur += 1;
    }

    // updating and resetting for further processing
    input = cOutput;
    cur = 0;
    len = input.length;
  }

  function withinbracts() {
    const bract = [];
    let first = true;

    function bMain() {
      if (value() === "{" && first) {
        first = false;
        cur += 1;
      }

      while (value() !== "{" && value() !== "}") {
        push(lexeme(), bract);
        cur += 1;
        if (cur === len) return output;
      }

      if (value() === "{" && !first) {
        push(withinbracts(), bract);
      }

      if (value() === "}") {
        return bract;
      }

      cur += 1;

      return bMain();
    }

    return bMain();
  }

  function main() {
    while (value() !== "{" && value() !== "}") {
      push(lexeme());
      cur += 1;
      if (cur === len) return output;
    }

    if (value() === "{") {
      push(withinbracts());
    }
    if (value() === "}") cur += 1;

    if (cur < len) return main();
    return output;
  }

  // preprocessing
  rmSpaces();

  return main();
}
