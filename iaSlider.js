/******************************************************

	iaSlider

	- update 5.0 (01.07.'14)
	- update 5.1 (04.07.'14)
	- update 5.2 (05.02.'15)
	
*******************************************************/
var winW = $(window).width();
var winH = $(window).height();

// include
$('head link').after('<link href="scripts/iaSlider/iaSlider.css" rel="stylesheet" type="text/css">'); // css


$.fn.iaSlider = function(config){
	
	var config = $.extend({
		id: this[0].id, 				// Id'si
		maskLi: 1, 						// Ekranda görünen veri sayýsý
		width:250, 						// Bir verinin geniþliði
		baseValue:"li", 				// Baz alýnacak deger (li / a)
		type:"", 						// Türü (single/group)
		itinerary: "marginLeft", 		// Hareket yönü (marginLeft/marginTop)
		autoPlay: "play", 				// otomatik hareket (play/null)
		time:6							// otomatik hareket saniyesi
	}, config);

	// var
	var dID  = "#"+config.id,
		IDa  = config.id+"Area",
		dIDa = "#"+IDa,
	
		stage = 0,
		dCount = $(dID+" "+config.baseValue).length,
		//ie =  navigator.userAgent.match(/msie/i),
		slct,t,frstSlct;
	
	// add mask
	$(dID).wrap("<div id='"+IDa+"' class='iaSlider' />"); 
	$(dIDa).append('<div class="listNumb"><a id="prv" class="prv"><span></span></a><a id="nxt" class="nxt"><span></span></a></div>');
	$(dIDa).append('<div class="navi"></div>');
	$(dID).wrap('<div class="maske fixed" />');
	$(dID).addClass('sliderArea fixed');

	// slider Off
	if(dCount == '0'){$(dIDa).addClass("sliderOff")}

	// first selected
	frstSlct = $(dIDa+" .sliderArea > li.selected");
	if(frstSlct.length > 0 ){
		eval('$(dIDa+" .sliderArea").css({' + config.itinerary + ': ((config.width * frstSlct.index())* -1)+"px"});');
		stage = frstSlct.index();
	}

	// navi add & add selected
	for(i=0; i < dCount; i++){
		if(i=='0'){slct = 'class="selected"';} else {slct=''}
		$(dIDa+' .navi').append('<a '+slct+' href="javascript:;" rel="'+i+'"></a>');
	}

	// width 100%
	if (config.width == '100%'){
		$(dIDa+" .sliderArea li").width(winW);
		config.width = winW;
		/*
		//$(dIDa+" .listNumb a").css("top", (winH-250)/2);
		$(dIDa).width(winW).height(winW/2.1);
		*/
		
		//$(dIDa+" .listNumb a").css("top", (  ) );
	}
	
	// add noArrow
	if (dCount <= config.maskLi){$(dIDa).parent().addClass("noArrow");}
	
	// Stop
	function stopSlide(){clearTimeout(t);}
	
	// type
	var screenData = config.maskLi;
	if (config.type == 'group') {dCount = (dCount-1) / screenData; dCount--;}
	else {dCount = Math.ceil(dCount - screenData) ;}
	dCount--;

	// autoPlay
	if (config.autoPlay == 'play') {
		function sar(){
			stopSlide();
			$(dIDa+" .nxt").click();
			t=setTimeout(sar, (config.time*1000));
		};
		sar();
	}

	// mouseOver-Stop / mouseOut-Play
	$(dIDa).hover(
		function () {stopSlide();},
		function () {t=setTimeout(sar, (config.time*1000))}
	)
	
	// prv click
	$(dIDa+" .prv").click(function () {
		if (stage >= 1) {
			eval('$(dIDa+" .sliderArea").animate({' + config.itinerary + ': "+="+config.width+"px"});');
			stage--;
			$(dIDa+" .navi a").removeClass("selected");
			$(dIDa+" .navi a:eq("+stage+")").addClass("selected");
		}
	});
	
	// nxt click
	$(dIDa+" .nxt").click(function () {
		if (stage <= dCount) {
			eval('$(dIDa+" .sliderArea").animate({' + config.itinerary + ': "-="+config.width+"px"},1000);');
			stage++;
			
			$(dIDa+" .navi a").removeClass("selected");
			$(dIDa+" .navi a:eq("+stage+")").addClass("selected");
		}
		else {
			eval('$(dIDa+" .sliderArea").animate({' + config.itinerary + ': "0px"});');
			stage = 0;
			$(dIDa+" .navi a").removeClass("selected");
			$(dIDa+" .navi a:eq("+stage+")").addClass("selected");
		}
	});
	
	// navi Click
	$(dIDa+" .navi a").click(function () {
		var gotoSlctd =  ($(this).attr('rel') - stage) * config.width;
		
		eval('$(dIDa+" .sliderArea").animate({' + config.itinerary + ': "-="+gotoSlctd+"px"});');
		stage = $(this).attr('rel');
		
		$(".navi a").removeClass("selected");
		$(".navi a:eq("+stage+")").addClass("selected");
		
	});	

}






// ready
$(document).ready(function(){
	
		$("#news").iaSlider({
			 width:305
		});
	
});