var btns = {
    is_visible : true ,
    btn_controll_src : "img/blackcircle.png"
};

var arrows = {
    is_visibile : true ,
    right_way_arrow_src : "img/right.png",
    left_way_arrow_src : "img/left.png"
};


var albModel = {
    
    init : function(){
        
    } ,
    
    getNumberOfPhoto : function(){
        return photos.length;
    } ,
    
    getPhotoObject : function(id){
        return photos[id];
    } ,
    
    getCurrentPhoto(){
        return this.currentImage;
    } ,
    
    setCurrentPhoto(id){
        this.currentImage = photos[id];
    } ,
    
    get_right_btn_src(){
        return arrows.right_way_arrow_src;
    } ,
    
    get_left_btn_src(){
        return arrows.left_way_arrow_src;
    } 
    
};


var albController = {
    
    init :function(){
        albModel.init();
        albAlbumView.init();
    } ,
    
    getNumberOfPhoto : function(){
        return albModel.getNumberOfPhoto();
    } ,
    
    getPhotoObject : function(id){
        return albModel.getPhotoObject(id);
    } ,
    
    getCurrentPhoto(){
        return albModel.getCurrentPhoto();
    } ,
    
    setCurrentPhoto(id){
        albModel.setCurrentPhoto(id);
    } ,
    
    get_right_btn_src(){
        return albModel.get_right_btn_src();
    } ,
    
    get_left_btn_src(){
        return albModel.get_left_btn_src();
    } 
};


var albAlbumView = {
    
    init : function(){
        
        var $album = $('.album');
        
        var firstPhoto = albController.getPhotoObject(1);
        
        var $presentationCol = $('#presentationCol');
        $presentationCol.append('<img class="img-responsive" src="' + firstPhoto.src + '" id="presenColImg"></img>');
        
        var $titleCol = $('#titleCol');
        $titleCol.append('<div class="jumbotron sstyl">'
                        +'    <h1 id="presentTitle">' + firstPhoto.title.text + '</h1>'
                        +'    <p id="presentDescription">' + firstPhoto.description.text + '</p>'
                        +'</div>');
        
        var $othersCol = $('#othersCol');
        $othersCol.append('<div class="page-headers styl">'
                        +'    <h1 id="presentTitle">' + 'Watch All Photos' + '</h1>'
                        +'</div>');
        
        var colCounter = 0;    
        /*init of the photo*/
        for(var i = 0; i < albController.getNumberOfPhoto(); i++){
            if(colCounter == 3) colCounter = 0;
            
            var $curCol = $('#' + colCounter + '-col');
            
            var curPhoto = albController.getPhotoObject(i);
            
            $curCol.append('<div id="' + i + '-albDivImgJum" class="albPhotoContainer"></div>');
            
            var $curAlbDivImgJum = $('#' + i + '-albDivImgJum');
            
            $curAlbDivImgJum.append('<img class="img-responsive img-rounded albPhoto" src="' + curPhoto.src + '"></img>');
            
            $curAlbDivImgJum.append('<div class="albOver jumbotron">'
                               + '<h1 class="albTitle">' + curPhoto.title.text + '</h1>'
                               + '<p class="albDesc">' + curPhoto.description.text + '</p>'
                               + '</div>');
            
            var $curAlbJumbo = $('.albOver');
            $curAlbDivImgJum.hover(
                function() {
                    $(this).children('.albOver').css('visibility', 'visible')
                           .animate({'margin-top':'-35%'},100);
                },
                function() {
                    $(this).children('.albOver').css('visibility', 'hidden').css('margin-top','-20%');
                }
            );
            
           $curAlbDivImgJum.click(function(){
               var is_str = jQuery(this).attr("id");
               is_str = is_str.charAt(0);
               albAlbumView.onClickPhoto(is_str);
           });
            
            colCounter+=1;
        }
    } ,
    
    onClickPhoto : function(id){
        var $presentationCol = $('#presentationCol');
        var $albTitlePhoto = $('#presenColImg');
        var $presentTitle = $('#presentTitle');
        var $presentDescription = $('#presentDescription');
        
        var selectedPhoto = albController.getPhotoObject(parseInt(id));
        
        $albTitlePhoto.attr('src', selectedPhoto.src);
        $presentTitle.text(selectedPhoto.title.text);
        $presentDescription.text(selectedPhoto.description.text);
        
        $('html, body').animate({scrollTop: $presentationCol.offset().top}, 300);
        
//        $('body').append($('<form/>')
//          .attr({'action': 'viewer.html', 'method': 'get', 'id': 'replacer', 'target': '_blank'})
//          .append($('<input/>')
//            .attr({'type': 'hidden', 'name': 'id', 'value': id})
//          )
//        ).find('#replacer').submit().remove();
    }
    
};




$(document).ready(function(){
   albController.init(); 
});