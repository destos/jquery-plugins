/* --------------------------------------------------------------------
// Author: Patrick Forringer ( patrick@forringer.com )
// File info: Fav Jquery plugin
// Ver: 0.2
// Last modified: never ever
//
*/

(function($){
	$.fn.fav = function(options){
				
		return $(this).each(function(){
		
			$link = $(this).find('a');			
			
			var defaults = {
				url: $link.attr('href'),
				name: $link.attr('title')
			};
			
			// figure out how to loop through a list of value pairs to allow seperate options for each different link like {{name:"what"},{url:"http://blah.com"}}
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
		
	};
})(jQuery);