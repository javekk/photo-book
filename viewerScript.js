var albViewerModel = {
    
    init : function(){
        
    } ,
    
    getPhotoObject : function (id){
        return photos[id];
    }
};

var albViewerController = {
    
    init : function(){
        albViewerModel.init();
        albViewerView.init();
    } ,
    
    getPhotoObject : function(id){
        return albViewerModel.getPhotoObject(id);
    }
}


var albViewerView = {
    init : function(){
        
        var id = albViewerView.urlParam('id');
        
        var $albViewerPhoto = $('#albViewerPhoto');
        
        var $albViewerlabels = $('#albViewerLabels');
        
        var datPhoto = albViewerController.getPhotoObject(id);
        
        $albViewerPhoto.append('<img class="img-responsive" src="' + datPhoto.src + '"></img>');
        
        $albViewerlabels.append('<div class="jumbotron sstyl"">'
                               + '<h1 class="albTitle">' + datPhoto.title.text + '</h1>'
                               + '<p class="albDesc">' + datPhoto.description.text + '</p>'
                               + '</div>');
    } ,
    
    urlParam : function(name)  
    {  
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);  
        return results[1] || 0;  
    }
    
};

$(document).ready(function(){
    albViewerController.init();
});