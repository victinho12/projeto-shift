const {app, BrowserWindow, nativeTheme, Menu, shell } = require('electron');
const path =  require('path');
const {getMainWindow} = require('./mainWindor')

function crirarJanelaModal(telaPai, arquivoHtml){
    const janela = new BrowserWindow({
        width: 800,
        height: 600,
        modal : true,
        parent: telaPai, 
        icon: path.join(__dirname,  'public', 'img', 'img.goku.jpg'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')        }
    
    })

    janela.loadFile(arquivoHtml)
    return janela
}

function modalAbrirRoupa(event){
    console.log('vou abrir as roupas')
    let mainWindow = getMainWindow()
    if(mainWindow){
        crirarJanelaModal(mainWindow, './src/public/roupa/roupa.html')
    }else{
        console.warn('não foi possivel abrir')
    }
}

module.exports = {
    crirarJanelaModal,
    modalAbrirRoupa
}