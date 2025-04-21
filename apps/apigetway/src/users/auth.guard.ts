import { IS_PUBLIC_KEY } from '@app/shared/decorators/auth.decorator';
import { users } from '@app/shared/schema/user.schema';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { eq } from 'drizzle-orm';
import { Request } from 'express';
import { DRIZZLE } from 'libs/shared/database/database.module';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    @Inject(DRIZZLE) private readonly db,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const currentUser = (
        await this.db
          .select()
          .from(users)
          .where(eq(users.id, payload.sub))
          .limit(1)
      )[0];

      if (!currentUser) {
        throw new UnauthorizedException("Account doesn't exist");
      }

      request['user'] = currentUser;
      request.currentUser = currentUser;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        console.log('TOKEN EXPIRED');
        throw new UnauthorizedException();
      }
      if ((error.name = 'JsonWebTokenError')) {
        console.log('JSON TOKEN ERRor');
      }
      throw error;
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
