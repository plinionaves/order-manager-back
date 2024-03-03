import { validate, version, v4 as uuidv4 } from 'uuid';

interface UUIDAdapter {
  create(): string;
  validate(value: string): boolean;
}

export const uuid: UUIDAdapter = {
  create() {
    return uuidv4();
  },

  validate(value: string): boolean {
    return validate(value) && version(value) === 4;
  },
};
