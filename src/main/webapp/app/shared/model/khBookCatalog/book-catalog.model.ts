export interface IBookCatalog {
  id?: number;
  title?: string;
  description?: string | null;
  author?: string;
  bookId?: number;
  rentCnt?: number | null;
}

export const defaultValue: Readonly<IBookCatalog> = {};
