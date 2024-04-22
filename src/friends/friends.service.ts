import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class FriendsService {
  constructor(private prisma: PrismaService) {}

  async getFriends(id: number) {
    const friends = await this.prisma.friend.findMany({
      where: {
        OR: [{ profileId1: id }, { profileId2: id }],
      },
    });

    return {
      friends: friends.map((friend) =>
        friend.profileId1 === id ? friend.profileId2 : friend.profileId1,
      ),
    };
  }

  // BFS traversal algorithm
  async getShorterConnection(
    profileId1: number,
    profileId2: number,
  ): Promise<{
    path: number[];
  }> {
    const visited = new Set<number>();
    const queue: { profileId: number; path: number[] }[] = [
      { profileId: profileId1, path: [profileId1] },
    ];

    while (queue.length > 0) {
      const { profileId, path } = queue.shift();
      visited.add(profileId);

      const connections = await this.prisma.friend.findMany({
        where: {
          OR: [{ profileId1: profileId }, { profileId2: profileId }],
        },
      });

      for (const connection of connections) {
        // Check neighbor profile
        const neighborId =
          connection.profileId1 === profileId
            ? connection.profileId2
            : connection.profileId1;

        // Check if the neighbor is the target profile
        if (neighborId === profileId2) {
          return {
            path: [...path, neighborId].filter(
              (id) => id !== profileId1 && id !== profileId2,
            ),
          };
        }

        // If the neighbor has not been visited, add it to the queue
        if (!visited.has(neighborId)) {
          queue.push({ profileId: neighborId, path: [...path, neighborId] });
        }
      }
    }
    return {
      path: [],
    };
  }
}
