import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormOptions } from './ormConfig';
import { MessageModule } from './message/message.module';
import UserModule from './user/user.module';
import AuthMiddleware from './user/middlewares/auth.middleware';

@Module({
  imports: [TypeOrmModule.forRoot(ormOptions), UserModule, MessageModule],
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
