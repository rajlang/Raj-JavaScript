/**
 *  The main JavaScript file which is the entry point for the bundler
 */

/** !
 * This comment wont be removed in bundled code
 */

import { log, clear } from "./dev";

import { lexer } from "./lexer";

/**
 * For HMR (Hot Module Replacement) only
 */
if (module.hot) {
  module.hot.accept();
  clear();
}

log("Initializing Raj Compiler \n");

log(
  lexer(`fn main() {
  let alpha = 1;
}`)
);
