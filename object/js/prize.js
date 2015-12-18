;(function($) {
	$.fn.prize = function(options) {
		var ops = $.extend({
			ga: "3",
			//刮奖次数
			gamark: "./image/gua_image.jpg",
			//结果蒙层
			gamarkW: "315",
			//蒙层宽度
			gamarkH: "153",
			//蒙层高度
			gaimg: "./image/07.jpg",
			//刮奖结果||图片的位置
			gaimgW: "315",
			//结果层宽度
			gaimgH: "153",
			//结果成高度
			err: "./image/wuyu.png" //不支持canvas时显示
		}, options);
		var str = '<img id="gua_img" src=' + ops.gamark + ' style="position: absolute;"><canvas  style="position:absolute; z-index:55;"><img src=' + ops.err + ' style="position: absolute;"></canvas>';
		$(this).append(str);
		var gua = ops.ga;
		var imgSrc = ops.gaimg;
		var body_width = $(window).width();
		var body_height = $(window).height();
		$("#gua_img").width(ops.gamarkW).height(ops.gamarkH);
		var height = ops.gaimgH;
		var width = ops.gaimgW;
		if (gua >= 0) {
			bodys(height, width);
		};

		function bodys(height, width) {
			var img = new Image();
			var canvas = document.querySelector('canvas');
			canvas.style.position = 'absolute';
			img.addEventListener('load', function(e) {
				var ctx;
				var w = width,
					h = height;
				var offsetX = canvas.offsetLeft,
					offsetY = canvas.offsetTop;
				var mousedown = false;

				function eventDown(e) {
					e.preventDefault();
					mousedown = true;
				};

				function eventUp(e) {
					e.preventDefault();
					mousedown = false;
				};

				function eventMove(e) {
					e.preventDefault();
					if (mousedown) {
						if (e.changedTouches) {
							e = e.changedTouches[e.changedTouches.length - 1];
						};
						var x = (e.clientX + document.body.scrollLeft || e.pageX) - offsetX || 0,
							y = (e.clientY + document.body.scrollTop || e.pageY) - offsetY || 0;
						with(ctx) {
							beginPath();
							arc(x, y, 15, 0, Math.PI * 2);
							fill();
						}
					}
				}
				canvas.width = w;
				canvas.height = h;
				canvas.style.backgroundImage = 'url(' + img.src + ')';
				ctx = canvas.getContext('2d');
				var bg = new Image();
				bg.src = ops.gamark;
				ctx.drawImage(bg, 0, 0);
				ctx.globalCompositeOperation = 'destination-out';
				canvas.addEventListener('touchstart', eventDown);
				canvas.addEventListener('touchend', eventUp);
				canvas.addEventListener('touchmove', eventMove);
				canvas.addEventListener('mousedown', eventDown);
				canvas.addEventListener('mouseup', eventUp);
				canvas.addEventListener('mousemove', eventMove);
			});

			img.src = imgSrc;
			(document.body.style);
		}

	}

})(jQuery)