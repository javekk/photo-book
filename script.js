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

    getcurrentPhotoNumber(){
        return this.currentImage;
    } ,

    setcurrentPhotoNumber(id){
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
        albView.init();
    } ,

    getNumberOfPhoto : function(){
        return albModel.getNumberOfPhoto();
    } ,

    getPhotoObject : function(id){
        return albModel.getPhotoObject(id);
    } ,

    getcurrentPhotoNumber(){
        return albModel.getcurrentPhotoNumber();
    } ,

    setcurrentPhotoNumber(id){
        albModel.setcurrentPhotoNumber(id);
    } ,

    get_right_btn_src(){
        return albModel.get_right_btn_src();
    } ,

    get_left_btn_src(){
        return albModel.get_left_btn_src();
    }
};


var albView = {

    currentPhotoNumber : 1 ,


    init : function(){

        var $album = $('.album');

        var firstPhoto = albController.getPhotoObject(1);

        /*add the main photo*/
        var $presentationCol = $('#presentationCol');
        $presentationCol.append('<img class="img-responsive" src="' + firstPhoto.src + '" id="presenColImg"></img>');

        /*add the -----LEFT ARROW----- and its onClick function*/
        $presentationCol.append('<div class="dirOver col-md-1 col-xs-1">'
                               +   '<img class="img-responsive dirArrow" src="' + albController.get_left_btn_src() + '" id="arrowL"></img>'
                               +'</div> ');
        $('#arrowL').click(function(){ albView.onClickArrows('l'); });

        /*add the -----RIGHT ARROW----- and its onClick function*/
        $presentationCol.append('<div class="dirOver col-md-1 col-xs-1 col-md-offset-11 col-xs-offset-11">'
                         +   '<img class="img-responsive dirArrow" style="margin-left:-2em" src="' + albController.get_right_btn_src() + '" id="arrowR"></img>'
                         +'</div> ');
        $('#arrowR').click(function(){ albView.onClickArrows('r'); });

        /*insert the title and description column with their visibility/ not with color*/
        var $titleCol = $('#titleCol');
        $titleCol.append('<div class="jumbotron sstyl">'
                        +'    <h1 id="presentTitle">' + firstPhoto.title.text + '</h1>'
                        +'    <p id="presentDescription">' + firstPhoto.description.text + '</p>'
                        +'</div>');
        if(!firstPhoto.title.is_visible){$('#presentTitle').css('visibility','hidden');}
        if(!firstPhoto.description.is_visible){$('#presentDescription').css('visibility','hidden');}

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
                               + '<h1 class="albTitle" id="albTitle-' + i +'">' + curPhoto.title.text + '</h1>'
                               + '<p class="albDesc" id="albDesc-' + i + '">' + curPhoto.description.text + '</p>'
                               + '</div>');

            /*customize title and description*/
            var $curTitle = $('#albTitle-' + i);
            var $curDescr = $('#albDesc-' + i);
            if(!curPhoto.title.is_visible){$curTitle.css('visibility','hidden');}
            $curTitle.css('color', curPhoto.title.color);
            if(!curPhoto.description.is_visible){$curDescr.css('visibility','hidden');}
            $curDescr.css('color', curPhoto.description.color);

            /*show title and description, in */
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
               var idNumb = is_str.split('-');
               albView.onClickPhoto(idNumb[0]);
           });

            colCounter+=1;
        }

        $('.bounce').append('<img class="img-responsive img-rounded" id="arrowBottom" src="img/bottom.png"></img>');
        albView.animateArrows();
    } ,


    onClickPhoto : function(id){
        var $presentationCol = $('#presentationCol');
        var $albTitlePhoto = $('#presenColImg');
        var $presentTitle = $('#presentTitle');
        var $presentDescription = $('#presentDescription');

        this.currentPhotoNumber = parseInt(id);
        var selectedPhoto = albController.getPhotoObject(this.currentPhotoNumber);

        $albTitlePhoto.attr('src', selectedPhoto.src);
        $presentTitle.text(selectedPhoto.title.text);
        $presentDescription.text(selectedPhoto.description.text);

        $('html, body').animate({scrollTop: $presentationCol.offset().top}, 300);

        /*costum visibility for title and Description, not for color*/
        if(!selectedPhoto.title.is_visible){$presentTitle.css('visibility','hidden');}
        else{$presentTitle.css('visibility','visible');}

        if(!selectedPhoto.description.is_visible){$('#presentDescription').css('visibility','hidden');}
        else{$presentTitle.css('visibility','visible');}

//        $('body').append($('<form/>')
//          .attr({'action': 'viewer.html', 'method': 'get', 'id': 'replacer', 'target': '_blank'})
//          .append($('<input/>')
//            .attr({'type': 'hidden', 'name': 'id', 'value': id})
//          )
//        ).find('#replacer').submit().remove();
    } ,


    onClickArrows : function(dir){

        var $presentationCol = $('#presentationCol');
        var $albTitlePhoto = $('#presenColImg');
        var $presentTitle = $('#presentTitle');
        var $presentDescription = $('#presentDescription');

        var lastPhotoNumber = albController.getNumberOfPhoto()-1;

        var numbOfNewcurrentPhoto;

        if(dir == 'l'){
            numbOfNewcurrentPhoto = (albView.currentPhotoNumber == 0) ?  lastPhotoNumber : albView.currentPhotoNumber-1;
        }
        if(dir == 'r'){
            numbOfNewcurrentPhoto = (albView.currentPhotoNumber == lastPhotoNumber) ? 0 : albView.currentPhotoNumber+1;
        }

        var newCurrentPhoto = albController.getPhotoObject(numbOfNewcurrentPhoto);

        $albTitlePhoto.attr('src', newCurrentPhoto.src);
        $presentTitle.text(newCurrentPhoto.title.text);
        $presentDescription.text(newCurrentPhoto.description.text);

        /*costum visibility for title and Description, not for color*/
        if(!newCurrentPhoto.title.is_visible){$presentTitle.css('visibility','hidden');}
        else{$presentTitle.css('visibility','visible');}

        if(!newCurrentPhoto.description.is_visible){$('#presentDescription').css('visibility','hidden');}
        else{$presentDescription.css('visibility','visible');}

        albView.currentPhotoNumber = numbOfNewcurrentPhoto;

    } ,


    animateArrows : function(){

      function loop() {
          $('#arrowBottom').animate({"padding-top": '+=20px'}, 1000)
                           .animate({"padding-top": '-=20px'}, 1000 , function(){
                              loop();
                               });
            }
        loop();
    }

};




$(document).ready(function(){
   albController.init();
});
