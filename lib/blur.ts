export function shimmer(w: number, h: number) {
  return `\n  <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">\n    <defs>\n      <linearGradient id="g">\n        <stop stop-color="#E5E7EB" offset="20%" />\n        <stop stop-color="#F3F4F6" offset="50%" />\n        <stop stop-color="#E5E7EB" offset="70%" />\n      </linearGradient>\n    </defs>\n    <rect width="${w}" height="${h}" fill="#E5E7EB" />\n    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />\n    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />\n  </svg>`;
}

export function toBase64(str: string) {
  if (typeof window === "undefined") {
    return Buffer.from(str).toString("base64");
  }
  return window.btoa(str);
}

export function blurDataURL(w: number, h: number) {
  return `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`;
}
