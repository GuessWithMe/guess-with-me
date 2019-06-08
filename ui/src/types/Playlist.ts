export interface Playlist {
  id: number;
  spotifyId: string;
  lastImportAt: Date;
  totalSongsAtLastImport: number;
  eligibleSongsAtLastImport: number;
  songAmountDifference?: number;
}
