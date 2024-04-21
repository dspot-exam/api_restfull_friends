import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProfilesService } from './profile.service';
import { PaginationDto, UpdateProfileDto, CreateProfileDto } from './dto';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly friendsService: ProfilesService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The profile has been successfully created.',
    type: CreateProfileDto,
  })
  @ApiOperation({ summary: 'Create profile' })
  create(@Body() createFriendDto: CreateProfileDto) {
    return this.friendsService.create(createFriendDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all profiles' })
  @ApiResponse({
    status: 200,
    description: 'Return all profiles.',
    type: [CreateProfileDto],
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.friendsService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get profile by id' })
  @ApiResponse({
    status: 200,
    description: 'Return profile by id.',
    type: CreateProfileDto,
  })
  findOne(@Param('id') id: string) {
    return this.friendsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update profile by id' })
  @ApiResponse({
    status: 200,
    description: 'Return profile updated.',
    type: CreateProfileDto,
  })
  update(@Param('id') id: string, @Body() updateFriendDto: UpdateProfileDto) {
    return this.friendsService.update(updateFriendDto, +id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete profile by id' })
  @ApiResponse({
    status: 200,
    description: 'Return profile deleted.',
    type: CreateProfileDto,
  })
  remove(@Param('id') id: string) {
    return this.friendsService.remove(+id);
  }
}
