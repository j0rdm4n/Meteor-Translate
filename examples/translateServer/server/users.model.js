Meteor.publish('organisationUsers', function(orgId) {
	if (orgId) {
		// We have an orgId
		var userId = this.userId;
		if (userId) {
			// We have a user id, now make sure that the user is in the organisation and that the organisation exists
			var translationApplication = translationApplications.findOne({ $and: [{_id: orgId}, {$or: [{ owner: userId }, { member: userId } ]}] });
			if ( translationApplication && translationApplication._id == orgId ) {
				//We are ready to publish user data, we publish all users in translationApplication owner or member
				return Meteor.users.find({ $or: [ 
												{ _id: { $in: translationApplication.owner } },
												{ _id: { $in: translationApplication.member } },
												{ _id: { $in: translationApplication.pending } }
												] },
										  { fields: { _id:1, username: 1, 'emails.0.address': 1} });
			}
		}
	}
});