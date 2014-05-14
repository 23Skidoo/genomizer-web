define([],function() {
    var Router = Backbone.Router.extend({

        routes: {
            "search/:query": "search",
            "search": "search",
            "": "search",
            "upload":"upload",
            "process":"process",
            "process/:query":"process",
            "admin":"admin",
            "admin/createannotation": "createAnnotation",
            "admin/editannotation/:name": "editAnnotation"
        },

        initialize: function(options) {
            this.history = [];
            this.on("route", this.storeRoute);
        },

        storeRoute: function(event, p2) {
            console.log("Router > storeRoute > event: ", event, p2);
            this.history.push(Backbone.history.fragment);
        },

        previous: function(options) {
            console.log("router > previous > history: ", this.history);
            if (this.history.length > 2) {

                // remove the current page from history
                this.history.pop();

                // get the previous page
                var previous = this.history[this.history.length-1];

                console.log("router > previous > previouspath: ", previous);
                this.navigate(previous, options);
            }
        },
        hasPrevious: function() {
            return this.history.length > 2;
        },

        search: function(query) {
            var that = this;
            require([
                'views/search/Search'
            ],function(Search) {
                new Search({el:that.getNewMainView(),query:query});
            });
        },

        upload: function() {
            var that = this;
            require([
                'views/upload/Upload'
            ],function(Upload) {
                new Upload({el:that.getNewMainView()});
            });
        },

        process: function(query) {
            require([
                'views/processModal/Process'
            ],function(Process) {
                var modal = new Process({query:query});
                modal.show();
            });
        },
        getNewMainView: function() {
            $("#mainView").replaceWith('<section id=mainView></section>');
            return $("#mainView");
        },
        
        getNewAdminView: function() {
        	$(".activePage").remove();
        	$("#mainView").append('<div class=activePage></div>');
        	return $("#mainView");
        },
        
        admin: function() {
            var that = this;
            require([
                'views/sysadmin/SysadminMainView',
                'views/sysadmin/AnnotationsView'
            ],function(SysadminMainView, AnnotationsView) {
                new SysadminMainView({el:that.getNewMainView()});
                new AnnotationsView({el:that.getNewAdminView()});
            });
        },
        
        createAnnotation: function() {
            var that = this;
            require([
                'views/sysadmin/NewAnnotationView'
            ],function(NewAnnotationView) {
                new NewAnnotationView({el:that.getNewAdminView()});
            });
        },
        
        editAnnotation: function(name) {
            var that = this;
            require([
                'views/sysadmin/EditAnnotationView'
            ],function(EditAnnotationView) {
                new EditAnnotationView({el:that.getNewAdminView(), id:name});                
            });
        }    

    });
    return Router;
});


