define(['collections/Files','models/Experiment','models/File'], function(Files,Experiment,File) {
	describe("models/File", function() {
		describe("should initialize correctly", function() {
			var file;
			beforeEach(function() {
				file = new File();
			});
			it("no options supplied", function() {
				expect(file.progress).to.equal(0);
			});
			it("Should initialize with raw as default type", function() {
				expect(file.get("type")).to.equal("raw");
			});
		});
		describe("should be able to set upload done", function() {
			var file;
			beforeEach(function() {
				file = new File();
			});
			it("uploadDone to equal true", function() {
				file.setUploadDone();
				expect(file.uploadDone).to.be.true;
			});
			it("progress to equal 1", function() {
				file.setUploadDone();
				expect(file.progress).to.equal(1);
			});
			it("triggers upload progress done", function() {
				var callback = sinon.spy();	
				file.on("uploadProgress",callback);
				file.setUploadDone();
				expect(callback.calledOnce).to.be.true;
			});
		});
		describe("should be able to set upload progress", function() {
			var file;
			var evt;
			beforeEach(function() {
				file = new File();
				evt = new Event("ProgressEvent");
			});
			it("progress is 0.5", function() {
				evt.lengthComputable = true;
				evt.loaded = 1;
				evt.total = 2;
				file.setUploadProgress(evt);
				expect(file.progress).to.equal(0.5);
			});
			it("lengh not computable", function() {
				evt.lengthComputable = false;
				evt.loaded = 1;
				evt.total = 2;
				file.setUploadProgress(evt);
				expect(file.progress).to.equal(0);
			});
			it("triggers upload progress", function() {
				evt.lengthComputable = true;
				evt.loaded = 1;
				evt.total = 2;
				var callback = sinon.spy();	
				file.on("uploadProgress",callback);
				file.setUploadProgress(evt);
				expect(callback.calledOnce).to.be.true;
			});
		});
	});
});