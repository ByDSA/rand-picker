import { createRemoveManyFilter } from "./RemoveManyFilter";

const resources = [1, 2, 3, 4];

describe.each([
  [undefined, true],
  [null, true],
  [1, false],
  [5, true],
  [2, false],
])("removeManyFilter(%j)", (resource: unknown, expected) => {
  it(`should return ${expected}`, () => {
    const filter = createRemoveManyFilter<unknown>(resources as unknown[]);
    const result = filter(resource);

    expect(result).toBe(expected);
  } );
} );

it("should return true if the context resources array is empty", () => {
  const filter = createRemoveManyFilter<unknown>([]);
  const resource = 1;
  const result = filter(resource);

  expect(result).toBe(true);
} );
