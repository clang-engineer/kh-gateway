import dayjs from 'dayjs';
import { IRental } from 'app/shared/model/rental/rental.model';

export interface IRentedItem {
  id?: number;
  bookId?: number | null;
  rentedDate?: string | null;
  dueDate?: string | null;
  rental?: IRental | null;
}

export const defaultValue: Readonly<IRentedItem> = {};
