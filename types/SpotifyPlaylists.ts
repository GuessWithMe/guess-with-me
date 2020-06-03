import { SpotifyPlaylist } from './SpotifyPlaylist';

export interface SpotifyPlaylists {
  href: string;
  items: SpotifyPlaylist[];
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
