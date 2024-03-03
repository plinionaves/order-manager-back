import { uuid } from '../adapters';

export interface OrderProps {
  id: string;
  quantity: number;
}

export abstract class Order {
  id: string;
  quantity: number;

  constructor(props: OrderProps) {
    this.init(props);
    this.validate();
  }

  protected init(props: OrderProps): void {
    this.id = props.id ?? uuid.create();
    this.quantity = props.quantity ?? 0;
  }

  protected validate(): void {
    if (!uuid.validate(this.id)) {
      throw new Error('ID must be a valid UUID.');
    }

    if (this.quantity < 0) {
      throw new Error('Quantity must be greater than or equal to 0.');
    }
  }
}
