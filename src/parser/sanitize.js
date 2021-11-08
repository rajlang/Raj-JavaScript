import { TOKEN_REGEX } from "../lexer/tokens";

export function sanitize(lexemes) {
  let input = lexemes;
  const output = [];

  let len = input.length;

  let cur = 0; // cursor to track index or progress

  const lexeme = () => input[cur];
  const value = () => input[cur].value;

  const push = (data, target = output) => target.push(data);

  const isPairStart = () => ["{", "("].includes(value());
  const isPairEnd = () => ["}", ")"].includes(value());
  const isPair = () => ["{", "}", "(", ")"].includes(value());

  function rmSpaces() {
    const cOutput = [];
    const SPACE = TOKEN_REGEX.whitespace;
    const ignore = () => lexeme().type === undefined || value() === undefined;

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

  function withinBracts() {
    const bract = [];
    let first = true;

    function bMain() {
      if (isPairStart() && first) {
        first = false;
        cur += 1;
      }

      while (!isPair()) {
        push(lexeme(), bract);
        cur += 1;
        if (cur === len) return output;
      }

      if (isPairStart() && !first) {
        push(withinBracts(), bract);
        cur += 1;
        bMain();
      }

      if (isPairEnd()) {
        return bract;
      }

      cur += 1;

      return bMain();
    }

    return bMain();
  }

  function main() {
    while (!isPair()) {
      push(lexeme());
      cur += 1;
      if (cur === len) return output;
    }

    if (isPairStart()) {
      push(withinBracts());
    }
    if (isPairEnd()) cur += 1;

    if (cur < len) return main();
    return output;
  }

  // preprocessing
  rmSpaces();

  return main();
}
