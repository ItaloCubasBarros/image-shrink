const { app, BrowserWindow, Menu, ipcMain } = require ('electron') //App manages the entire life of our application.


//SET ENV
process.env.NODE_ENV = 'development'

const isDev = process.env.NODE_ENV !== 'production' ? true : false
const isMac = process.platform === 'darwin' ? true : false


let mainWindow
let aboutWindow

function createMainWindow () {
    mainWindow = new BrowserWindow({
        title: 'ImageShrink',
        icon: `${__dirname}/assets/icons/Icon_256x256.png`,
        width: isDev ? 800:500,
        height: 600,
        resizable: isDev,
        backgroundColor: 'white',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        
    })

    if(isDev){
        mainWindow.webContents.openDevTools()
    }

    mainWindow.loadFile('./app/index.html')
}

function createAboutWindow () {
    aboutWindow = new BrowserWindow({
        title: 'AboutShrink',
        icon: `${__dirname}/assets/icons/Icon_256x256.png`,
        width: 300,
        height: 300,
        resizable: false,
        backgroundColor: 'white',
    })

    aboutWindow.loadFile('./app/about.html')
}


app.on('ready', () =>{
    createMainWindow()

    const mainMenu = Menu.buildFromTemplate(menu)
    Menu.setApplicationMenu(mainMenu)
    
    mainWindow.on('closed', () => mainWindow = null)
})

const menu = [
    ...(isMac ? [{ 
        label: app.name,
        submenu: [
        {
            label: 'About',
            click: createAboutWindow,
        }
    ]
     }] : []),
    {
        role: 'fileMenu',
    },
    ...(!isMac ?[
        {
                label: 'Help',
                submenu: 
            [
                {
                    label: 'About',
                    click: createAboutWindow,
                }
            ]
        }
    ] : []),

    ...(isDev ? [
        {  
            label: 'Developer',
            submenu: [
                { role: 'reload' },
                { role: 'forcereload' },
                { type: 'separator' },
                { role: 'toggledevtools' }
            ]
        }
    ] : [])
]

//RECEBENDO IPC DO SCRIPT

ipcMain.on('image:minimize', (e, options) => {
    console.log(options)
})

app.on('activate', () => {
  
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
  })


app.on('window-all-closed', () => {
  if (!isMac) app.quit()
})

app.allowRendererProcessReuse = true