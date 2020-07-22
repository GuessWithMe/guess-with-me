import { Room, SpotifyPlaylist } from '@types';

interface RoomJoinAction {
  action: 'JOIN_ROOM';
  payload: { slug: Room['slug'] };
}

interface RoomLeaveAction {
  action: 'LEAVE_ROOM';
  payload: { slug: Room['slug'] };
}

interface PlaylistImportAction {
  action: 'PLAYLIST_IMPORT';
  payload: { id: SpotifyPlaylist['id'] };
}

export type SocketData = RoomJoinAction | RoomLeaveAction | PlaylistImportAction;
