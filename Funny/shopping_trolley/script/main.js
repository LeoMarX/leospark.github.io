$(document).ready(function () {

		var userId = "f8cc3fb357b291320157b2afca8c0026";
		var store;

		$.ajax({
				type: "GET",
				url:
				"http://www.juiceepoch.com/juice/rest/api/member/shopping?userId=" + userId,
				dataType: "json",
				success: function (data) {
						if (data.msg == "成功") {
								// console.log(data.data.length);
								// 接口关闭，模拟 Ajax
								// var store = data.data;
								var store = dataList.data;
								$("#shopping-box").empty();
								$.renderList(store);
								$.addEvent();
						} else {
								cosnole.log("false");
						}
				},
				error: function (jqXHR) {
						alert("发生错误：" + jqXHR.status);
				}
		});

		// 渲染列表
		$.renderList = function(store) {
				for(var i=0; i<store.length; i++) {
						var $lists = $("<div class='shopping-list'></div>");

						var $checkbox = $("<input type='checkbox' type='items'>");

						var $img = $("<img src='./img/img.png' alt='pic'>");
						$img.attr("src",store[i].goodThumb);

						var $name = $('<span class="product-name"></span>');
						$name.text(store[i].goodName);

						var $price = $('<span class="product-price"></span>');
						$price.text("￥" + store[i].goodPrice);

						var $numBox = $('<div class="num-box"> <span>数量：</span>\
												<button class="more">+</button>\
												<span class="piece">'+ store[i].salesVolume +'</span>\
												<button class="less">-</button>\
												</div>');

						$lists.append($checkbox).append($img).append($name)
								.append($price).append($numBox);

						$("#shopping-box").append($lists);
				}
		}

		$.addEvent = function() {
				var $lists = $(".shopping-list > :checkbox");

				// 每个 list 按钮事件
				$lists.click(function () {
						var flag = true;
						$lists.each(function () {
								if (!this.checked) {
										flag = false;
								}
						});

						$("#calculate > :checkbox").prop("checked", flag);
						$.countEach();
				});

				// 全选按钮事件
				$("#calculate > :checkbox").click(function () {
						var flag = $lists.length == $(".shopping-list > :checked").length;
						$lists.prop("checked", !flag);
						$(this).prop("checked", !flag);
						if (flag) {
								$.countAll(0, 0);
						}
						$.countEach();
				});

				// 数量加 1
				$(".more").click(function () {
						var pieces = $(this).parent().children(".piece");
						pieces.text(parseInt(pieces.text()) + 1);
						$.countEach();
				});

				// 数量减 1
				$(".less").click(function () {
						var pieces = $(this).parent().children(".piece");
						if (pieces.text() > 0) {
								pieces.text(parseInt(pieces.text()) - 1);
								$.countEach();
						}
				});       
		}

		$.countAll = function (nums, prices) {
				$("#calc-nums").text(nums);
				$("#calc-price").text(prices);
		}

		$.countEach = function () {
				var nums = 0, prices = 0;
				var $lists = $(".shopping-list > :checkbox");
				$lists.each(function () {
						if (this.checked) {
								var tmp = $(this).parent().children(".product-price").text().replace("￥", "");
								var piece = parseInt($(this).parent().children(".num-box").children(".piece").text());
								nums += piece;
								prices += parseInt(tmp) * piece;
						}
				});
				$.countAll(nums, prices);
		}

});

var dataList = {
	"msg": "获取成功",
	"data": [
		{
			"goodStandard": "",
			"temperature": "2~4",
			"salesVolume": 1,
			"isOnsell": 0,
			"goodNumber": "",
			"goodThumb": "http://120.76.191.51/juice/upload/images/20160930123252MTX1NuOU.jpg",
			"goodName": "雪梨+柠檬+蜂蜜",
			"goodPrice": "19",
			"goodType": "轻体蔬果系列",
			"goodInventory": null,
			"effect": "雪梨、柠檬和蜂蜜混合，较为清澈，口感清新，甜而不腻，有较好的生津解燥、润喉清热的作用。",
			"id": "f8cc3fb357790c010157795e0a2b003b"
		},
		{
			"goodStandard": "",
			"temperature": "2~4",
			"salesVolume": 2,
			"isOnsell": 0,
			"goodNumber": "",
			"goodThumb": "http://120.76.191.51/juice/upload/images/20160930123330ATH6Abwe.jpg",
			"goodName": "苹果+柠檬+黄瓜",
			"goodPrice": "19",
			"goodType": "轻体蔬果系列",
			"goodInventory": null,
			"effect": "苹果、柠檬和黄瓜搭配清新至极，三者都是护肤美容的极佳配搭，对减肥瘦身有较大帮助，女神养成分分钟。",
			"id": "f8cc3fb357790c010157795e9e7e003d"
		},
		{
			"goodStandard": "",
			"temperature": "2~4",
			"salesVolume": 1,
			"isOnsell": 0,
			"goodNumber": "",
			"goodThumb": "http://120.76.191.51/juice/upload/images/20160930123407b6GbvUga.jpg",
			"goodName": "柠檬+黄瓜",
			"goodPrice": "18",
			"goodType": "轻体蔬果系列",
			"goodInventory": null,
			"effect": "柠檬和黄瓜搭配口味清淡，香味清新，糖分极低，适合正在努力瘦身减肥的你，同时呵护你的肌肤。",
			"id": "f8cc3fb357790c010157795f2ab3003f"
		},
		{
			"goodStandard": "",
			"temperature": "2~4",
			"salesVolume": 2,
			"isOnsell": 0,
			"goodNumber": "",
			"goodThumb": "http://120.76.191.51/juice/upload/images/20160930123442urZJpwWn.jpg",
			"goodName": "苹果+胡萝卜",
			"goodPrice": "18",
			"goodType": "轻体蔬果系列",
			"goodInventory": null,
			"effect": "苹果和胡萝卜含胡萝卜素、柠檬酸、苹果酸、钙、铁、果胶等，常饮有解乏的作用，对皮肤也大有好处。",
			"id": "f8cc3fb357790c010157795fbd8f0041"
		},
		{
			"goodStandard": "",
			"temperature": "2~4",
			"salesVolume": 1,
			"isOnsell": 0,
			"goodNumber": "",
			"goodThumb": "http://120.76.191.51/juice/upload/images/20160930123523XKNTKTSV.jpg",
			"goodName": "红菜头+苹果+雪梨",
			"goodPrice": "22",
			"goodType": "轻体蔬果系列",
			"goodInventory": null,
			"effect": "红菜头富含人体所需的多种氨基酸，味带甘甜，配以苹果及雪梨，有由内而外红润肌肤的作用。",
			"id": "f8cc3fb357790c0101577961017e0043"
		},
		{
			"goodStandard": "",
			"temperature": "2~4",
			"salesVolume": 1,
			"isOnsell": 0,
			"goodNumber": "",
			"goodThumb": "http://120.76.191.51/juice/upload/images/2016093012364882DiPczO.jpg",
			"goodName": "红菜头+奇异果+雪梨",
			"goodPrice": "22",
			"goodType": "轻体蔬果系列",
			"goodInventory": null,
			"effect": "有了奇异果的调和，整体果香更上一层楼，而且奇异果微酸，口感更加清新，除美化肌肤外，还能生津解燥。",
			"id": "f8cc3fb357790c01015779619e6d0045"
		},
		{
			"goodStandard": "",
			"temperature": "2~4",
			"salesVolume": 1,
			"isOnsell": 0,
			"goodNumber": "",
			"goodThumb": "http://120.76.191.51/juice/upload/images/20160930123726XwVQRRxV.jpg",
			"goodName": "苹果+芹菜+柠檬",
			"goodPrice": "20",
			"goodType": "轻体蔬果系列",
			"goodInventory": null,
			"effect": "苹果和柠檬对皮肤抗氧化有比较好的作用，而芹菜在提供纤维素之外，还具有排毒作用，促进人体新陈代谢。",
			"id": "f8cc3fb357790c01015779622fa30047"
		},
		{
			"goodStandard": "",
			"temperature": "2~4",
			"salesVolume": 2,
			"isOnsell": 0,
			"goodNumber": "",
			"goodThumb": "http://120.76.191.51/juice/upload/images/20160930123808DXHGTHuH.jpg",
			"goodName": "苹果+苦瓜+柠檬+蜂蜜",
			"goodPrice": "20",
			"goodType": "轻体蔬果系列",
			"goodInventory": null,
			"effect": "苦瓜的苦涩、蜂蜜的甘甜、苹果的清香、柠檬的微酸构成独特的味道，四者混合后的排毒效果，谁喝谁知道！",
			"id": "f8cc3fb357790c0101577962cf9f0049"
		}
	],
	"status": 200
};