import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesController } from './profile.controller';
import { ProfilesService } from './profile.service';
import { PrismaService } from '../prisma.service';

describe('ProfilesController', () => {
  let controller: ProfilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfilesController],
      providers: [ProfilesService, PrismaService],
    }).compile();

    controller = module.get<ProfilesController>(ProfilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
