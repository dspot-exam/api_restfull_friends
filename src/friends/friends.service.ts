import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

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

  async getShorterConnection(
    profileId1: number,
    profileId2: number,
  ): Promise<{
    paths: number[];
    shorter: number;
  }> {
    const visited = new Set<number>();
    // Crear una cola para realizar un recorrido BFS
    const queue: { profileId: number; path: number[] }[] = [
      { profileId: profileId1, path: [profileId1] },
    ];

    while (queue.length > 0) {
      const { profileId, path } = queue.shift();
      visited.add(profileId);

      // Buscar todas las conexiones del perfil actual
      const connections = await this.prisma.friend.findMany({
        where: {
          OR: [{ profileId1: profileId }, { profileId2: profileId }],
        },
      });

      for (const connection of connections) {
        // Determinar el perfil vecino
        const neighborId =
          connection.profileId1 === profileId
            ? connection.profileId2
            : connection.profileId1;

        // Verificar si el vecino es el perfil de destino
        if (neighborId === profileId2) {
          return {
            paths: [...path, neighborId],
            shorter: Math.min(...[...path, neighborId]),
          };
        }

        // Si el vecino no ha sido visitado, agregarlo a la cola
        if (!visited.has(neighborId)) {
          queue.push({ profileId: neighborId, path: [...path, neighborId] });
        }
      }
    }
    return {
      paths: [],
      shorter: -1,
    };
  }
}
