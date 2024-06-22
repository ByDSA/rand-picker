import seedRandom from "seed-random";
import { RandomMode } from "./RandomMode";

type GenerateRandomIntegerProps = {
  min?: number;
  max: number;
  randomMode: RandomMode;
};
export function generateRandomInteger( { max,
  min = 0,
  randomMode = RandomMode.MATH_RANDOM }: GenerateRandomIntegerProps): number {
  const randomZeroToOneNumber = randomMode === RandomMode.SECURE
    ? seedRandom()()
    : Math.random();

  return min + Math.floor(randomZeroToOneNumber * (max - min));
}
