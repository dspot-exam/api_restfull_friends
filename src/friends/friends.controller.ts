import { Controller, Get, Param } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('friends')
@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @ApiResponse({
    status: 200,
    description: 'Return all friends of a profile.',
    type: [Number],
  })
  @Get(':id')
  getFriends(@Param('id') id: string) {
    return this.friendsService.getFriends(+id);
  }

  @ApiResponse({
    status: 200,
    description: 'Return shorter connection between two profiles.',
    type: [Number],
  })
  @Get(':profileId1/shorter-connection/:profileId2')
  getShorterConnection(
    @Param('profileId1') profileId1: string,
    @Param('profileId2') profileId2: string,
  ) {
    return this.friendsService.getShorterConnection(+profileId1, +profileId2);
  }
}
