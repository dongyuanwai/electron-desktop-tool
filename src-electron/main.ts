import {
    app,
    BrowserWindow,
    desktopCapturer,
    ipcMain,
    Menu,
    webContents,
  } from "electron";
  // import path from "path";
  const path = require("path");
  
  // 忽略Electron的警告
  process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
  app.commandLine.appendSwitch("disable-web-security");
  app.commandLine.appendSwitch("disable-features", "OutOfBlinkCors"); // 允许跨域
  app.commandLine.appendSwitch("--ignore-certificate-errors", "true"); // 忽略证书相关错误
  
  let win: null | BrowserWindow = null;
  
  const createWindow = async () => {
    // Menu.setApplicationMenu(null);
    win = new BrowserWindow({
      title: "董员外",
      width: 1000,
      height: 800,
      icon: path.join(__dirname, '../public/logo.ico'),
      webPreferences: {
        webSecurity: false,
        nodeIntegration: true,
        contextIsolation: true,
        webviewTag: true,
        preload: path.join(__dirname, "preload.js"),
      },
    });
    if (process.env.VITE_DEV_SERVER_URL) {
      win.loadURL(process.env.VITE_DEV_SERVER_URL);
      win.webContents.openDevTools();
    } else {
      win.loadFile(path.join(__dirname, "../dist/index.html"));
    }
  };
  
  app.whenReady().then(createWindow);
  app.on("window-all-closed", () => {
    app.exit();
  });
  
  // 修复electron18.0.0-beta.5 之后版本的BUG: 无法获取当前程序页面视频流
  const selfWindws = async () =>
    await Promise.all(
      webContents
        .getAllWebContents()
        .filter((item) => {
          const win = BrowserWindow.fromWebContents(item);
          return win && win.isVisible();
        })
        .map(async (item) => {
          const win = BrowserWindow.fromWebContents(item);
          const thumbnail = await win?.capturePage();
          // 当程序窗口打开DevTool的时候  也会计入
          return {
            name:
              win?.getTitle() + (item.devToolsWebContents === null ? "" : "-dev"), // 给dev窗口加上后缀
            id: win?.getMediaSourceId(),
            thumbnail,
            display_id: "",
            appIcon: null,
          };
        })
    );
  
  // 获取设备窗口信息
  ipcMain.handle(
    'ev:send-desktop-capturer_source',
    async (_event, _args) => {
      return [
        ...(await desktopCapturer.getSources({ types: ["window", "screen"] })),
        ...(await selfWindws()),
      ];
    }
  );
  
  
  
  ipcMain.on('consolelog', () => {
    console.log("打印 this is 111111")
  })
  ipcMain.on('consolelog_2', (event, data) => {
    console.log("打印 this is ",data)
  })
  ipcMain.on('consolelog_3', (event, data) => {
    console.log("打印 this is ",data)
  })
  
  
  
  