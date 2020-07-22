import { Room, SpotifyPlaylist } from '@types';

interface RoomJoinAction {
  type: 'JOIN_ROOM';
  payload: { slug: Room['slug'] };
}

interface RoomLeaveAction {
  type: 'LEAVE_ROOM';
  payload: { slug: Room['slug'] };
}

interface PlaylistImportAction {
  type: 'PLAYLIST_IMPORT';
  payload: { id: SpotifyPlaylist['id'] };
}

export type SocketData = RoomJoinAction | RoomLeaveAction | PlaylistImportAction;
