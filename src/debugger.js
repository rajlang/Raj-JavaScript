import { error } from "./dev";

export function unExpected({ type, value, position }, exception) {
  error(
    `Unexpected Token: "${value}" on line: ${position.line} at column: ${position.column}. Expected: ${exception} instead of ${type}`
  );
}
