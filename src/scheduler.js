const { getRemindIntervalInMinutes } = require('./util');
const Reminder = require('./reminder');
function Scheduler(context) {
    this.context = context;
}

Scheduler.prototype.start = function start() {
    setInterval(() => {
        Reminder.show();
    // }, 1000 * 2);
    }, 1000 * 60 * getRemindIntervalInMinutes());
}

module.exports = Scheduler;