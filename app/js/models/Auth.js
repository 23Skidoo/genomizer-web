define([],function() {
	var Auth = Backbone.Model.extend({
		defaults : {
			username: "epicon",
			password: "umea@2014"
		},
		url: function() {
			return  app.BASE_URL + 'login';
		},
		initialize: function() {
			var token = localStorage.getItem('authToken');
			if(token) {
				this.set('token',token);
				this._afterLogin();
			}
		},
		doLogin: function() {
			var that = this;
			this.save().success(function() {
				localStorage.setItem('authToken',that.get('token'));
				that._afterLogin();
			});
		},
		_afterLogin: function() {
			$.ajaxSetup({
				beforeSend: function (xhr)
				{
					xhr.setRequestHeader("Authorization",app.auth.get("token"));    
				}
			});
			this.trigger("loggedIn");
		},
		isLoggedIn: function() {
			return this.get('token') !== undefined
		}
	});
	return Auth;
});

