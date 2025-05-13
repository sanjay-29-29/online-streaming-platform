export interface MovieType {
  _id: string;
  name: string;
  description: string;
  age_rating: number;
  year: number;
  image: {
    cover: {
      data: string;
      type: string;
    };
    poster: {
      data: string;
      type: string;
    };
  };
  category: string[];
  cast: string[];
  director: string[];
  subtitles: string[];
  audio: string[];
}
