import { PexelsResponse } from '@models/pexels-response.model';
import { PhotoSource } from '@models/photo-source.model';
import { Photo } from '@models/photo.model';

const pexelsPhotoSource = {
  name: 'PEXELS',
  label: 'Pexels.com',
  url: 'https://api.pexels.com/v1/search',
  headers: {
    'Authorization': '563492ad6f917000010000010b883213d49b45daaa804a8854ad452c'
  },
  params: {
    query: 'nature',
    per_page: 100,
    page: 0
  },
  extractPhotos: (response) => {
    const photos: Photo[] = [];

    for (const photo of response.photos) {
      photos.push({
        tinySize: () => `${photo.src.original}?auto=compress&cs=tinysrgb&&fit=crop&h=54&w=96`,
        largeSize: () => `${photo.src.original}?fit=crop&h=1080&w=1920`,
        photographer: () => photo.photographer,
        photographerUrl: () => photo.photographer_url,
      });
    }

    return photos;
  }
} as PhotoSource<PexelsResponse>;

export {
  pexelsPhotoSource
};
