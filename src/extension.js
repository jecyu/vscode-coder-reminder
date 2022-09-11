const vscode = require('vscode');
const cron = require('node-cron');
const { 
	createNotification, 
	getRemindIntervalInMinutes,
	getRemindEnableStatus
} = require('./util');
const { getMessageCount } = require('./services/juejin');
const Reminder = require('./codeRule/reminder');

const messageType_Mapping = {
	'1': {
		title: '点赞',
		url: 'https://juejin.cn/notification/digg'
	},
	'2': {
		title: '关注',
		url: 'https://juejin.cn/notification/follow'
	},
	'3': {
		title: '评论',
		url: 'https://juejin.cn/notification'
	},
	'4': {
		title: '系统消息',
		url: 'https://juejin.cn/notification/system'
	},
	'5': {
		title: '无法识别',
		url: ''
	}
} 
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	const juejinMessageCronExpression = `*/${getRemindIntervalInMinutes('juejin')} * * * *`;
	const codeRuleCronExpression = `*/${getRemindIntervalInMinutes('codeRule')} * * * *`;

	const codeRuleTask = cron.schedule(codeRuleCronExpression, () => {
		Reminder.show();
	}, {
		scheduled: false
	});
	if (getRemindEnableStatus('codeRule')) {
		codeRuleTask.start();
	}
	
	const juejinMessageNotificationsTask = cron.schedule(juejinMessageCronExpression, 
		async () => {
			const res = await getMessageCount();
			if (res !== null) {
				const { count, total } = res;
				if (total > 0) {
					Object.entries(count).forEach(async ([messageType, num]) => {
						if (num > 0) {
							const messageInfo = messageType_Mapping[messageType];
							const commands = [{
								title: "前往动态",
								command: "vscode.open",
								arguments: [vscode.Uri.parse(messageInfo.url)]
							}];
							const message = `掘金消息提醒：新增 ${num} 条${messageInfo.title}`;
							createNotification(message, ...commands);
						}
					});
				}
			}
		}, 
		{
			scheduled: false
		}
	);
	if (getRemindEnableStatus('juejin')) {
		juejinMessageNotificationsTask.start();
	}
	
	const disposable = 
	vscode.commands.registerCommand('coder.showReminderView', function () {
		Reminder.show();
	});
	context.subscriptions.push(disposable);


	vscode.workspace.onDidChangeConfiguration(ds => {
		if (ds.affectsConfiguration("coder")) {
		  vscode.window
			.showInformationMessage("coder 提醒小助手的配置需要在 VS Code 重启之后生效", "立即重启")
			.then(selection => {
			  if (selection === "立即重启") {
				vscode.commands.executeCommand("workbench.action.reloadWindow")
			  }
			})
		}
	})
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
