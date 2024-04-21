import { Controller, Post, Param } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post('profiles/:total')
  seedProfiles(@Param('total') total: number) {
    return this.seedService.seedProfiles(total);
  }
  @Post('connections/:total')
  seedConnections(@Param('total') total: number) {
    return this.seedService.seedConnections(total);
  }
}
