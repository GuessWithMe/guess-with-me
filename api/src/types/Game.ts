import { Player } from '@types';

export type ActivePlayers = Record<SocketIO.Socket['id'], Player>;
