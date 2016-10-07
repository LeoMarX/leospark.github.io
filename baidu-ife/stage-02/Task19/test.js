var i = 0, j = 0, temp;
var num = [];

for(var a=0; a<50; a++) {
    num[a] = Math.floor(Math.random()*200);
}
// console.log("Default: " + num.toString());

function bubbleSort() {
    if (i<num.length) {
        if(j<num.length-i) {
            if(num[j]>num[j+1]) {
                temp = num[j];
                num[j] = num[j+1];
                num[j+1] = temp;
            }
            j++;
        }
        if(j>=num.length-i) {
            j = 0;
            i++;
            charts();
            // console.log(num.toString()+",yes,"+i);
        }
    }
}

// 生成表格
var lis = document.getElementById("list");

function charts() {
    lis.innerHTML = "";
    var ul = document.createElement("ul");
    for(var i=0; i<num.length; i++) {
        var li = document.createElement("li");
        li.style.height = num[i] + "px";
        ul.appendChild(li);
    }
    lis.appendChild(ul);
}


// 定时执行
document.getElementById("begin").onclick = function(){
    setInterval("bubbleSort()",10);
};