import { Request } from "express";
import { Logger } from "pino";

export type ExtendedRequest = Request & { id: string; logger: Logger };
