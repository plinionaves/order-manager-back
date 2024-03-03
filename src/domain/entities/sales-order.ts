export interface SalesOrderProps {
  id: string;
  quantity: number;
  created: string;
}

export class SalesOrder {
  id: string;
  quantity: number;
  created: string;

  constructor(props: SalesOrderProps) {
    this.init(props);
    this.validate();
  }

  protected init(props: SalesOrderProps): void {
    this.id = props.id;
    this.quantity = props.quantity;
    this.created = props.created;
  }

  protected validate(): void {
    // in real world, I'd do stricter validations and
    // throw a domain error. SalesOrderValidationError for example

    if (!this.id) {
      throw new Error('ID must be provided.');
    }

    if (this.quantity < 0) {
      throw new Error('Quantity must be greater than or equal to 0.');
    }

    if (!this.created) {
      throw new Error('Created must be provided.');
    }
  }

  static compare(a: SalesOrder, b: SalesOrder): number {
    const dateA = new Date(a.created);
    const dateB = new Date(b.created);

    if (dateA.getTime() === dateB.getTime()) {
      return 0;
    }

    return dateA.getTime() < dateB.getTime() ? -1 : 1;
  }
}
