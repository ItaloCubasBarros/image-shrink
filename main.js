const { app, BrowserWindow, Menu, ipcMain, shell } = require ('electron') //App manages the entire life of our application.
const path = require ('path')
const os = require ('os')
const imagemin = require ('imagemin')
const imageminMozjpeg = require ('imagemin-mozjpeg')
const imageminPngquant = require ('imagemin-pngquant')
const slash = require ('slash')
const log = require('electron-log')

//SET ENV
process.env.NODE_ENV = 'production'

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
    options.dest = path.join(os.homedir(), 'imageshrink')
    shrinkImage(options)
})

async function shrinkImage({ imgPath, quality, dest }){
    try {
        const pngQuality = quality / 100

        const files = await imagemin([slash(imgPath)],{
            destination: dest,
            plugins: [
                imageminMozjpeg({ quality }),
                imageminPngquant({
                    quality: [pngQuality, pngQuality]
                })
            ]
        })

        
        log.info(files)

        shell.openPath(dest)

        mainWindow.webContents.send('image:done')
    } catch (err) {
        
        log.error(err)
    }
}

app.on('activate', () => {
  
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
  })


app.on('window-all-closed', () => {
  if (!isMac) app.quit()
})

app.allowRendererProcessReuse = true