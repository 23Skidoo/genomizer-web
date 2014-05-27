/**
 * A class that handles communication with the server. All methods are static.
 */
define([], function() {
	var Gateway = Backbone.Model.extend({
	}, {
		url : app.BASE_URL,
		// app.BASE_URL
		//http://genomizer.apiary-mock.com
		//http://scratchy.cs.umu.se:7000

		getURL : function() {
			return this.url;
		},

		/**
		 * Sends a packet to the server using the base url and parameters
		 * @param {Object} type - the type of HTTP request, example POST
		 * @param {Object} urlExtension - the extension of the base url
		 * @param {Object} payload - the body of the HTTP request
		 * @param {Object} shouldGoBack - boolean value, true if a back
		 * 				   should be triggered after success
		 */
		sendPacket : function(type, urlExtension, payload, shouldGoBack) {
			$.ajax({
				type : type,
				ContentType : "application/json",
				url : this.url + urlExtension,
				dataType : 'json',
				Authorization : app.auth.get("token"),
				data : JSON.stringify(payload),
				success : function(data) {
					if (shouldGoBack) {
						history.back();
					}
				},
				complete : function(xhr) {

				},
			});

		},

		/**
		 *
		 * @param {Object} genomeReleaseFiles
		 */
		postGenomeRelease : function(genomeReleaseFiles) {
			that = this;

			$.ajax({
				type : "POST",
				ContentType : "application/json",
				url : this.url + "genomeRelease",
				dataType : 'json',
				Authorization : app.auth.get("token"),
				data : JSON.stringify(genomeReleaseFiles.getPayload()),
				success : function(data) {
				},
				complete : function(data) {
					genomeReleaseFiles.uploadGenomeReleaseFiles(eval(data.responseText));
				},
			});

		},

		postAnnotation : function(payload) {
			this.sendPacket("POST", "annotation/field", payload, false);
		},

		deleteAnnotation : function(payload, name, shouldGoBack) {
			this.sendPacket("DELETE", "annotation/field/" + encodeURIComponent(name), payload, shouldGoBack);
		},

		updateAnnotationValues : function(deletePayload, addPayload, originalName) {
			if (deletePayload != -1) {
				this.deleteAnnotationValues(deletePayload, originalName);
			}
			if (addPayload != -1) {
				this.addAnnotationValues(addPayload, originalName);
			}
		},

		deleteAnnotationValues : function(payload, name) {
			var that = this;
			payload.forEach(function(value) {
				that.sendPacket("DELETE", "annotation/value/" + encodeURIComponent(name) + "/" + encodeURIComponent(value), {}, false);
			});
		},

		addAnnotationValues : function(payload, name) {
			var that = this;
			var model = new Backbone.Model();
			payload.forEach(function(value) {
				model.set({
					"name" : name,
					"value" : value
				});
				that.sendPacket("POST", "annotation/value", model, false);
			});
		},

		renameAnnotation : function(payload) {
			this.sendPacket("PUT", "annotation/field", payload, false);
		},

		deleteGenomeReleaseFile : function(specie, genomeVersion) {
			this.sendPacket("DELETE", "genomeRelease/" + encodeURIComponent(specie) + "/" + encodeURIComponent(genomeVersion), {}, false);
		}
	});
	return Gateway;
});
