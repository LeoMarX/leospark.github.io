$(function () {
	window.onscroll = function() {
		if (checkScroll()) {
			pushNews();
		}
	}
});

var colors = ["#FF6A00", "#00FF90", "#7FC9FF", "#FFE97F", "#DD7E21", "#824FAF"];
var authors = [
			{"author":"陶渊明", "content":"《饮酒·其五》<br/>结庐在人境，而无车马喧<br/>问君何能尔？心远地自偏<br/> 采菊东篱下，悠然见南山<br/>山气日夕佳，飞鸟相与还<br/>此中有真意，欲辨已忘言"}, 
			{"author":"元稹", "content":"《离思》<br/>曾经沧海难为水，除却巫山不是云<br/>取次花丛懒回顾，半缘修道半缘君"},
			{"author":"苏轼", "content":"《水调歌头》<br/>明月几时有？把酒问青天<br/>不知天上宫阙，今夕是何年<br/>我欲乘风归去，又恐琼楼玉宇，高处不胜寒<br/>起舞弄清影，何似在人间<br/>转朱阁，低绮户，照无眠<br/>不应有恨，何事长向别时圆<br/>人有悲欢离合，月有阴晴圆缺，此事古难全<br/>但愿人长久，千里共婵娟"},
			{"author":"纳兰性德", "content":"《木兰词·拟古决绝词柬友》<br/>人生若只如初见，何事秋风悲画扇<br/>等闲变却故人心，却道故人心易变<br/>骊山语罢清宵半，泪雨零铃终不怨<br/>何如薄幸锦衣郎，比翼连枝当日愿"},
			{"author":"李白", "content":"《黄鹤楼送孟浩然之广陵》<br/>故人西辞黄鹤楼，烟花三月下扬州<br/>孤帆远影碧空尽，唯见长江天际流"},
			{"author":"李煜", "content":"《虞美人·春花秋月何时了》<br/>春花秋月何时了？往事知多少<br/>小楼昨夜又东风，故国不堪回首月明中<br/>雕栏玉砌应犹在，只是朱颜改<br/>问君能有几多愁？恰似一江春水向东流"}
];

function pushNews() {
	var $pos = posFloat(); // 确定浮动位置
	var randomX = Math.floor(Math.random() * 6); // 获取随机颜色值

	// 创建新的信息块
	var $listBox = $("<div>").addClass("content_box").appendTo($("#main")),

		$listUser = $("<div>").addClass("content_user").appendTo($listBox),
		$listUserPic = $("<div>").addClass("user_pic").appendTo($listUser),
		$listUserName = $("<div>").addClass("user_name").appendTo($listUser),

		$listContent = $("<div>").addClass("content_list").appendTo($listBox),
		$listContentSpan = $("<span>").appendTo($listContent),
		$listContentPic = $("<div>").addClass("pic").html("PIC").appendTo($listContent);

	// 设置内容和属性
	$listContentPic.css({"background": colors[randomX]});
	$listBox.css("float", $pos);
	// console.log(randomX);
	// console.log($listBox.css("float"));

	$listUserName.html(authors[randomX].author);
	$listContentSpan.html(authors[randomX].content);
}

function posFloat() {	
		var $main = $("#main");
		var $list = $("#main>div");
		var $ls01 = $list.last();
		var $ls02 = $list.eq(-2);

		var $H1 = $ls01.offset().top + $ls01.innerHeight();
		var $H2 = $ls02.offset().top + $ls02.innerHeight();

		function fl(flo) {
			if (flo == "left") {
				return "right";
			} else {
				return "left";
			}
		}

		if($H1 > $H2) {
			return fl($ls01.css("float"));
		} else {
			return fl($ls02.css("float"));
		}

}

function checkScroll() {
	var $last = $("#main>div").last();
    var lastH = $last.offset().top;
    var scrollTop = $(window).scrollTop();
    var windowH =  $(window).height();
    return (scrollTop + windowH > lastH) ? true : false;
}