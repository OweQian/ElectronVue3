import path from 'path';
import fs from 'fs';

class BuildObj {
  // 编译主进程代码
  buildMain() {
    require('esbuild').buildSync({
      entryPoints: ['./src/main/mainEntry.ts'],
      bundle: true,
      platform: 'node',
      minify: true,
      outfile: './dist/mainEntry.js',
      external: ['electron'],
    });
  }
  // 为生产环境准备package.json
  preparePackageJson() {
    let pkgJsonPath = path.join(process.cwd(), 'package.json');
    let localPkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'));
    let electronConfig = localPkgJson.devDependencies.electron.replace('^', '');
    localPkgJson.main = 'mainEntry.js';
    delete localPkgJson['scripts'];
    delete localPkgJson['devDependencies'];
    localPkgJson.devDependencies = {
      electron: electronConfig,
    };
    let tarJsonPath = path.join(process.cwd(), 'dist', 'package.json');
    fs.writeFileSync(tarJsonPath, JSON.stringify(localPkgJson));
    fs.mkdirSync(path.join(process.cwd(), 'dist/node_modules'));
  }
  // 使用electron-builder制成安装包
  buildInstaller() {
    let options = {
      config: {
        directories: {
          output: path.join(process.cwd(), 'release'),
          app: path.join(process.cwd(), 'dist'),
        },
        files: ['**'],
        extends: null,
        productName: 'Electron',
        appId: 'com.xxx.desktop',
        asar: true,
        nsis: {
          oneClick: true,
          perMachine: true,
          allowToChangeInstallationDirectory: false,
          createDesktopShortcut: true,
          createStartMenuShortcut: true,
          shortcutName: 'ElectronDesktop',
        },
        publish: [{
          provider: 'generic',
          url: 'http://localhost:5500/',
        }],
      },
      project: process.cwd(),
    };
    return require('electron-builder').build(options);
  }
}
export let buildPlugin = () => {
  return {
    name: 'build-plugin',
    closeBundle: () => {
      let buildObj = new BuildObj();
      buildObj?.buildMain();
      buildObj?.preparePackageJson();
      buildObj?.buildInstaller();
    }
  }
}
