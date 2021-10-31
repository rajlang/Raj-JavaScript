import { TOKENS, TOKEN_REGEX } from "./tokens";

/**
 *
 * Token - Represents a single token
 *
 * @author Rajaniraiyn
 * @version 0.0.1
 * @since 0.0.1
 * @class Token
 *
 */
class Token {
  /**
   *
   * @param {string} value - The value of the token
   * @param {string} type - The type of token
   * @param {number} line - The line number of the token
   * @param {number} column - The column number of the token
   * @param {number} offset - The offset of the token
   */
  constructor(value, type, line, column, offset) {
    this.value = value;
    this.type = type;
    this.position = {
      line,
      column,
    };
    this.offset = offset;
  }
}

/**
 *
 * Lexer - Represents the lexer
 *
 * @author Rajaniraiyn
 * @version 0.0.1
 * @since 0.0.1
 * @class Lexer
 *
 */
class Lexer {
  /**
   *
   * @param {string} code - The source code to be lexed
   *
   */
  constructor(code) {
    this.input = code;
    this.length = code.length;

    this.offset = 0;
    this.output = [];
    this.line = 1;
    this.column = 1;
    this.token = {
      value: "",
      type: "",
    };
    this.availableTokens = Object.keys(TOKENS);

    return this.tokenize();
  }

  /**
   * Pushes a token to the output
   *
   * @param {Boolean} skipSetTokenType - If true, skips setting the token type
   *
   * @author Rajaniraiyn
   * @since 0.0.1
   * @version 0.0.1
   * @private
   *
   */
  pushToken(skipSetTokenType = false) {
    if (!skipSetTokenType) {
      this.setTokenType();
    }
    if (![" ", "\t", "\n", "\r", "\v", ";"].includes(this.token.value)) {
      const token = new Token(
        this.token.value,
        this.token.type,
        this.line,
        this.column - this.token.value.length + 1,
        this.offset
      );
      this.output.push(token);
    }

    // resets the token
    this.token = {
      value: "",
      type: "",
    };
  }

  /**
   * Tokenizes the source code
   *
   * @author Rajaniraiyn
   * @since 0.0.1
   * @version 0.0.1
   * @private
   *
   * @return {Array<Token>} - An array of tokens
   *
   */
  tokenize() {
    while (this.offset < this.length) {
      if (this.token.value === "") {
        this.token.value += this.current();
      }

      if (this.availableTokens.includes(this.current())) {
        if (TOKEN_REGEX.keyword.test(this.token.value)) {
          this.token.value += this.next();
        } else {
          this.pushToken();
        }
      } else {
        if (this.isAvailableToken()) {
          this.pushToken();
        } else {
          this.token.value += this.next();
        }
      }

      this.peek();
    }

    this.token.type = "EOF";
    this.pushToken(true);

    return this.output;
  }

  /**
   *  Checks if the next character is in the availableTokens
   *
   * @author Rajaniraiyn
   * @since 0.0.1
   * @version 0.0.1
   * @private
   *
   * @return {boolean} - True if the next character is in the availableTokens
   *
   */
  isAvailableToken() {
    return this.availableTokens.includes(this.next());
  }

  /**
   * Checks if the next character is a whitespace
   *
   * @author Rajaniraiyn
   * @since 0.0.1
   * @version 0.0.1
   * @private
   *
   * @return {boolean} - True if the next character is a whitespace
   *
   */
  isWhitespace() {
    return TOKEN_REGEX.whitespace.test(this.next());
  }

  /**
   * Gets the current character from the source code
   *
   * @author Rajaniraiyn
   * @since 0.0.1
   * @version 0.0.1
   * @private
   *
   * @return {string} - The current character
   *
   */
  current() {
    return this.input[this.offset];
  }

  /**
   * Gets next character from the source code
   *
   * @author Rajaniraiyn
   * @since 0.0.1
   * @version 0.0.1
   * @private
   *
   * @return {string} - The next character
   *
   */
  next() {
    return this.input[this.offset + 1];
  }

  /**
   * Peeks the current character from the source code
   *
   * @author Rajaniraiyn
   * @since 0.0.1
   * @version 0.0.1
   * @private
   *
   */
  peek() {
    // resets the column when the character is new line
    if (this.current() === "\n") {
      this.line += 1;
      this.column = 0;
    }
    this.offset += 1;
    this.column += 1;
  }

  /**
   *  Sets the token.type using token.value
   *
   * @author Rajaniraiyn
   * @since 0.0.1
   * @version 0.0.1
   * @private
   *
   */
  setTokenType() {
    const priority = [
      "operator",
      "punctuation",
      "identifier",
      "number",
      "string",
      "keyword",
    ];

    /**
     * Reversed For Loop with maximum efficiency
     * to find the type of the token in priority
     */
    for (let i = priority.length - 1; i >= 0; i -= 1) {
      if (TOKEN_REGEX[priority[i]].test(this.token.value)) {
        this.token.type = priority[i] || "UNKNOWN";
        break;
      }
    }

    if (["operator", "keyword", "punctuation"].includes(this.token.type)) {
      this.token.type = TOKENS[this.token.value];
    } else {
      this.token.type = this.token.type.toUpperCase();
    }
  }
}

/**
 * Entry point for the Lexer class
 *
 * @author Rajaniraiyn
 * @since 0.0.1
 * @version 0.0.1
 * @param {string} code - The source code to be lexed
 *
 * @return {Array<Token>} - An array of tokens
 *
 */
export function lexer(code) {
  return new Lexer(code);
}
