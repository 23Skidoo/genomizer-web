define([], function() {
	var Annotation = Backbone.Model.extend({
		defaults : {
			"name" : "Not specified",
			"values" : "Not specified",
			"forced" : "false"

		},
		initialize : function() {
		},
	});
	return Annotation;
});


