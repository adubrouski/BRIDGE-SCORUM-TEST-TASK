export interface ResponseCardEntity {
  code: string;
  image: string;
  images: {
    svg: string;
    png: string;
  };
  suit: string;
  value: string;
}

export interface CardEntity {
  isHidden: boolean;
  image: string | null;
  value: number;
}
