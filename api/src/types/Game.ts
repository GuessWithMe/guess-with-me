import { Player, PlayerOmitted } from '@types';

export type ActivePlayers = Record<SocketIO.Socket['id'], PlayerOmitted>;
