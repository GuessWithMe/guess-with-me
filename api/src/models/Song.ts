import { BelongsTo, BelongsToMany, Column, Model, Table, Default, DataType } from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';

import { AlbumModel, ArtistModel, PlaylistModel, SongArtist, SongPlaylist } from 'models';

@Table({ tableName: 'songs' })
export class SongModel extends Model<SongModel> {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: UUIDV4 })
  public id: string;

  @BelongsToMany(() => ArtistModel, () => SongArtist)
  public artists: ArtistModel[];

  @BelongsTo(() => AlbumModel, 'albumId')
  public album: AlbumModel;

  @BelongsToMany(() => PlaylistModel, () => SongPlaylist)
  public playlists: PlaylistModel[];

  @Column
  public name: string;

  @Column
  public popularity: string;

  @Column
  public previewUrl: string;

  @Column
  public spotifyId: string;

  @Column
  public spotifyUrl: string;

  @Default(new Date())
  @Column
  public createdAt: Date;

  @Default(new Date())
  @Column
  public updatedAt: Date;
}
