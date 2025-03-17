import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    if (!token) throw new UnauthorizedException();

    const user: any = request.user;
    if (!user) throw new UnauthorizedException();

    const isManager = user.roles.includes(user.Manager);

    if (isManager) {
      request.user = {
        ...user,
        accountId: user.flags.companyAccountId,
        isManager: user.Manager,
      };
      return true;
    } else {
      throw new UnauthorizedException();
    }
  }
}
