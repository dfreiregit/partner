jQuery(document).ready(function ($) {//important to pass the $ because somewhere else in WP uses jQuery.noConflict(), which invalidates the $
	setOrCreateMetaTag('name', 'viewport', 'width=device-width, initial-scale=1.0');
	
	includeJS("https://www.ecornell.com/wp-content/themes/ecustom/js/bootstrap.min.js");
	includeJS("https://www.ecornell.com/wp-content/plugins/ecustom-embed/js/jQuery.tubeplayer.min.js");
	includeJS("https://www.ecornell.com/wp-content/plugins/ecustom-embed/js/ecustom-embed.js");
	
	$('.welcome').insertAfter( $('.contactInfo:last') );
	$('.welcome').prepend('<img src="https://s3.amazonaws.com/ecornell/partner_pages/welcome-thumb.jpg" />');
	$('.welcome').after('<div class="about-ecornell"><h5>About eCornell</h5><p>eCornell\'s online courses are authored by faculty from Cornell University\'s ' + 
			'world-renowned Samuel Curtis Johnson Graduate School of Management, the School of Industrial and Labor Relations (ILR), and the School of Hotel Administration, ' + 
			'a leader in hospitality-management education consistently ranked among the very top institutions worldwide.</p></div>');
	$('.welcome').wrap('<a href="#videoModal" data-toggle="modal" class="welcome-vid-link"></a>');
	
	$('*[data-toggle=modal]').click(function(e){
		e.preventDefault();
		
		var $firstEmbed = $('iframe:first, embed:first, object:first', this).clone();
		
		var newSrc = $firstEmbed.attr('src');
		if ( newSrc.indexOf('?')==-1 ) {
			newSrc += '?autoplay=1';
		} else {
			newSrc += '&autoplay=1';
		}
		
		$firstEmbed.attr('src', newSrc );
		$('.video-container:first', '#videoModal').html( $firstEmbed );
	});
	/*
	$('#videoModal').on('shown', function() {
  	  $('iframe, embed, object', this).each(function(){
  		  $(this).attr('src', $(this).attr('src') + '&autoplay=1' );
  	  });
    });
	*/
	$('#videoModal').on('hidden', function() {
  	  $('iframe, embed, object', '#videoModal').remove();
    });
	
});

function includeJS(src,callback) {
	if(typeof callback != 'function') callback = function() {};

	var script = document.createElement('script');
	if(typeof script.readyState == 'undefined') {
		script.onload = callback;
	} else {
		script.onreadystatechange = function(){
        	if(script.readyState == "loaded" || script.readyState == "complete"){
            	script.onreadystatechange = null;
            	callback();
        	} //if//
    	}; //function//
	} //if-else//

	script.type = 'text/javascript';
	script.src = src;
	document.getElementsByTagName('head')[0].appendChild(script);
}

function setOrCreateMetaTag(metaName, name, value) {
    var t = 'meta['+metaName+'='+name+']';
    var mt = $(t);
    if (mt.length === 0) {
        t = '<meta '+metaName+'="'+name+'" />';
        mt = $(t).appendTo('head');
    }
    mt.attr('content', value);
}