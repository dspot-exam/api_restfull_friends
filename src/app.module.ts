import { Module } from '@nestjs/common';
import { ProfilesModule } from './profile/profile.module';
import { FriendsModule } from './friends/friends.module';

@Module({
  imports: [ProfilesModule, FriendsModule],
})
export class AppModule {}
