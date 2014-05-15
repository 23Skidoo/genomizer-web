define(['collections/Files','models/Experiment','models/File',],function(Files,Experiment,File) {
	describe("Testing collections/Files", function () {
			describe("should initialize correctly",function() {
				it("no options supplied", function () {
					var files = new Files();
				});
				it("save experiment as attribute,if supplied in constructor", function () {
					var experiment = new Experiment();
					var files = new Files([],{experiment:experiment});
					expect(files.experiment).to.equal(experiment);
				});
			});
			describe("updateExperimentId",function() {
				it("set experiment id", function () {
					var experiment = new Experiment({id:3});
					expect(experiment.id).to.equal(3);
				});
				it("should update experiment id", function () {
					var files = new Files();
					files.add(new File());
					expect(files.at(0).get("experimentID")).to.not.equal(3);
					files.updateExperimentIds(3);
					expect(files.at(0).get("experimentID")).to.equal(3);
				});
				it("should update multiple files with experiment id", function () {
					var files = new Files([]);
					files.add(new File());
					files.add(new File());
					expect(files.at(0).get("experimentID")).to.not.equal(3);
					expect(files.at(1).get("experimentID")).to.not.equal(3);
					files.updateExperimentIds(3);
					expect(files.at(0).get("experimentID")).to.equal(3);
					expect(files.at(1).get("experimentID")).to.equal(3);
				});
			});

			describe("fetchAndSaveFile",function() {
				it("should call fetchAndUpload for each file", function() {
					// SETUP
					var f1 = new File();
					var f2 = new File();
					var s1 = sinon.spy()
					var s2 = sinon.spy()
					f1.fetchAndUpload = s1;
					f2.fetchAndUpload = s2;
					// TEST
					var files = new Files([f1,f2]);
					files.fetchAndSaveFiles();
					// ASSERT
					expect(s1.calledOnce).to.be.true;
					expect(s2.calledOnce).to.be.true;
				});
			});
			describe("should return true or false depending on if all files have been uploaded or not", function() {
			
				it("should return false when all files have been uploaded", function() {
					var f1 = new File();
					var f2 = new File();
					f1.uploadDone = true;
					f2.uploadDone = true;

					var files = new Files([f1,f2]);
					console.log(f1.uploadDone);
					expect(files.hasUnfinishedUploads()).to.be.false;
				});

				it("should return true if not all files have been uploaded", function() {
					var f1 = new File();
					var f2 = new File();
					f1.uploadDone = true;
					f2.uploadDone = false;

					var files = new Files([f1,f2]);
					console.log(f1.uploadDone);
					expect(files.hasUnfinishedUploads()).to.be.true;
				})
			});
			describe("addFilesByFileObject", function() {
				beforeEach(function() {
					this.files = new Files();
					this.fileObjs = [{name:"hej.fastq"},{name:"hello.fastq"}]
				});
				it("models should be added to the collection", function() {
					this.files.addFilesByFileObject(this.fileObjs);
					expect(this.files.length).to.equal(2);
				});
				it("models should have fileObj", function() {
					this.files.addFilesByFileObject(this.fileObjs);
					expect(this.files.at(0).fileObj.name).to.equal("hej.fastq");
					expect(this.files.at(1).fileObj.name).to.equal("hello.fastq");
				})
				it("models fileName should be set", function() {
					this.files.addFilesByFileObject(this.fileObjs);
					expect(this.files.at(0).get("fileName")).to.equal("hej.fastq");
					expect(this.files.at(1).get("fileName")).to.equal("hello.fastq");
				})
			});
	});
});
