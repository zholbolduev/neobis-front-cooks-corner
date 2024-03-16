export interface IFetch {
  loading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  success?: string;
  error: string;
}
