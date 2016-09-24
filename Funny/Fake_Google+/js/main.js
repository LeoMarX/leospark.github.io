$(function () {
	window.onscroll = function() {
		if (test2()) {
			pushNews();
		}
	}
});

var colors = ["#FF6A00", "#00FF90", "#7FC9FF", "#FFE97F", "#DD7E21", "#824FAF"];

function pushNews() {
	var $pos = posFloat(); // 确定浮动位置
	var randomSix = Math.floor(Math.random() * 6); // 获取随机颜色值

	// 创建新的信息块
	var $listBox = $("<div>").addClass("content_box").appendTo($("#main")),

		$listUser = $("<div>").addClass("content_user").appendTo($listBox),
		$listUserPic = $("<div>").addClass("user_pic").appendTo($listUser),
		$listUserName = $("<div>").addClass("user_name").appendTo($listUser),

		$listContent = $("<div>").addClass("content_list").appendTo($listBox),
		$listContentSpan = $("<span>").appendTo($listContent),
		$listContentPic = $("<div>").addClass("pic").html("PIC").appendTo($listContent);

	// 设置内容和属性
	$listContentPic.css({"background": colors[randomSix]});
	$listBox.css("float", $pos);
	// console.log(randomSix);
	// console.log($listBox.css("float"));
}

function posFloat() {	
		var $main = $("#main");
		var $list = $("#main>div");
		var $ls01 = $list.last();
		var $ls02 = $list.eq(-2);

		var $H1 = $ls01.offset().top + $ls01.height();
		var $H2 = $ls02.offset().top + $ls02.height();

		if($H1 > $H2) {
			return $ls02.css("float");
		} else {
			return $ls01.css("float");
		}
		// console.log($H1 + "; AND " + $H2);
		// console.log("pos: " + pos);
}

function checkScroll() {
	var $last = $("#main>div").last();
    var lastH = $last.offset().top;
    var scrollTop = $(window).scrollTop();
    var windowH =  $(window).height();
    return (scrollTop + windowH > lastH) ? true : false;
}