import { protocol } from 'electron';
import path from 'path';
import fs from 'fs';

// 为自定义app协议提供特权
let schemeConfig = {
  standard: true,
  supportFetchAPI: true,
  bypassCSP: true,
  corsEnabled: true,
  stream: true,
};

protocol.registerSchemesAsPrivileged([{
  scheme: 'app',
  privileges: schemeConfig,
}]);

export class CustomScheme {
  // 根据文件扩展名获取mime-type
  private static getMimeType(extension: string) {
    let mineType = '';
    switch (extension) {
      case '.js':
        mineType = 'text/javascript';
      break;
      case '.html':
        mineType = 'text/html';
      break;
      case '.css':
        mineType = 'text/css';
      break;
      case '.svg':
        mineType = 'image/svg+xml';
      break;
      case '.json':
        mineType = 'application/json';
      break;
    }
    return mineType;
  };
  // 注册自定义app协议
  static registerScheme() {
    protocol.registerStreamProtocol('app', (request, callback) => {
      let pathName = new URL(request.url).pathname;
      let extension = path.extname(pathName).toLowerCase();
      if (extension === '') {
        pathName = 'index.html';
        extension = '.html';
      }
      let tarFile = path.join(__dirname, pathName);
      callback({
        statusCode: 200,
        headers: {
          'content-type': this.getMimeType(extension),
        },
        data: fs.createReadStream(tarFile),
      })
    });
  };
}
