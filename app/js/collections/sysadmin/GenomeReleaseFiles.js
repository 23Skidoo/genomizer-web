define(['models/sysadmin/GenomeReleaseFile', 'models/sysadmin/Gateway'], function(GenomeReleaseFile, Gateway) {
	var GenomeReleaseFiles = Backbone.Collection.extend({
		model : GenomeReleaseFile,
		url : Gateway.getURL() + "genomeRelease",

		addFilesByFileObject: function(fileObjects) {
			var that = this;
			_.each(fileObjects,function(fileObj) {
				var file = new GenomeReleaseFile({
					fileName:fileObj.name
				});
				file.fileObj = fileObj;
				that.add(file);
			});

		},
		
		uploadGenomeReleaseFiles : function(data) {
			// array URL

			var i = 0;
			_.forEach(this.models, function(file) {
				file.setUploadURL(data[i].URLupload);
				console.log(data[i].URLupload);
				console.log(file.get('fileName'));
				i++;
				file.uploadGenomeReleaseFile();
			});
			
		},
		
		/*
		 * returns the total size of the files to be uploaded
		 */
		getTotalUploadFileSize: function() {
			var size = 0;
			this.each(function(f) {
				if(f.isFileUpload()) {
					size += f.getFileSize();
				}
			});
			return size;
			
		},
		
		/*
		 * Get the total upload progress as a value between 0 and 1
		 */
		getTotalUploadProgress: function() {
			if(this.getTotalUploadFileSize() == 0) {
				return 1;
			}
			var uploadedSize = 0;
			this.each(function(f) {
				if(f.isFileUpload()) {
					uploadedSize += f.getFileSize() * f.progress;
				}
			});
			return uploadedSize / this.getTotalUploadFileSize();
		},
		
		setFileInfo : function(specie, genomeVersion) {
			this.specie = specie;
			this.genomeVersion = genomeVersion;
			// var that = this;
			// _.forEach(that.models, function(file) {
				// console.log(that.models);
				// console.log(file);
				// file.set({"specie" : specie, "genomeVersion" : genomeVersion});
			// });
		},
		
		getGenomeReleaseByName : function(name) {
			var genomeReleaseFile = null;
			for (var i = 0; i < this.length; i++) {
				if ((this.at(i).get('fileName')).toLowerCase() == name.toLowerCase()) {
					genomeReleaseFile = this.at(i);
					break;
				}
			}
			return genomeReleaseFile;
		},
		
		getFileNames : function(){
			var result = [];
			for (var i = 0; i < this.length; i++) {
				result.push(this.at(i).get('fileName'));
			}
			return result;
		},
		
		getFolderPaths : function(){
			var result = [];
			for (var i = 0; i < this.length; i++) {
				result.push(this.at(i).get('folderPath'));
			}
			return result;
		},

		comparator : function(model) {
			if (this._order_by == 'genomeVersion')
				return model.get('genomeVersion');
			else if (this._order_by == 'fileName')
				return model.get('fileName');
			else
				return model.get('specie');
		}, 
		
		orderBy: function(sortString) {
			this._order_by = sortString;
			this.sort();
		}, 
		
		_order_by: 'specie',
		
		getForSpecies: function(specie) {
			var gfs = this.filter(function(gr) {
				return gr.get("specie").toLowerCase() == specie.toLowerCase();
			});
			return new GenomeReleaseFiles(gfs);
		},
		
		getPayload : function() {
			var payload = new Backbone.Model();
			payload.set({"genomeVersion": this.genomeVersion, "species" : this.specie, "files":this.getFileNames()});
			return payload;
		}

	});
	return GenomeReleaseFiles;
});

