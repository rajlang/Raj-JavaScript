/**
 *  The main JavaScript file which is the entry point for the bundler
 */

/** !
 * This comment wont be removed in bundled code
 */

import { log, clear } from "./dev";

import { lexer } from "./lexer/lexer";

// import { parser } from "./parser/parser";

// import { sanitize } from "./parser/sanitize";

/**
 * For HMR (Hot Module Replacement) only
 */
if (module.hot) {
  module.hot.accept();
  clear();
}

log("Initializing Raj Compiler \n");

const code = `fn main() {
  let alpha = 1;
  fn raj() {
    const beta = 2;
  }
}`;

const lexemes = lexer(code);

// const ACT = parser(lexemes);

log("\n\n");
log(code);
log("\n\n");
log(lexemes);
log("\n\n");
// log(ACT);
// sanitize(lexemes);
