const vscode = require('vscode');

function getConfiguration() {
    return vscode.workspace.getConfiguration('coder');
}

function getRemindCustomContentList() {
    return getConfiguration().get('remindCustomContentList', []);
}

function getRemindIntervalInMinutes(type) {
    const config =  getConfiguration();
    switch(type) {
        case 'codeRule':
            return config.get('codeRuleRemindIntervalInMinutes', 60);
        case 'juejin':
            return config.get('juejinRemindIntervalInMinutes', 60);
    }
}

function getRemindEnableStatus(type) {
    const config =  getConfiguration();
    switch(type) {
        case 'juejin':
            return config.get('juejinRemind.enabled', true);
        case 'codeRule':
            return config.get('codeRuleRemind.enabled', true);
    }
}

function getJuejinCookie() {
    return getConfiguration().get('juejinCookie', '');
}

function getRandomOne(contentList) {
    const n = Math.floor(Math.random() * contentList.length + 1) - 1;
    return contentList[n];
}

function getContent() {
    const contentList = getRemindCustomContentList();
    const content = getRandomOne(contentList);
    return content;
}

const customAlphabet = (alphabet, len) => {
    let id = "";
    for (let i = 0; i < len; i++) {
      id += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return id;
  };
const randomID = () => customAlphabet("0123456789", 19);

const createNotification = (message, ...commands) => {
    vscode.window
        .showInformationMessage(message, ...commands.map(item => item.title))
        .then(selection => {
            const command = commands.find(item => item.title === selection);
            if (command) {
                vscode.commands.executeCommand(command.command, ...command.arguments || []);
            }
        }) 
}

module.exports = {
    getConfiguration,
    getRemindIntervalInMinutes,
    getRemindEnableStatus,
    getContent,
    getJuejinCookie,
    randomID,
    createNotification
};