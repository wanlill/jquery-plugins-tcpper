/* =================================================
// jQuery refresh plugin
// author : liwanli01@baidu.com
// Url: http://tcpper.duapp.com
// Data : 2012-06-08
// =================================================*/

;(function($) {
	$.fn.extend({
		refresh: function(options) {
			// 处理参数
			options = $.extend({
				interval : 10,
				minInterval: 5,
				autorefresh: false,
				linkText: "refresh",
				checkBoxText: "auto",
				intervalText: "second",
				malformNotifier: function (mal_interval) {
					alert("sorry, " + mal_interval + " not wellformed");
				},
				minNotifier: function (min_interval) {
					alert("sorry, " + min_interval + " too small");
				},
				callback : function () {
					alert("refresh now!");
				}
			}, options);
			
			
			var self = $(this);
			var timeout;
			var link = $('<a class="refresh-link" href="#">' + options.linkText + '</a>');
			var checkBox = $('<input class="refresh-checkbox" type="checkbox" />');
			var checkBoxSpan = $('<span>' + options.checkBoxText + '</span>');
			var intervalInput = $('<input class="refresh-input" type="text" value="' + options.interval + '" />');
			var intervalSpan = $('<span>' + options.intervalText + '</span>');

			self.append(link).append(checkBox).append(checkBoxSpan).append(intervalInput).append(intervalSpan);
		
			link.click(function () {
				options.callback();
			});
			
			checkBox.change(function () {
				if ($(this).attr("checked") == "checked") {
					var timeout_function = function () {
						var tmpInterval = parseInt(intervalInput.val())
						if (! isNaN(tmpInterval)) {
							interval = tmpInterval;
							if (interval < options.minInterval) {
								options.minNotifier(interval);
								intervalInput.val(options.minInterval);
								interval = options.minInterval;
							}
							options.callback();
							timeout = setTimeout(timeout_function, interval * 1000);
						}
						else {
							options.malformNotifier(tmpInterval);
							intervalInput.val(interval);
							$(this).removeAttr("checked");
						}
					};
					timeout_function();
				} else {
					clearTimeout(timeout);
				}
			});
		}
	});
})(jQuery);