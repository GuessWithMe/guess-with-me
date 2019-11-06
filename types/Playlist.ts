export interface Playlist {
  eligibleSongsAtLastImport: number;
  id: number;
  lastImportAt: Date;
  songAmountDifference?: number;
  spotifyId: string;
  title: string;
  totalSongsAtLastImport: number;
}
