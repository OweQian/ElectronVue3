import crypto from 'crypto';

export class ModalBase {
  id: string;
  constructor() {
    this.id = crypto.randomUUID();
  }
}
