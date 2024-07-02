import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { ExpressRequest } from "src/types/expressRequest.interface";
import { jwtConstants } from "./constants";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken()
      ]),
      secretOrKey: jwtConstants.secret
    });
  }

  private static extractJWT(req: ExpressRequest) {
    if (req && req.cookies && req.cookies["access_token"]) {
      return req.cookies["access_token"];
    }
    return null;
  }

  async validate(payload: any) {
    return { user: payload };
  }
}