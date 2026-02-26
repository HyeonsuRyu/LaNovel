export interface User {
  id: string;
  email: string;
  nickname: string;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: string;
}

export interface Novel {
  id: string;
  title: string;
  content: string;
  bgmUrl?: string;
  author: User;
  createdAt: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
}
