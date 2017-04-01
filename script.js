var albModel = {
    
    init : function(){
        
    } ,
    
    getNumberOfPhoto : function(){
        return photos.length;
    } ,
    
    getPhotoObject(id){
        return photos[id];
    }
    
};


var albController = {
    
    init :function(){
        albModel.init();
        albView.init();
    } ,
    
    getNumberOfPhoto : function(){
        return albModel.getNumberOfPhoto();
    } ,
    
    getPhotoObject(id){
        return albModel.getPhotoObject(id);
    } 
};


var albView = {
    
    init : function(){
        
        var $album = $('.album');
        
        var colCounter = 0;
        
        for(var i = 0; i < albController.getNumberOfPhoto(); i++){
            if(colCounter == 3) colCounter = 0;
            
            var $curCol = $('#' + colCounter + '-col');
            
            var curPhoto = albController.getPhotoObject(i);
            
            $curCol.append('<div id="' + i + '-albDivImgJum" class="albPhotoContainer"></div>');
            
            var $curAlbDivImgJum = $('#' + i + '-albDivImgJum');
            
            $curAlbDivImgJum.append('<img class="img-responsive img-rounded albPhoto" src="' + curPhoto.src + '"></img>');
            
            $curAlbDivImgJum.append('<div class="albOver jumbotron">'
                               + '<h2 class="albTitle">' + curPhoto.title.text + '</h2>'
                               + '<p class="albDesc">' + curPhoto.description.text + '</p>'
                               + '</div>');
            
            var $curAlbJumbo = $('.albOver');
            $curAlbDivImgJum.hover(
                function() {
                    $(this).children('.albOver').css('visibility', 'visible').animate({'margin-top':'-25%'},100); 
                },
                function() {
                    $(this).children('.albOver').css('visibility', 'hidden').css('margin-top','-20%');
                }
            );
            
            colCounter+=1;
        }
    }
    
};

$(document).ready(function(){
   albController.init(); 
});