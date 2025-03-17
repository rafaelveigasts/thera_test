import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  handle() {
    return this.authService.handle({}, { secret: '', expiresIn: '' });
  }
}
