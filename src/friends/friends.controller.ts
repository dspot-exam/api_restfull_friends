import { Controller, Get, Param, Post } from '@nestjs/common';
import { FriendsService } from './friends.service';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Get(':id')
  getFriends(@Param('id') id: string) {
    return this.friendsService.getFriends(+id);
  }

  @Get(':profileId1/shorter-connection/:profileId2')
  getShorterConnection(
    @Param('profileId1') profileId1: string,
    @Param('profileId2') profileId2: string,
  ) {
    return this.friendsService.getShorterConnection(+profileId1, +profileId2);
  }

  @Post('seed-profiles/:total')
  seedProfiles(@Param('total') total: number) {
    return this.friendsService.seedProfiles(total);
  }
  @Post('seed-connections/:total')
  seedConnections(@Param('total') total: number) {
    return this.friendsService.seedConnections(total);
  }
}
