define(['models/Experiment'],function(Experiment) {
	var SearchResults = Backbone.Collection.extend({
		url: function() {
			return '/api/search?q=' + this.query;
		},
		model: Experiment,
		initialize:function (models,options) {
			this.query = options.query;
			if(this.query !== undefined) {
			    this.fetch();
			}
		}

	});
	return SearchResults;
});
