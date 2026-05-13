import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

type RequestParts = {
  body?: unknown;
  params?: unknown;
  query?: unknown;
};

export function validateRequest(schema: ZodType) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const data = schema.parse({
      body: req.body,
      params: req.params,
      query: req.query,
    }) as RequestParts;

    if (data.body) {
      req.body = data.body;
    }

    if (data.params) {
      req.params = data.params as typeof req.params;
    }

    return next();
  };
}
