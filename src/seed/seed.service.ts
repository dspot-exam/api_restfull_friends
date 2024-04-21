import { Injectable } from '@nestjs/common';
import { createFakeProfiles } from 'src/helpers/seed';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SeedService {
  constructor(private prisma: PrismaService) {}

  async seedProfiles(total: number = 10) {
    const profiles = createFakeProfiles(total);

    return await this.prisma.profile.createMany({
      data: profiles,
    });
  }

  async seedConnections(total: number = 10) {
    const profiles = await this.prisma.profile.findMany({
      where: { available: true },
      select: { id: true },
    });

    const data = [];

    for (let i = 0; i < total; i++) {
      let profileId1 = null;
      const profileId2 =
        profiles[Math.floor(Math.random() * profiles.length)].id;

      while (profileId1 === profileId2 || profileId1 === null) {
        profileId1 = profiles[Math.floor(Math.random() * profiles.length)].id;
      }

      data.push({ profileId1, profileId2 });
    }

    return await this.prisma.friend.createMany({ data });
  }
}
