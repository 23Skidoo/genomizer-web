define(['text!templates/sysadmin/GenomeReleaseTemplate.html', 'collections/sysadmin/GenomeReleaseFiles', 'models/sysadmin/GenomeReleaseFile', 'views/sysadmin/UploadGenomeReleaseModal'], function(GenomeReleaseTemplate, GenomeReleaseFiles, GenomeReleaseFile, UploadGenomeReleaseModal) {
	var GenomeReleaseView = Backbone.View.extend({
		initialize : function() {
			//this.genomeReleaseFiles = new GenomeReleaseFiles( { "genomeVersion": "hy17", "specie": "fly", "path": "pathToFile", "fileName": "nameOfFile" });
			var that = this;

			this.genomeReleaseFiles = new GenomeReleaseFiles();
			// this.genomeReleaseFiles = new GenomeReleaseFiles(file1);
			// this.genomeReleaseFiles.push(file2);
			this.genomeReleaseFiles.fetch({
				complete : function() {
					that.render(that.genomeReleaseFiles);
				}
			}); 

			// console.log(this.genomeReleaseFiles);
			// this.render(this.genomeReleaseFiles);
		},

		render : function(genomeReleaseFiles) {
			var template = _.template(GenomeReleaseTemplate, {genomeReleaseFiles : genomeReleaseFiles.models});
			$('.activePage').html(template);

		},
		
		events : {
			"click #th_species": "orderBySpecies",
			"click #th_version": "orderByVersion",
			"click #th_filename": "orderByFileName",
			"click #delete_genome_btn" : "deleteGenomeRelease",
			"change .fileInput": "addSelectedFile"
			
		},
		
		orderBySpecies : function() {
			this.genomeReleaseFiles.orderBy("specie");
			this.render(this.genomeReleaseFiles);
		},
		
		orderByVersion : function() {
			this.genomeReleaseFiles.orderBy("genomeVersion");
			this.render(this.genomeReleaseFiles);
		},
		
		orderByFileName : function() {
			this.genomeReleaseFiles.orderBy("fileName");
			this.render(this.genomeReleaseFiles);
		},
		
		deleteGenomeRelease : function(e) {
			console.log(e);
			console.log($('#delete_genome_btn').find('value'));
		},
		
		addSelectedFile: function() {
			var formFiles = this.$el.find(".fileInput")[0].files;
			var fileObj = formFiles[0];
			var genomeReleaseFile = new GenomeReleaseFile();
			genomeReleaseFile.setFileObj(fileObj);
			genomeReleaseFile.set({"fileName": fileObj.name});
			var uploadGenomeReleaseModal = new UploadGenomeReleaseModal(genomeReleaseFile);
			uploadGenomeReleaseModal.show();
			this.$el.find(".fileInput").val("");

		}
	
	});
	return GenomeReleaseView;
});
