import type { NextFunction, Request, Response } from "express";

function sanitizeValue(value: unknown): unknown {
  if (typeof value === "string") {
    return value.replaceAll("\0", "").trim();
  }

  if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [key, sanitizeValue(nestedValue)]),
    );
  }

  return value;
}

export function sanitizeInput(req: Request, _res: Response, next: NextFunction) {
  if (req.body) {
    req.body = sanitizeValue(req.body);
  }

  return next();
}
