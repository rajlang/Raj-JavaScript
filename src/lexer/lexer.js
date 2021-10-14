import { tokens, ids } from "./tokens";
import { error } from "../dev";

export function lexer(code) {
  const input = String(code).trim();

  let column = 0;
  let line = 1;

  const totalChars = input.length;
  const availKeyWords = Object.keys(tokens);

  const output = [];

  function push(value, name) {
    let type = name;

    if (type === undefined) {
      if (availKeyWords.includes(value)) {
        type = tokens[value];
      } else if (ids.boolean.test(value)) {
        type = "Boolean";
      } else if (ids.name.test(value)) {
        type = "Identifier";
      } else if (ids.float.test(value)) {
        type = "Float";
      } else if (ids.int.test(value)) {
        type = "Integer";
      } else {
        error(`Unexpected Token: "${value}"`);
      }
    }

    output.push({
      value,
      type,
      position: {
        line,
        column: column + 1,
      },
    });
  }

  function main() {
    const char = input[column];

    if (availKeyWords.includes(char)) {
      push(char);
    } else {
      let $word = "";

      let $col = column;

      while (!availKeyWords.includes(char)) {
        if (ids.space.test(input[$col])) {
          push($word);

          column = $col;
          break;
        }

        if (availKeyWords.includes(input[$col])) {
          push($word);

          column = $col - 1;
          break;
        }

        $word += input[$col];
        $col += 1;
      }
    }

    if (char === "\n") {
      line += 1;
    }

    column += 1;

    if (column === totalChars) {
      push("", "EndLn");
      return output;
    }
    return main();
  }

  return main();
}
