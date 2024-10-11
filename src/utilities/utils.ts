export type Iterator = {
  next: () => number;
  prev: () => number;
  current: () => number;
};

export function rotate(value: number): Iterator {
  let current = 0;
  return {
    next() {
      current += 1;
      if (current > value) {
        current = 0;
      }
      return current;
    },
    prev() {
      current -= 1;
      if (current < 0) {
        current = value;
      }
      return current;
    },
    current() {
      return current;
    },
  };
}

export function sleep(time: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function trimEnd(str: string, suffix: string): string {
  return str.replace(new RegExp(`${escapeRegExp(suffix)}$`), "");
}

export function isMultiline(text?: string): boolean {
  return text?.includes("\n") || false;
}

export function normalizeURL(url: string): string {
  if (url && url.endsWith("/")) {
    return url.slice(0, -1);
  }
  return url;
}

export function normalizeURLPath(urlPath: string): string {
  if (urlPath && urlPath.charAt(0) != "/") {
    return `/${urlPath}`
  }
  return urlPath;
}
