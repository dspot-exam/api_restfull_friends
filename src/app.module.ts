import { Module } from '@nestjs/common';
import { ProfilesModule } from './profile/profile.module';
import { FriendsModule } from './friends/friends.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [ProfilesModule, FriendsModule, SeedModule],
})
export class AppModule {}
