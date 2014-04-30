define([
	'views/upload/FileView',
	'text!templates/upload/Upload.html',
	'models/File',
	'collections/AnnotationTypes'
],

function(FileView,UploadTemplate,File,AnnotationTypes) {
	var Upload = Backbone.View.extend({
		TEMPLATE: _.template(UploadTemplate + '<section id="file_view"></section>'),
		initialize: function() {
			this.FileView = new FileView();
			this.render();
			this.File = new File();
			this.AnnotationTypes = app.annotationTypes;
		},
		render: function() {
			this.$el.html(this.TEMPLATE());
			this.FileView.$el = this.$el.find("#file_view");
			this.FileView.render();
		},
		events: {
			"change #inputFile": "display",
			"click #CreateExperiment": "createExperiment"
		},
		display: function() {
			var files = $("#inputFile")[0].files;
			var FileArray = [];
			for (var i = 0; i < files.length; i++) {
				
				//console.log(files[i].name);
				this.File.filename = files[i].name;
				this.File.size = (files[i].size);	
				//console.log(this.File.filename);
				FileArray.push(this.File);
			}
			for (var i = 0; i < files.length; i++) {
				console.log(FileArray[i].filename);
				console.log(FileArray[i].size);
			}
		},
		createExperiment: function() {
			$('#ExperimentButtons').hide();
			$('#input-container').show();
			//console.log("AnnotationTypes: ", AnnotationTypes);
			//_.each(this.Annotation,);
			this.AnnotationTypes.each(function(value,key) {
				value = _.pick(value,'attributes');
				var annot = _.values(value)[0];
				console.log("annot: ", annot);
				if (_.isArray(annot.value)) {
					console.log(annot.name + " is array");
					$("#input-container").append("<b>ARRAYYYYYY! :)</b><br/>");
				}

				console.log("Key: ", key);
			});
		}
		
	});
	return Upload;
});
