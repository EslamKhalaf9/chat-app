import { NextFunction, Response } from "express";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { ExpressRequest } from "src/types/expressRequest.interface";
import { JwtService } from "@nestjs/jwt";
import UserService from "src/user/user.service";
import { jwtConstants } from "../constants";

@Injectable()
export default class AuthMiddleware implements NestMiddleware {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  async use(req: ExpressRequest, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = this.extractTokenFromHeader(req);

    if (!token) {
      req.user = null;
      return next();
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret
        }
      );
      const user = await this.userService.findById(payload.id);
      req.user = user;
      return next();
    } catch {
      req.user = null;
      return next();
    }
  }

  private extractTokenFromHeader(request: ExpressRequest): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}