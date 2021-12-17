import loadable from "@loadable/component";

export const loadableNamedExport = <T extends {}>(
  path: string,
  name: string
) => {
  console.log(`Loading ${name}`);
  return loadable<T>(() => import(path), {
    resolveComponent: (component: Record<string, any>) => component[name],
  });
};
