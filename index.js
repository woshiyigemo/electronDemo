const { app, BrowserWindow,Tray,Menu,ipcMain  } = require('electron')
let fs = require("fs")
ipcMain.on = ipcMain.handle

const path = require('path') 

const iconPath = path.join(__dirname,'./src/assets/icon/tray-icon.png') 

//在 Electron 中，只有在 app 模块的 ready 事件被激发后才能创建浏览器窗口
app.on('ready', () => {

  //创建一个窗口
  // const createWindow = () => {
    const mwin = new BrowserWindow({
      // frame: false
      // webPreferences: {
      //     nodeIntegration: true, // 是否集成 Nodejs,把之前预加载的js去了，发现也可以运行
      //     contextIsolation: false,
      // }
      webPreferences: {
        // devTools:true,
        preload: path.join(__dirname, './src/js/preload.js'), 
      }
    })
    ipcMain.on('versions.ping',() => {
      console.log('pong')
    })
    ipcMain.on('open', () => {
      const filePath = path.join(__dirname, './src/assets/file/new.txt')
      return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
          if (err){
            reject(err)
            return console.error(err);
          } 
          console.log(data.toString());
          resolve(data.toString())
      });
      })

    })

    // fs.readFile('local_file.txt', (err, data) => {
      //         if (err) return console.error(err);
      //         console.log(data.toString());
      //         let myNode = document.createTextNode(data.toString());
      //         document.body.insertBefore(myNode, document.body.firstChild);
      //     });
  // }
  // app.whenReady().then(createWindow)
//   mwin.removeMenu()



/**
 * 自定义菜单
 */
  const menuTemplate = [
    {
      label: '菜单一',
      // submenu 代表下一级菜单
      submenu: [
        {
          label: '子菜单一',
          // 添加点击事件
          click: () => {
            // 创建一个新的窗口
            let sonWin = new BrowserWindow({
              width: 200,
              height: 200,
            })
            sonWin.loadFile('./src/secound.html')
            // 为关闭的时候进行清空
            sonWin.on('close', () => {
              sonWin = null
            })
          },
        },
        { label: '子菜单二' },
        { label: '子菜单三' },
        { label: '子菜单四' },
      ],
    },
    {
      label: '菜单二',
      // submenu 代表下一级菜单
      submenu: [
        { label: '子菜单一' },
        { label: '子菜单二' },
        { label: '子菜单三' },
        { label: '子菜单四' },
      ],
    },
  ]
  
  const myMenu = Menu.buildFromTemplate(menuTemplate) 
  Menu.setApplicationMenu(myMenu)

  //窗口加载html文件
  mwin.loadFile('./src/index.html')
  // mwin.webContents.openDevTools({mode:'right'})
  console.log("加载index.html页面成功")

  // 托盘

  let tray = new Tray(iconPath)
  tray.setToolTip('我是托盘')       //鼠标移到托盘中应用程序的图标上时，显示的文本

  tray.on('click', () => {       //点击图标的响应事件，这里是切换主窗口的显示和隐藏
    if(mwin.isVisible()){
        mwin.hide()
    }else{
        mwin.show()
    }
  })

  app.on('window-all-closed',() => {
    console.log('所有窗口被关闭')
    tray = null
  })

  app.on('activate',() => {
    console.log('应用被激活')
  })

})