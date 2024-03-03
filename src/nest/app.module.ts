import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AllocationController } from './allocation.controller';
import { PROVIDERS } from './providers';

const providers = [
  ...Object.values(PROVIDERS.USECASES),
  ...Object.values(PROVIDERS.REPOSITORIES),
];

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AllocationController],
  providers,
})
export class AppModule {}
