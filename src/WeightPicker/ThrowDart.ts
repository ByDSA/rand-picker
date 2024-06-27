import { SimplePicker, simplePickerThrowDart } from "../SimplePicker";
import { ThrowDartParams } from "../ThrowDartFn";
// eslint-disable-next-line import/no-cycle
import { Picker } from "./Picker";

type GetWeightFn<T> = (t: T)=> number | undefined;

type ThisThrowDartParams<T> = ThrowDartParams<T> & {
  getWeight: GetWeightFn<T>;
};

const throwDart = <T, R = T>( { data, dart, getWeight }: ThisThrowDartParams<T>): R | undefined => {
  if (data.length === 0 || dart < 0)
    return undefined;

  const { accumulated, dartTarget } = getTargetAtDart(dart, data, getWeight);

  if (dartTarget instanceof Picker) {
    const externalWeight = getWeight(dartTarget) as number;
    const internalWeight = dartTarget.weight;
    const factor = internalWeight / externalWeight;
    const fixedDart = Math.floor((dart - accumulated) * factor);
    const dartProcess = throwDart;

    return dartProcess( {
      data: dartTarget.data,
      dart: fixedDart,
      getWeight: dartTarget.getWeight.bind(dartTarget) as GetWeightFn<unknown>,
    } );
  } else if (dartTarget instanceof SimplePicker) {
    const externalWeight = getWeight(dartTarget) as number;
    const internalWeight = dartTarget.length;
    const factor = internalWeight / externalWeight;
    const fixedDart = Math.floor((dart - accumulated) * factor);

    return simplePickerThrowDart( {
      data: dartTarget.data,
      dart: fixedDart,
    } ) as R | undefined;
  }

  if (dartTarget !== undefined)
    return dartTarget as R | undefined;

  return undefined;
};

export {
  throwDart,
};

function getTargetAtDart<T>(dart: number, data: T[], getWeight: GetWeightFn<T>) {
  let accumulated = 0;
  let dartTarget: T | undefined;

  for (const t of data) {
    const tWeight = getWeight(t) as number;

    accumulated += tWeight;

    if (dart < accumulated) {
      dartTarget = t;
      accumulated -= tWeight;

      return {
        dartTarget,
        accumulated,
      };
    }
  }

  return {
    dartTarget,
    accumulated,
  };
}
