import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { middlewares } from './middlewares';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  middlewares(app);
  await app.listen(3000);
}
bootstrap();
