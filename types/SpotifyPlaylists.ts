import { Tracks } from './SpotifyPlaylist';

export interface SpotifyPlaylists {
  href: string;
  items: PlaylistItem[];
  limit: number;
  next: string;
  offset: number;
  previous?: any;
  total: number;
}

interface ExternalUrls {
  spotify: string;
}

interface Image {
  height?: number;
  url: string;
  width?: number;
}

interface ExternalUrls2 {
  spotify: string;
}

interface Owner {
  display_name: string;
  external_urls: ExternalUrls2;
  href: string;
  id: string;
  type: string;
  uri: string;
}

export interface PlaylistItem {
  collaborative: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Owner;
  primary_color?: any;
  public: boolean;
  snapshot_id: string;
  tracks: Tracks;
  type: string;
  uri: string;
}
