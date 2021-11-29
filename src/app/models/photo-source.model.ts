export interface PhotoSource {
  name: string;
  label: string;
  url: string;
  headers: { [key: string]: string };
  params: { [key: string]: string | number | unknown };
}
