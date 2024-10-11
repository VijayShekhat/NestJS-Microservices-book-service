import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
        secret: process.env.JWT_SECRET, // Ensure this is set
        signOptions: { expiresIn: '60s' }, // Adjust as necessary
    }),
  ],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
