import { BadRequestException, Injectable } from '@nestjs/common';
import { createFakeConnections, createFakeProfiles } from 'src/helpers/seed';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SeedService {
  constructor(private prisma: PrismaService) {}

  async seedProfiles(total: number = 10) {
    const profiles = createFakeProfiles(total);

    await Promise.all([
      this.prisma.friend.deleteMany(),
      this.prisma.profile.deleteMany(),
      this.prisma.$executeRaw`UPDATE sqlite_sequence SET seq = 0`,
    ]);

    return await this.prisma.profile.createMany({
      data: profiles,
    });
  }

  async seedConnections(total: number = 10) {
    const profiles = await this.prisma.profile.findMany({
      where: { available: true },
      select: { id: true },
    });

    if (!profiles.length) {
      throw new BadRequestException(
        'No available profiles to create connections, please seed profiles first.',
      );
    }

    return await this.prisma.friend.createMany({
      data: createFakeConnections(profiles, total),
    });
  }
}
