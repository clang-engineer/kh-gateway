import { RentalStatus } from 'app/shared/model/enumerations/rental-status.model';

export interface IRental {
  id?: number;
  userId?: number | null;
  rentalStatus?: RentalStatus | null;
}

export const defaultValue: Readonly<IRental> = {};
