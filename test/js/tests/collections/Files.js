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
					var experiment = new Experiment({id:3});
					var files = new Files([],{experiment:experiment});
					files.add(new File());
					expect(files.at(0).get("experimentID")).to.not.equal(3);
					files.updateExperimentIds();
					expect(files.at(0).get("experimentID")).to.equal(3);
				});
				it("should update multiple files with experiment id", function () {
					var experiment = new Experiment({id:3});
					var files = new Files([],{experiment:experiment});
					files.add(new File());
					files.add(new File());
					expect(files.at(0).get("experimentID")).to.not.equal(3);
					expect(files.at(1).get("experimentID")).to.not.equal(3);
					files.updateExperimentIds();
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
	});
});
