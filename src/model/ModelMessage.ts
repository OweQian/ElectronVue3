import { ModalBase } from './ModalBase';

export class ModelMessage extends ModalBase {
  createTime?: number;
  receiveTime?: number;
  messageContent?: string;
  chatId?: string;
  fromName?: string;
  avatar?: string;
  // 是否为传入消息
  isInMsg?: boolean;
}
