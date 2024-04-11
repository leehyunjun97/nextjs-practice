import { IUser } from './uesr';

export interface IPost {
  id: number;
  title: string;
  content: string;
  image?: string;
  published: boolean;
  author: {
    email: string;
    name: string;
  };
  authorId: number;
}
