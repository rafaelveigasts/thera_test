// jwt-keycloak.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwksRsa from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtKeycloakStrategy extends PassportStrategy(
  Strategy,
  'JwtKeycloakStrategy',
) {
  constructor(configService: ConfigService) {
    const keycloakUrl = configService.get<string>('KEYCLOAK_URL');
    if (!keycloakUrl) {
      throw new Error('Environment variable KEYCLOAK_URL is missing.');
    }

    const keycloakRealm = configService.get<string>('KEYCLOAK_REALM');
    if (!keycloakRealm) {
      throw new Error('Environment variable KEYCLOAK_REALM is missing.');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        cache: true,
        jwksUri: `${keycloakUrl}/auth/realms/${keycloakRealm}/protocol/openid-connect/certs`,
      }),
      algorithms: ['RS256'],
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
