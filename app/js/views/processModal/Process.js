define([
	'text!templates/processModal/Process.html',
	'views/ModalAC'
],function(processTemplate,ModalAC) {
	var Modal = ModalAC.extend({
		TEMPLATE: _.template(processTemplate),
		TEMPLATE_VARS: {
			modalTitle: "Process raw file"
		},
		events: {
			'submit form':'submitProcess'
		},
		render: function() {
			this.$el.html(this.TEMPLATE());	
		},
		submitProcess: function(e) {
			e.preventDefault();
			alert("Not yet implemented!");
		}
	});
	return Modal;
});
