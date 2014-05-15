define([
	'text!templates/processModal/Process.html',
	'text!templates/processModal/ProcessAlert.html',
	'views/ModalAC',
	'models/RawToProfileInfo'
],function(processTemplate, processAlertTemplate,ModalAC, RawToProfileInfo) {
	var Modal = ModalAC.extend({
		TEMPLATE: _.template(processTemplate),
		TEMPLATEALERT: _.template(processAlertTemplate),
		TEMPLATE_VARS: {
			modalTitle: "Process raw file"
		},
		initialize: function(options) {
			this._super();
			this.expID = options.query.split(',')[0];
			this.fileName = options.query.split(',')[1];
			//this.fileID = options.query.split(',')[2];
		},
		events: {
			'submit form':'submitProcess',
			'click #step-box' : 'toggleStepsInput',
			'click [name=process-radios]' : 'radioClicked'
		},
		render: function() {
			this.$el.html(this.TEMPLATE());
			this.$el.find('#alert-container').html(this.TEMPLATEALERT({
				'fileName': this.fileName,
				'expID': this.expID
			}));
			//To add more files use append instead of html like below.
			/*this.$el.find('#alert-container').append(this.TEMPLATEALERT({
				'fileName': this.fileName,
				'expID': this.expID
			}));*/


			/*this.$el.find('#alert-file-name').text(this.fileName);
			this.$el.find('#alert-exp-name').text(this.expID);
			console.log(this.fileName, ' file: ', $('#alert-file-name').text());
			console.log(this.expID, ' exp: ', $('#alert-exp-name').text());*/
		},
		radioClicked: function(e) {
			switch(e.target.id) {
				case "sam":
				case "gff":
				case "sgr":

					$('#raw-process-container input').prop('disabled', false);
					$('#ratio-col input, #smooth-col input, #steps-col input, #ratio-col select').prop('disabled', true);
					break;
				case "smooth-radio":

					$('#raw-process-container input').prop('disabled', false);
					$('#ratio-col input, #steps-col input, #ratio-col select').prop('disabled', true);
					break;
				case "steps-radio":

					$('#raw-process-container input').prop('disabled', false);
					$('#ratio-col input, #ratio-col select').prop('disabled', true);
					break;
				case "ratio-radio":

					$('#raw-process-container input, #raw-process-container select').prop('disabled', false);
					break;
				default:
					console.log('undefined')
					break;
			}
		},
		submitProcess: function(e) {
			e.preventDefault();

			var level = $('[name=process-radios]:checked').val();
			var bowtieFlags = ($('#bowtie-params').val());
			var genomeReference = ($('#genome-reference').val());
			var gffFormat = (level == 2 ? "y": "");
			var sgrFormat = (level >= 3 ? "y": "");
			var smoothParams = (level >= 4 ? (($('#window-size').val()) 
				+ " " + ($('#smooth-type')).val()
				+ " " + ($('#step-pos')).val()
				+ ($('#print-mean').prop('checked') ? " 1": " 0") 
				+ ($('#print-zeros').prop('checked') ? " 1": " 0"))
				: "");
			var steps = (level >= 5 ? "y " + ($('#nr-of-steps').val()): "");
			var ratioCalculation = (level >= 6 ? ($('#ratio-select').val())
				+ " " + ($('#ratio-cut-off').val())
				+ " " + ($('#ratio-chromosomes').val())
				: "");
			var ratioSmoothing = (level >= 6 ? (($('#ratio-window-size').val()) 
				+ " " + ($('#ratio-smooth-type')).val()
				+ " " + ($('#ratio-step-pos')).val()
				+ ($('#ratio-print-mean').prop('checked') ? " 1": " 0") 
				+ ($('#ratio-print-zeros').prop('checked') ? " 1": " 0"))
				: "");

			var parameters = [	
				bowtieFlags,
				genomeReference,
				gffFormat,
				sgrFormat,
				smoothParams,
				steps,
				ratioCalculation,
				ratioSmoothing];

			var data = {
				//"filename": this.fileName,
				//"fileId": this.fileID,
				"expid": this.expID,
				"processtype": "rawtoprofile",
				"parameters": parameters,
				"metadata": parameters.join(", "),
				"genomeRelease": "hg38", //TODO FIX tempvalue
				"author": "Kalle" //TODO FIX tempvalue
			};
 
 			var rawToProfileInfo = new RawToProfileInfo(data);
 			var that = this;
 			rawToProfileInfo.save({}, {"type":"put", 
				success: function () {
					console.log("successfully sent process request");
					that.hide();
					app.messenger.success("WOOHOOO!! The processing has begun!");
				},
				error: function() {
					console.log("failed to send process request");
				}
			});
		},
		toggleStepsInput: function() {
			if ($('#step-box').prop('checked')) {
				$('#nr-of-steps').prop('disabled', false);
			} else {
				$('#nr-of-steps').val('');
				$('#nr-of-steps').prop('disabled', true);
			}

		}
	});
	return Modal;
});
