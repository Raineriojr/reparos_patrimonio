const { app, BrowserWindow, nativeImage } = require('electron')
const path = require('path');
const express = require('./express');

//habilita o live reload do electron
require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
});

//cria uma janela desktop e adiciona o icone na barra de tarefas
function createWindow(){
    const icon = nativeImage.createFromPath(`${app.getAppPath()}/build/icon.png`);

    if(app.dock) {
        app.dock.setIcon(Icon);
    }

    const win = new BrowserWindow({
        icon,
        width: 800,
        height: 600,
        webPreferences:{
            nodeIntegration: true //habilita a integração NODE no frontend
        }
    });

    //win.loadURL("http://localhost:3333/") //carrega a janela com o conteudo do react
    win.loadFile("teste.html")
    win.focus();
}

//win.webContent.openDevTools(); usado em desenvolvimento para inspeção de codigo

//metodo chamado assim que finalizar a inicialização
app.whenReady().then(createWindow);

//encerra a aplicação quando fechada a janela.
app.on("window-all-closed", () =>{
    if(process.platform !== "darwin"){
        app.quit
    }
});

//Executado no mac quando clica em icone do app
//cria a janela se não tiver criada
app.on("activate", ()=> {
    if (BrowserWindow.getAllWindows().length === 0){
        createWindow()
    }
})  

