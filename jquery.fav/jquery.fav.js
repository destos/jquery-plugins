/* --------------------------------------------------------------------
// Author: Patrick Forringer ( patrick@forringer.com )
// File info: Fav Jquery plugin
// Ver: 0.3
// Url : http://github.com/destos/my-jQuery-plugins
*/

(function($){
	$.fn.fav = function(options){
					
		return $(this).each(function(){
			
			// Find Links
			if( $(this).is('a') ){
				$links = $(this);	
			}else if( $(this).has('a') ){
				$links = $(this).find('a');
			}
			
			$links.each(function(){
				
				$link = $(this);
				
				// get default values.
				var defaults = {
					url:	$link.attr('href'),
					name:	( $link.attr('title') ) ? $link.attr('title') : $link.text()
				};
				// if multiple links are selected the same custom options are applied to them, figure out how to 
				// allow seperate options
				var opt = $.extend(defaults,options);
				
				$link.click(function(){
			
					if ( window.sidebar ) { // Mozilla Firefox Bookmark
						window.sidebar.addPanel( opt.name,  opt.url, '' );
					} else if( window.external ) { // IE Favorite
						window.external.AddFavorite(  opt.url, opt.name );
					} else if( window.opera ){ // Opera
						$link.attr("rel","sidebar");
						return true;
					} else {
						alert("Sorry! Your browser doesn't support this function. Press ctrl+D to bookmark "+opt.name+".");
					}
				
					return false;
					
				});
				
			});
		});
		
	};
})(jQuery);