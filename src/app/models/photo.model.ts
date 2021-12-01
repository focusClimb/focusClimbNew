export interface Photo {
  tinySize: () => string;
  largeSize: () => string;
  photographer: () => string;
  photographerUrl: () => string;
}
