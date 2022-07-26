import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseConnectionService } from './shared/databases/database-connection-service';
import { DatabaseModule } from './infra/database/database.module';
import { DomainModule } from './domain/domain.module';
import { PresentationModule } from './presentation/presentation.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    DomainModule,
    PresentationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
