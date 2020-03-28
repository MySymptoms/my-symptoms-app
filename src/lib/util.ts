import {format} from 'date-fns';

export const formatDate = (date: Date) => format(date, 'yyyy-MM-dd');

export const isDefined = <T>(v: T | null | undefined): v is NonNullable<T> =>
  v != null;
