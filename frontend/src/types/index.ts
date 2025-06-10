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
  clerkId?: string;
  firstName: string;
  lastName: string;
  activity?:string | object
  likeId?: string[] | Song[];
}

export type Message = {
  _id?: string;
  senderId: string;
  receiverId: string;
  content: string;
  delivered?: boolean;
  seen?:boolean;
  createdAt: Date;
  updatedAt?: Date;
};

export type userWithActivities = User & {activity:string}
export type userActivities = {
  [key: string]: string;
}