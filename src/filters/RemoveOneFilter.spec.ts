import { createRemoveOneFilter } from "./RemoveOneFilter";

describe.each([
  [undefined, "example", true],
  [null, "example", true],
  ["resource", "example", true],
  ["example", "example", false],
  [1, 1, false],
  [2, 1, true],
])("removeOneFilter(%j, %j)", (resource, ctxResource, expected) => {
  it(`should return ${expected}`, () => {
    const filter = createRemoveOneFilter<unknown>(ctxResource);
    const result = filter(resource);

    expect(result).toBe(expected);
  } );
} );
