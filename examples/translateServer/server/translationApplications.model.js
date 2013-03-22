Meteor.publish('translationApplicationOwner', function() {
	//Show all for owners
	return translationApplications.find({ owner: this.userId });
});

Meteor.publish('translationApplicationMember', function() {
	//Show details for members
	return translationApplications.find({ member: this.userId });
});

Meteor.publish('translationApplicationSearch', function(search) {
	//Public search data is name and owner
    return translationApplications.find({
  		$and: [ 
            { $or: [{ name: { $regex: search, $options: 'i' }}, {vatNr: { $regex: search, $options: 'i' } }] },
            { $or: [{ lostOwner: null}, { lostOwner: this.userId }] }
        ]    
	}, { fields: { name: 1, owner:1 } });
});