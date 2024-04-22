import { Test, TestingModule } from '@nestjs/testing';
import { FriendsService } from './friends.service';
import { PrismaService } from '../prisma.service';
import { createFakeProfiles } from '../helpers/seed';
import { testDbConfig } from '../../test/test-db.config';

describe('Test for shorter connection between two profiles', () => {
  let service: FriendsService;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FriendsService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(new PrismaService(testDbConfig))
      .compile();

    prismaService = module.get<PrismaService>(PrismaService);
    service = module.get<FriendsService>(FriendsService);

    await seedTestData();
  }, 50000);

  async function seedTestData() {
    await prismaService.$executeRaw`DELETE FROM Friend;`;
    await prismaService.$executeRaw`DELETE FROM Profile;`;
    await prismaService.$executeRaw`UPDATE sqlite_sequence SET seq = 0`;

    await prismaService.profile.createMany({
      data: createFakeProfiles(10),
    });

    await prismaService.friend.createMany({
      data: [
        { profileId1: 1, profileId2: 2 },
        { profileId1: 2, profileId2: 3 },
        { profileId1: 3, profileId2: 5 },
        { profileId1: 4, profileId2: 5 },
      ],
    });
  }

  it('should return the shorter connection between two profiles', async () => {
    const result = await service.getShorterConnection(1, 5);

    const path = [2, 3];

    expect(result).toEqual({
      path,
    });
  }, 50000);
});
