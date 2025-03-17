import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async handle(
    payload: any,
    options: {
      secret: string;
      expiresIn: string;
      issuer?: string;
      audience?: string;
    },
  ) {
    return await this.jwtService.signAsync({ ...payload }, { ...options });
  }

  async crypt(data: any, secret: string): Promise<string> {
    return await this.jwtService.signAsync(data, { secret });
  }
}
