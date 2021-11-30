export class UrlHelper {
  static convertToQueryString(query: { [key: string]: string | number | unknown }): string {
    return convertToQueryString(query)
  }
}

export function convertToQueryString(query: { [key: string]: string | number | unknown }): string {
  let result = '';

  for (const key of Object.keys(query)) {
    result += `&${key}=${JSON.stringify(query[key])}`;
  }

  return result;
}
