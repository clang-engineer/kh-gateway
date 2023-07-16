export interface IBook {
  id?: number;
  title?: string;
  description?: string | null;
  author?: string;
}

export const defaultValue: Readonly<IBook> = {};
