import { NextFunction, Response } from "express";
import { Injectable, NestMiddleware } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { ExpressRequest } from "src/types/expressRequest.interface";
import UserService from "../user.service";

@Injectable()
export default class AuthMiddleware implements NestMiddleware {

  constructor(private readonly userService: UserService) {}

  async use(req: ExpressRequest, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(" ")[1];

    try {
      const decode = jwt.verify(token, "secret") as { id: number, username: string, email: string, iat: number };
      const user = await this.userService.findById(decode.id);
      req.user = user;
      return next();
    } catch {
      req.user = null;
      return next();
    }
  }
}