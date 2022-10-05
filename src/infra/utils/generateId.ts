import { v4 as uuidv4 } from 'uuid';

export const generateId = (): string => uuidv4();
export const generateEmail = (): string => "test"+ uuidv4() + "@gmail.com";