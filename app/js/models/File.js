define([],function() {
	var File = Backbone.Model.extend({
		initialize: function() {
			this.progress = 0;
		},
		uploadFile: function() {
			// TODO: Take url from model instead..
			var formData = new FormData();
			var that = this;
			formData.append('uploadfile',this.fileObj);
			formData.append('path','/var/www/html/data/humanarm.fastq');
			$.ajax({
				url: "http://scratchy.cs.umu.se:8090/upload.php",
				type: "POST",
				data: formData,
				username: "pvt",
				password: "pvt",
				processData: false,
				contentType: false,
		/*		beforeSend: function(jqXHR) {
					debugger;
					jqXHR.upload.addEventListener("progress",_.bind(that.setUploadProgress,that), false);
				}
				xhr: function()
				{
					//Upload progress
					var xhr = $.ajaxSettings.xhr();
					xhr.upload.addEventListener("progress",_.bind(that.setUploadProgress,that), false);
					return xhr;
				} 
*/
			}).done(_.bind(this.setUploadDone,this));
		},
		setUploadProgress:function(evt) {
			if (evt.lengthComputable) {
				this.progress = evt.loaded / evt.total;
				this.trigger("uploadProgress",this.progress);
			}
		},
		setUploadDone: function() {
			this.uploadDone = true;
			this.progress = 1;
			this.trigger("uploadProgress");
		},
		fetchAndUpload: function() {
			var that = this;
			debugger;
			this.fetch().success(function() {
				// Url should now be available
				this.uploadFile();
			});
		}
	});
	return File;
});
