export interface Playlist {
  eligibleSongsAtLastImport: number;
  id: string;
  lastImportAt: Date;
  songAmountDifference?: number;
  spotifyId: string;
  title: string;
  totalSongsAtLastImport: number;
}
