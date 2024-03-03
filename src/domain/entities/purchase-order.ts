export interface PurchaseOrderProps {
  id: string;
  quantity: number;
  receiving: string;
}

export class PurchaseOrder {
  id: string;
  quantity: number;
  receiving: string;

  constructor(props: PurchaseOrderProps) {
    this.init(props);
    this.validate();
  }

  protected init(props: PurchaseOrderProps): void {
    this.id = props.id;
    this.quantity = props.quantity;
    this.receiving = props.receiving;
  }

  protected validate(): void {
    // in real world, I'd do stricter validations and
    // throw a domain error. PurchaseOrderValidationError for example

    if (!this.id) {
      throw new Error('ID must be provided.');
    }

    if (this.quantity < 0) {
      throw new Error('Quantity must be greater than or equal to 0.');
    }

    if (!this.receiving) {
      throw new Error('Receiving must be provided.');
    }
  }

  static compare(a: PurchaseOrder, b: PurchaseOrder): number {
    const dateA = new Date(a.receiving);
    const dateB = new Date(b.receiving);

    if (dateA.getTime() === dateB.getTime()) {
      return 0;
    }

    return dateA.getTime() < dateB.getTime() ? -1 : 1;
  }
}
