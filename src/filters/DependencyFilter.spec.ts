import { DependencyList, createDependencyFilterGenerator } from "./DependencyFilter";

describe("string as item", () => {
  const dependencies: DependencyList<string> = [
    ["A", "B"],
    ["B", "C"],
    ["C", "D"],
  ];
  const createDependencyFilter = createDependencyFilterGenerator<string>( {
    dependencies,
  } );

  it("should return true when there is no last item", () => {
    const result = createDependencyFilter()("A");

    expect(result).toBe(true);
  } );

  it("should return true when the current item is not dependent on the last item", () => {
    const last = "D";
    const result = createDependencyFilter(last)("E");

    expect(result).toBe(true);
  } );

  it("should return true when the current item is dependent on the last item and it's valid dependency", () => {
    const last = "C";
    const result = createDependencyFilter(last)("D");

    expect(result).toBe(true);
  } );
  it("should return false when the current item is dependent on the last item and it's not valid dependency", () => {
    const last = "C";
    const result = createDependencyFilter(last)("B");

    expect(result).toBe(false);
  } );
} );
