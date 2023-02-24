export type NonNullableProperties<T> = { [K in keyof T]: NonNullable<T[K]> };

export type NoTypename<T> = Omit<T, "__typename">;
