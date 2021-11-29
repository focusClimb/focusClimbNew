
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ComponentArguments {
  selector: string;
  template?: Promise<any> | any;
  style?: Promise<any> | any;
}
