define(['text!templates/sysadmin/NewAnnotationTemplate.html', 'models/sysadmin/Annotation', 'models/sysadmin/Gateway'], function(newAnnotationTemplate, Annotation, Gateway) {
	var NewAnnotationView = Backbone.View.extend({
		render : function() {
			var template = _.template(newAnnotationTemplate);
			$('.activePage').html(template);
		},

		initialize : function() {
			this.render();
		},

		events : {
			"click #submit" : "submit",
			"change #annotation_type" : "checkAnnotationType"
		},
		
		submit : function() {
			if ($('#annotation_name').val() === "") {
					alert("Some required fields are empty");
				return;
			}
			
			annotation = new Annotation();
			annotation.set({
				"name" : $('#annotation_name').val()
			});

			switch($('#annotation_forced').val()) {
				case "one":
					annotation.set({
						"forced" : "true"
					});
					break;
				case "two":
					annotation.set({
						"forced" : "false"
					});
					break;
			}

			switch($('#annotation_type').val()) {
				case "one":
					annotation.set({
						"type" : ["yes", "no"], 
						"default" : "yes"	
					});
					break;
				case "two":
					var temp = $('#itemlist_input').val();
					temp = temp.split(",");
					annotation.set({
						"type" : temp, 
						"default" : temp[0]
					});
					break;
				default:
					annotation.set({
						"type" : ["freetext"],
						"default" : ""
					});
					break;
			}
			this.postNewAnnotation(annotation);
			alert("Submitted annotation");
		},
		
		checkAnnotationType : function(e) {
			switch(e.currentTarget.value) {
				case "two":
					console.log("switch");
					$('#itemlist_input').removeAttr('disabled');
					break;
				default:
					console.log("switch2");
					$('#itemlist_input').attr('disabled', 'true');
					break;
			}
		},
		
		postNewAnnotation : function(annotation) {
			var payload = annotation.toJSON();
			delete payload.id;
			delete payload.values;

			var result = Gateway.postAnnotation(payload);

			this.clearForm();
		},
		
		clearForm : function() {
			$('#annotation_name').val("");
			$('#itemlist_input').val("");
		}
	});
	return NewAnnotationView;
});

