/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city = document.getElementById("aqi-city-input");
	var nums = document.getElementById("aqi-value-input");
	if (!city.value.match(/[\u4e00-\u9fa5_a-zA-Z]/)) {
	// if (!city.match(/[a-zA-Z0-9_u4e00-u9fa5]/)) {
		alert("重新输入中英文字符！");
		return false;
	}
	if (!nums.value.match(/[0-9]/)) {
		alert("请重新输入数字！");
		return false;
	}
	aqiData[city.value] = nums.value;
	city.value = null;
	nums.value = null;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var table = document.getElementById("aqi-table");
	table.innerHTML = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
	for(i in aqiData) {
		var tr = document.createElement("tr");
		var td = document.createElement("td");
		td.innerHTML = i;
		tr.appendChild(td);

		var td = document.createElement("td");
		td.innerHTML = aqiData[i];
		tr.appendChild(td);

		var td = document.createElement("td");
		var btn = document.createElement("button");
		btn.innerHTML = "删除";
		btn.onclick = function() {delBtnHandle(this)};
		td.appendChild(btn);
		tr.appendChild(td);

		table.appendChild(tr);
	}
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData()
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(obj) {
  // do sth.
	var table = document.getElementById("aqi-table");
	console.log(obj);
	var tr = obj.parentNode.parentNode;
	var citi = tr.firstChild.firstChild.nodeValue;
	for (clist in aqiData) {
		if (clist == citi){
			delete aqiData[clist];
		}
	}  
  	renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  document.getElementById("add-btn").addEventListener("click",addBtnHandle);
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}

init();