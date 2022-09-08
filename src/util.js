const vscode = require('vscode');

function getConfiguration() {
    return vscode.workspace.getConfiguration('jecyu');
}

function getRemindCustomContentList() {
    return getConfiguration().get('remindCustomContentList', []);
}

function getRemindIntervalInMinutes() {
    return getConfiguration().get('remindIntervalInMinutes', 60);
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

module.exports = {
    getConfiguration,
    getRemindIntervalInMinutes,
    getContent,
};