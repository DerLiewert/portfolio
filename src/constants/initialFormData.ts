import { INPUT_NAMES, type FormData } from '@/typescript';

export const initialFormData = Object.fromEntries(
  Object.values(INPUT_NAMES).map((key) => [key, '']),
) as FormData;
