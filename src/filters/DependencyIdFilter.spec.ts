import { DependencyList } from "./DependencyFilter";
import { createDependencyIdFilterGenerator } from "./DependencyIdFilter";

describe("items as objects", () => {
  type Item = {
    length: number;
    id: {
      serieId: string;
      episodeId: string;
    };
  };
  const items: Item[] = [
    {
      id: {
        serieId: "simpsons",
        episodeId: "6x25",
      },
      length: 123,
    },
    {
      id: {
        serieId: "simpsons",
        episodeId: "7x01",
      },
      length: 123,
    },
    {
      id: {
        serieId: "simpsons",
        episodeId: "31x19",
      },
      length: 123,
    },
    {
      id: {
        serieId: "simpsons",
        episodeId: "31x20",
      },
      length: 123,
    },
    {
      id: {
        serieId: "fguy",
        episodeId: "6x04",
      },
      length: 123,
    },
    {
      id: {
        serieId: "fguy",
        episodeId: "6x05",
      },
      length: 123,
    },
  ];
  const dependencies: DependencyList<Item["id"]> = [
    [
      {
        serieId: "simpsons",
        episodeId: "6x25",
      }, {
        serieId: "simpsons",
        episodeId: "7x01",
      },
    ],
    [
      {
        serieId: "simpsons",
        episodeId: "31x19",
      }, {
        serieId: "simpsons",
        episodeId: "31x20",
      },
    ],
  ];
  const createDependencyIdFilter = createDependencyIdFilterGenerator<Item, Item["id"]>( {
    dependencies,
    getItemId: ( { id } ) => id,
  } );

  it("should return true when there is no last item", () => {
    const result = createDependencyIdFilter()(items[0]);

    expect(result).toBe(true);
  } );

  it("should return true when the current item is not dependent on the last item", () => {
    const lastId = {
      serieId: "simpsons",
      episodeId: "7x01",
    };
    const item = items.find(( { id } ) => id.serieId === "fguy") as Item;
    const result = createDependencyIdFilter(lastId)(item);

    expect(result).toBe(true);
  } );

  it("should return true when the current item is dependent on the last item and it's valid dependency", () => {
    const lastId = items.find(( { id } ) => id.serieId === "simpsons" && id.episodeId === "6x25")?.id as Item["id"];
    const item = items.find(( { id } ) => id.serieId === "simpsons" && id.episodeId === "7x01") as Item;
    const result = createDependencyIdFilter(lastId)(item);

    expect(result).toBe(true);
  } );
  it("should return false when the current item is dependent on the last item and it's not valid dependency", () => {
    const lastId = items.find(( { id } ) => id.serieId === "simpsons" && id.episodeId === "6x25")?.id as Item["id"];
    const item = items.find(( { id } ) => id.serieId !== "simpsons" || id.episodeId !== "7x01") as Item;
    const result = createDependencyIdFilter(lastId)(item);

    expect(result).toBe(false);
  } );
} );
