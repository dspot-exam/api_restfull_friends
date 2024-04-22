import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ProfilesModule } from '../src/profile/profile.module';
import { testDbConfig } from './test-db.config';
import { PrismaService } from '../src/prisma.service';
import {
  createFakeConnections,
  createFakeProfiles,
  generateProfileData,
} from '../src/helpers/seed';

describe('ProfileController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ProfilesModule],
      providers: [PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(new PrismaService(testDbConfig))
      .compile();

    prismaService = moduleFixture.get<PrismaService>(PrismaService);
    await resetAndSeedDatabase(50);

    app = moduleFixture.createNestApplication();
    await app.init();
  }, 50000);

  async function resetAndSeedDatabase(total: number) {
    //Resetting the database
    await prismaService.friend.deleteMany();
    await prismaService.profile.deleteMany();
    await prismaService.$executeRaw`UPDATE sqlite_sequence SET seq = 0`;

    //Provisioning the database
    await prismaService.profile.createMany({
      data: createFakeProfiles(total),
    });

    const profiles = await prismaService.profile.findMany({
      where: { available: true },
      select: { id: true },
    });

    await prismaService.friend.createMany({
      data: createFakeConnections(profiles, total),
    });
  }

  it('/profiles (GET)', () => {
    return request(app.getHttpServer())
      .get('/profiles')
      .query({ page: '1', limit: '15' })
      .expect(200)
      .expect((data) => {
        expect(data.body.data).toBeInstanceOf(Array);
        expect(data.body.data.length).toEqual(15);
        expect(data.body.meta).toBeInstanceOf(Object);
      });
  });

  it('/profiles/:id (GET)', async () => {
    const profile = await prismaService.profile.findFirst({
      where: { available: true },
    });

    return request(app.getHttpServer())
      .get(`/profiles/${profile.id}`)
      .expect(200)
      .expect((data) => {
        expect(data.body).toBeInstanceOf(Object);
        expect(data.body.id).toEqual(profile.id);
      });
  });

  it('/profiles/:id (GET) - Not Found', () => {
    return request(app.getHttpServer())
      .get('/profiles/1000')
      .expect(404)
      .expect((data) => {
        expect(data.body.message).toEqual('Profile with id 1000 not found');
      });
  });

  it('/profiles (POST)', () => {
    const profileData = generateProfileData();
    return request(app.getHttpServer())
      .post('/profiles')
      .send(profileData)
      .expect(201)
      .expect((data) => {
        expect(data.body).toBeInstanceOf(Object);
        expect(data.body.id).toBeGreaterThan(0);
      });
  });

  it('/profiles/:id (PATCH)', async () => {
    const profile = await prismaService.profile.findFirst({
      where: { available: true },
    });
    const profileData = generateProfileData();

    return request(app.getHttpServer())
      .patch(`/profiles/${profile.id}`)
      .send(profileData)
      .expect(200)
      .expect((data) => {
        expect(data.body).toBeInstanceOf(Object);
        expect(data.body.first_name).toEqual(profileData.first_name);
      });
  });

  it('/profiles/:id (DELETE)', async () => {
    const profile = await prismaService.profile.findFirst({
      where: { available: true },
    });
    return request(app.getHttpServer())
      .delete(`/profiles/${profile.id}`)
      .expect(200);
  });
});
