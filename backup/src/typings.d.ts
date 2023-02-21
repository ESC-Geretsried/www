/* eslint-disable @typescript-eslint/no-explicit-any */

declare module "*.svg" {
  export const ReactComponent: React.SFC<{ title?: string } & React.SVGAttributes<SVGElement>>;
  const src: string;
  export default src;
}
declare module "*.gif" {
  const value: any;
  export default value;
}
declare module "*.png" {
  const value: any;
  export default value;
}
declare module "*.json" {
  const value: any;
  export default value;
}
declare module "*.ttf" {
  const value: any;
  export default value;
}
declare module "*.woff" {
  const value: any;
  export default value;
}
declare module "*.woff2" {
  const value: any;
  export default value;
}
