/**
 *  The main JavaScript file which is the entry point for the bundler
 */

/** !
 * (C) 2021 Rajaniraiyn
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

// /**
//  *
//  * only for manual testing
//  *
//  */

// try {
//   window.lex = lexer;
//   window.parse = parser;
// } catch (err) {
//   log("This is not a Browser environment");
// }
