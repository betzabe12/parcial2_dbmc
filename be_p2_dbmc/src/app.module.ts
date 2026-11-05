import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecintosModule } from './recintos/recintos.module.js';
import { EventoCulturalModule } from './evento-cultural/evento-cultural.module.js';

  @Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number.parseInt(process.env.DB_PORT ?? ''),
      username: process.env.DB_USER,     
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      
      autoLoadEntities: true, 
      synchronize: true,
    }),
    RecintosModule,
    EventoCulturalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
