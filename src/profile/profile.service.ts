import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PaginationDto, UpdateProfileDto, CreateProfileDto } from './dto';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}

  create(createFriendDto: CreateProfileDto) {
    return this.prisma.profile.create({
      data: createFriendDto,
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const page = paginationDto.page || 1;
    const limit = paginationDto.limit || 10;

    const total = await this.prisma.profile.count();
    const lastPage = Math.ceil(total / limit);

    return {
      data: await this.prisma.profile.findMany({
        skip: Number((page - 1) * limit),
        take: +limit,
        where: { available: true },
      }),
      meta: {
        page,
        total,
        lastPage,
      },
    };
  }

  async findOne(id: number) {
    const friend = await this.prisma.profile.findUnique({
      where: { id, available: true },
    });

    if (!friend) throw new NotFoundException(`Profile with id ${id} not found`);
    return friend;
  }

  async update(updateProfile: UpdateProfileDto, id: number) {
    await this.findOne(id);
    return this.prisma.profile.update({
      where: { id },
      data: updateProfile,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.prisma.profile.update({
      where: { id },
      data: { available: false },
    });
  }
}
