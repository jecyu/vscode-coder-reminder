const vscode = require('vscode');
const { getContent } = require('./util');
const ReminderView = require('./reminderView');
const reminderView = new ReminderView();
function Reminder() {}

Reminder.show = function show() {
    const content = getContent();
    const { title } = content;
    vscode.window.showInformationMessage(title, '查看详情').
    then(val => {
        if (val === '查看详情') {
            reminderView.show(content);
        }
    });
}

module.exports = Reminder;
