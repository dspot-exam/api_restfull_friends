import { Module } from '@nestjs/common';
import { ProfilesService } from './profile.service';
import { ProfilesController } from './profile.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService, PrismaService],
})
export class ProfilesModule {}
