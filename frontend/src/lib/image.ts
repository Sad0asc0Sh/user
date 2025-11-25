export const resolveImageUrl = (source: unknown, fallback = "/placeholder.png"): string => {
  if (!source) {
    return fallback;
  }

  if (typeof source === "string") {
    const trimmed = source.trim();
    return trimmed !== "" ? trimmed : fallback;
  }

  if (
    typeof source === "object" &&
    source !== null &&
    "url" in source &&
    typeof (source as any).url === "string"
  ) {
    const trimmed = (source as any).url.trim();
    return trimmed !== "" ? trimmed : fallback;
  }

  return fallback;
};

