export const tokens = {
  fn: "Function",
  if: "If",
  while: "While",
  for: "For",
  else: "Else",

  "+": "Plus",
  "-": "Minus",
  "*": "Multiply",
  "/": "Division",
  "%": "Modulus",
  "=": "Equals",
  "<": "LThan",
  ">": "GThan",
  "<=": "LThanEQ",
  ">=": "GThanEQ",
  "==": "Check",
  "===": "StrictCheck",

  let: "Let",
  const: "Const",

  "(": "RPar",
  ")": "LPar",
  "{": "RBrac",
  "}": "LBrac",
  "[": "RSqBrac",
  "]": "LSqBrac",

  " ": "Space",
  "\n": "NewLine",
  ";": "SemiColon",
  ",": "Comma",
};

export const ids = {
  name: /[a-zA-Z_$][\w$]*/,

  int: /\d+/,
  float: /\d*\.\d*/,
  boolean: /(true|false)/,
  string: /".+"/,

  space: /\s/,

  newln: /^/,
  endln: /$/,
};
