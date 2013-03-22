Meteor.publish('tasks', function(projectId, taskId) {
	if (taskId)
		return tasks.find({	$or: [ { _id: taskId }, { taskId: taskId } ] })
	else
		return tasks.find({ $and: [ { projectId: projectId }, { taskId: null} ]});
});
