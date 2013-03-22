Session.setDefault('currentTaskId', '');

Deps.autorun(function() {
	Meteor.subscribe('tasks', Session.get('currentProjectId'), Session.get('currentTaskId'));
});

var weeks = [];
var traceObject = { manHours: 0, materials: 0, suppliers: 0, machines: 0 };

for (var i = 0; i < 52; i++) {
	weeks[i] = {
		number: (i+1), 
		budget: _.clone(traceObject),
		spent: _.clone(traceObject)
	};
}

function createTask(name, projectId, taskId) { /* taskId of parrent */
	return tasks.insert({ name: name, taskId: taskId, projectId: projectId, weeks: _.clone(weeks), owner: [ Meteor.userId() ]});
}

function setCurrentTask(taskId) {
	var oldId = Session.get('currentTaskId');

	if (! oldId && ! taskId) {
		Session.set('currentBoardId', '');
		Session.set('currentProjectId', '');
		Session.set('view', 'boards');
		return;
	}

	if (!taskId) {
		var currentTask = tasks.findOne({ _id: oldId });
		Session.set('currentTaskId', (currentTask && currentTask.taskId)?currentTask.taskId:null );
	} else
		Session.set('currentTaskId', taskId);
	Session.set('view', 'tasks');
	//Session.set('currentRole', (projectId)?role:'');
}