import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormOptions } from './ormConfig';
import { MessageModule } from './message/message.module';
import { AuthModule } from './auth/auth.module';
import UserModule from './user/user.module';
import AuthMiddleware from './auth/middlewares/auth.middleware';

@Module({
  imports: [TypeOrmModule.forRoot(ormOptions), UserModule, MessageModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: "*",
      method: RequestMethod.ALL
    })
  }
}
