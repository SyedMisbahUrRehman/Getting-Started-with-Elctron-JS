console.warn("Started");
const windowStateKeeper =require('electron-window-state')

const {app,BrowserWindow, webContents,globalShortcut,dialog,Tray,Menu}=require('electron'); //importing module (npm install --save electron-window-state)

// let template=[
//     {label:"Quit", submenu:[{role:"quit",label:"Exit"}]}  //customizable menu button for quitting
// ]
// let menu=Menu.buildFromTemplate(template
// )
// Menu.setApplicationMenu(menu)

let template=[
    {role:"minimize"}  //customizable contextmenu for minimizing
]
let contextmenu=Menu.buildFromTemplate(template)




let win;


function createWin(){

    let mainWindowState=windowStateKeeper({  //window state maintain krne k lie
        defaultWidth:500,
        defaultHeight:600
    })
   win=new BrowserWindow({
       'x': mainWindowState.x,
       'y': mainWindowState.y,
        width:mainWindowState.width,
        height: mainWindowState.height,
        // frame:false,
        backgroundColor:'#f5f5dc', //beige color f5f5dc
        // alwaysOnTop:1,
        // resizable:0,
        webPreferences:{
            nodeIntegration : true,
            contextIsolation:false  //require not found ka ilaaj, took me 2 days to solve it
        }
            
    })
//making a child window:

// let child=new BrowserWindow({parent:win})
// child.loadFile("index.html");
// child.show();

tray= new Tray('hehe.jpg') //shayd dimensions khrab hein 
tray.setToolTip("My electron App")
tray.on('click',()=>{
    win.isVisible()?win.hide():win.show() //functioning of tray
})

globalShortcut.register("shift+d",()=>{  //key as per your choice
    dialog.showOpenDialog({
        defaultPath:app.getPath("desktop") //dailogbox ka path
    })
})
globalShortcut.register("shift+C",()=>{
    win.loadFile("child.html")
})
win.loadFile("index.html");
mainWindowState.manage(win)

let wc=win.webContents;  //webcontents jese k index.html k lie
wc.on('before-input-event',()=>{ //event that tell us a key press
    console.log("Key pressed")
})
win.webContents.openDevTools();
win.webContents.on("context-menu",()=>{
    contextmenu.popup();
})

}
// app.whenReady().then(createWin)
app.on('ready',()=>{
    createWin()           //alternate for starting app
})
app.on('before-quit',()=>{
    console.log("app is closing") //msg just before the app quits
})

// app.on('before-quit',(e)=>{
//     e.preventDefault();  //bnd nh hone dega yeh event haha
// })

app.on('will-quit',(e)=>{
    e.preventDefault();  //preventdef ki bh na chli yahan
})

app.on('browser-window-focus',()=>{
    console.log("app focused") //msg will appear as soon as you jump on the app
})


