/**
 *  The main JavaScript file which is the entry point for the bundler
 */

/** !
 * This comment wont be removed in bundled code
 */

import { log, clear } from "./dev";

import { lexer } from "./lexer/lexer";

import { parser } from "./parser/parser";

/**
 * For HMR (Hot Module Replacement) only
 */
if (module.hot) {
  clear();
  module.hot.accept();
}

log("Initializing Raj Compiler \n");

const code = `fn main() {
  let alpha = 1;
  fn raj() {
    const beta = 2;
  }
}`;

const lexemes = lexer(code);

const AST = parser(lexemes);

log("\n");
log("code:", code);
log("\n");
log("lexemes:", lexemes);
log("\n");
log("AST:", AST);
