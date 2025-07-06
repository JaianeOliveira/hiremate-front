interface CleanAndFormatParamsInput {
  [key: string]:
    | string
    | number
    | boolean
    | null
    | undefined
    | Array<string | number | boolean>;
}

interface CleanAndFormatParamsOutput {
  [key: string]: string | number | boolean;
}

export function cleanAndFormatParams(
  params: CleanAndFormatParamsInput
): CleanAndFormatParamsOutput {
  return Object.entries(params || {}).reduce<CleanAndFormatParamsOutput>(
    (acc, [key, val]) => {
      if (val === undefined || val === null) return acc;

      if (Array.isArray(val)) {
        if (val.length === 0) return acc;
        acc[key] = val.join(",");
        return acc;
      }

      if (typeof val === "string" && val.trim() === "") return acc;

      acc[key] = val as string | number | boolean;
      return acc;
    },
    {}
  );
}
