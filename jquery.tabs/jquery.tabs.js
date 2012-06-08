/* =================================================
// jQuery Tabs Plugins 1.2
// author : chenmnkken@gmail.com
// Url: http://stylechen.com/jquery-tabs.html
// Data : 2012-02-28
// =================================================*/

;(function($){
	$.fn.extend({
		Tabs:function(options){
			// 处理参数
			options = $.extend({
				event : 'mouseover',
				timeout : 0,
				auto : 0,
				callback : null
			}, options);
			
			
			var self = $(this),
				tabBox = self.children( 'div.tab_box' ).children( 'div' ),
				menu = self.children( 'div.tab_menu' ),
				items = menu.find( 'li' ),
				timer;
				
			var tabHandle = function( elem ){
					elem.siblings( 'li' )
						.removeClass( 'current' )
						.end()
						.addClass( 'current' );
						
					tabBox.siblings( 'div' )
						.addClass( 'hide' )
						.end()
						.eq( elem.index() )
						.removeClass( 'hide' );
				},
					
				delay = function( elem, time ){
					time ? setTimeout(function(){ tabHandle( elem ); }, time) : tabHandle( elem );
				},
				
				start = function(){
					if( !options.auto ) return;
					timer = setInterval( autoRun, options.auto );
				},
				
				autoRun = function(){
					var current = menu.find( 'li.current' ),
						firstItem = items.eq(0),
						len = items.length,
						index = current.index() + 1,
						item = index === len ? firstItem : current.next( 'li' ),
						i = index === len ? 0 : index;
					
					current.removeClass( 'current' );
					item.addClass( 'current' );
					
					tabBox.siblings( 'div' )
						.addClass( 'hide' )
						.end()
						.eq(i)
						.removeClass( 'hide' );
				};

			var reset_event = function () {
				items.unbind(options.event);
				items.bind(options.event, function(){
					delay($(this), options.timeout );
					if( options.callback ){
						options.callback.call( self );
					}
				});
			};

			reset_event();

			if( options.auto ){
				start();
				self.hover(function(){
					clearInterval( timer );
					timer = undefined;
				},function(){
					start();
				});
			}
			
			this.addTab = function (new_menu, new_content, active) {
				if (active) {
					tabBox.addClass('hide'),
					items.removeClass('current');
					new_menu.addClass('current');
				} else {
					new_content.addClass("hide");
				}
				
				self.children("div.tab_menu").append(new_menu);
				self.children("div.tab_box").append(new_content);

				tabBox = self.children('div.tab_box').children('div'),
				menu = self.children('div.tab_menu'),
				items = menu.find('li'),

				reset_event();
			};
			
			this.cleanTabs = function () {
				items.remove();
				tabBox.remove();
			}

			return this;
		}
	});
})(jQuery);