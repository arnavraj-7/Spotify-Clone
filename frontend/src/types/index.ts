export type Song = {
  _id: string;
  title: string;
  imageUrl: string;
  audioUrl: string;
  artist: string;
  duration: number;
  albumId?: string;
  plays?: number;
  updatedAt?: Date;
  createdAt?: Date;
}

export type Album = {
  _id: string;
  title: string;
  imageUrl: string;
  artist: string;
  releaseYear: number;
  songs?: Song[];
  updatedAt?: Date;
  createdAt?: Date;
}

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  likeId?: string[] | Song[];
}