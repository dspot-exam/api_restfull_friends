import { Module } from '@nestjs/common';
import { ProfilesModule } from './profile/profile.module';
import { FriendsModule } from './friends/friends.module';
import { SeedModule } from './seed/seed.module';
import { AppController } from './health.controller';

@Module({
  imports: [ProfilesModule, FriendsModule, SeedModule],
  controllers: [AppController],
})
export class AppModule {}
