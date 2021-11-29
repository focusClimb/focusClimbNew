export interface PexelsResponsePhotoSrc {
  landscape: string;
  large2x: string;
  large: string;
  medium: string;
  original: string;
  portrait: string;
  small: string;
  tiny: string;
}

export interface PexelsResponsePhoto {
  id: number;
  height: number;
  width: number;
  liked: boolean;
  photographer: string;
  photographer_id: number;
  photographer_url: string;
  url: string;
  avg_color: string;
  src: PexelsResponsePhotoSrc;
}

export interface PexelsResponse {
  page: number;
  per_page: number;
  next_page: string;
  photos: PexelsResponsePhoto[];
}
