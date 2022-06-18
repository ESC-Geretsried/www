// Type definitions for body-scroll-lock 2.6
// Project: https://github.com/willmcpo/body-scroll-lock
// Definitions by: kimcoder <https://github.com/kimcoder>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
declare module "body-scroll-lock" {
  export interface BodyScrollOptions {
    reserveScrollBarGap?: boolean;
    allowTouchMove?: (el: HTMLElement | Element) => void;
  }

  export function disableBodyScroll(targetElement: HTMLElement | Element | null, options?: BodyScrollOptions): void;
  export function enableBodyScroll(targetElement: HTMLElement | Element | null): void;
  export function clearAllBodyScrollLocks(): void;
}
