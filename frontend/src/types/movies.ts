export interface Movie {
  _id: string;
  name: string;
  year: number;
  category: string;
  description: string;
  images: {
    cover: {
      data: string;
      type: string;
    };
    poster: {
      data: string;
      type: string;
    };
  };
  path?: string;
  artists?: string[];
  director?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
