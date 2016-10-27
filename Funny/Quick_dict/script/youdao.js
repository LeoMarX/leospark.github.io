// 定义请求网址
var url;
var errorMap =  {
    20: '要翻译的文本过长',
    30: '无法进行有效的翻译',
    40: '不支持的语言类型',
    50: '无效的key',
    60: '无词典结果，仅在获取词典结果生效'
};

function getURL(q) {
	var apiKey = "1787962561",
		keyfrom = "f2ec-org";

	var link = "http://fanyi.youdao.com/openapi.do?keyfrom=" + keyfrom + "&key=" + apiKey + "&type=data&doctype=jsonp&callback=request&version=1.1&q=" + q;
	url = encodeURI(link);
	// console.log(url);
}

// callback 函数
function request(data) {
	var text = JSON.stringify(data);
	var json = JSON.parse(text);
	// console.log(json);

	randerResult(json);
}

// 渲染列表
function randerResult(json) {
	console.log(json);
	console.log(json.length);
	// 检查是否有报错
	if(json.errorCode !== 0) {
		console.log(errorMap[json.errorCode]);
		return false;
	}

	var result = document.getElementById("result");
	result.innerHTML = "<h2>基本释义：</h2>";

	// 如果只是长文本，则只翻译 translation 内容
	if(objectLength(json) <= 4) {
		var part = document.createElement("p");
		part.innerHTML = json.translation;
		result.appendChild(part);
		return;
	}

	var partOne = document.createElement("p");
	partOne.innerHTML = json.query + " <b>[" + json.basic.phonetic + "]</b>";
	result.appendChild(partOne);

	var ul = listObject(json.basic.explains);
	result.appendChild(ul);

	// 历遍“网络释义”
	var h2 = document.createElement("h2");
	h2.innerHTML = "网络释义：";
	result.appendChild(h2);

	for(var i=0; i<json.web.length; i++) {
		var part = document.createElement("p");
		part.innerHTML = i+1 + ". " + json.web[i].key;
		var ul = listObject(json.web[i].value);
		ul.setAttribute("class", "website");

		result.appendChild(part);
		result.appendChild(ul);
	}
}

// 历遍对象
function listObject(list) {
	var ul = document.createElement("ul");

	for(var i = 0; i < list.length; i++) {
		var li = document.createElement("li");
		li.innerHTML = list[i];
		ul.appendChild(li);
	}
	console.log(ul);
	return ul;
}

// 检查object的长度
function objectLength(json) {
	var count = 0;
	for(key in json) {
		count ++;
	}
	return count;
}

function queryWord() {
	var q = document.getElementById("query-text").value.trim();

	// 只能输入中英文字符、数字
	var regx= /[^\u4E00-\u9FA5\w\s']/g;
	if(regx.test(q)) {
		console.log("非中英文字符和数字: " + q);
		return false;
	}

	getURL(q);
	console.log(q);

	var script = document.createElement("script");
    script.setAttribute("src", url);
    document.getElementsByTagName("head")[0].appendChild(script);
}

document.getElementById("search-button").onclick = function() {
	queryWord();
}

document.getElementById("query-text").onkeyup = function(event) {
	event = event || window.event;
	// 按下 enter 按键
	if(event.keyCode == 13) {
		queryWord();
	}
}