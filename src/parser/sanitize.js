export function sanitize(lexemes) {
  const input = lexemes;
  const output = [];

  const len = input.length;

  let cur = 0; // cursor to track index or progress

  const lexeme = () => input[cur];
  const value = () => input[cur].value;

  const push = (data, target = output) => target.push(data);

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

  return main();
}
