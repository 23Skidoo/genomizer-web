define([],function() {
	var Auth = Backbone.Model.extend({
		defaults : {
			username: "Genome researcher 1",
			password: "superhemligt"
		},
		url: function() {
			return 'http://scratchy.cs.umu.se:8000/api/login';
		},
		initialize: function() {

		}
	});
	return Auth;
});

