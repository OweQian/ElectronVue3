import { ModalBase } from './ModalBase';

export class ModelChat extends ModalBase {
  fromName?: string;
  sendTime?: string | number;
  isSelected = false;
  lastMsg?: string;
  avatar?: string;
  // 0 单聊，1 群聊，2 公众号，3 文件传输助手
  chatType?: number;
}
