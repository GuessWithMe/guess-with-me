// import { Track } from './SpotifySong';

export interface SpotifyPlaylist {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: {
    url: string;
  };
  name: string;
  owner: Owner;
  public: boolean;
  snapshot_id: string;
  tracks: Tracks;
  type: string;
  uri: string;
}

interface ExternalUrls {
  spotify: string;
}

interface Followers {
  href?: string;
  total: number;
}

interface Owner {
  display_name: string;
  external_urls: string[];
  href: string;
  id: string;
  type: string;
  uri: string;
}

interface Tracks {
  href: string;
  items: Array<{
    added_at: string;
    added_by: string;
    is_local: string;
    track: any;
  }>;
  limit: number;
  next?: string;
  offset: number;
  previous?: string;
  total: number;
}
