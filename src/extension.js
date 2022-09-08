const vscode = require('vscode');
const Scheduler = require('./scheduler');
const Reminder = require('./reminder');
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	const scheduler = new Scheduler(context);
	scheduler.start();
	const disposable = 
	vscode.commands.registerCommand('jecyu.showReminderView', function () {
		Reminder.show();
	});
	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
