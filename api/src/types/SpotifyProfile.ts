interface ExternalUrls {
  spotify: string;
}

interface Followers {
  href?: string;
  total: number;
}

interface Json {
  display_name: string;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: Array<{
    height?: number;
    url: string;
    width?: number;
  }>;
  type: string;
  uri: string;
}

export interface SpotifyProfile {
  provider: string;
  id: string;
  username: string;
  displayName: string;
  profileUrl: string;
  photos: string[];
  followers: number;
  _raw: string;
  _json: Json;
}
