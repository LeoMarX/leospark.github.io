var step = 0;
var scrollTimer;
var outerWidth = document.getElementById("wrapper").clientWidth; // 定义容器宽度，最高值为 600
var scrollWrap = document.getElementsByClassName("slider-content")[0]; // 定义轮播容器

// 动画函数，参数 per 运行间隔时间，dur 动画总运行时间，fn 调用的 function，start 开始的位置，end 结束的位置
function animFun(per, dur, fn, start, end) {
	var startTime = Date.now();
	var diff = end - start;

	function cycle(fn) {
		var t = Math.min(1, (Date.now() - startTime)/dur);
		var site = Math.floor(t * diff) + start;
		// console.log(site);

		if(t >= 1) {
			fn(end);
			// console.log("DONE.");
			return;
		}
		fn(site);
		setTimeout(function() {cycle(fn)}, per);
	}

    cycle(fn);
}


// 复制第一个 Banner 到第六个空格中
(function() {
    var slideContent = document.getElementsByClassName("slider-content")[0];
    var tmpNode = slideContent.getElementsByTagName("li")[0].cloneNode(true);
    slideContent.appendChild(tmpNode);
})();

// 轮播 Banner 移动函数
function swipeBanner(site) {
    site = -1 * site; // 数值取反
    scrollWrap.style.transform = "translate3d(" + site + "px, 0, 0)";
    scrollWrap.style.webkitTransform = "translate3d(" + site + "px, 0, 0)";
}

function toggleTab() {
    var flag = (step > 4) ? 0 : step;
    var list = document.getElementsByClassName("swipe-wrap")[0].getElementsByTagName("li");

    // console.log("tab: " +　flag);

    for (var i = 0; i < list.length; i++) {
        list[i].className = (i == flag) ? "selected-white" : "";
    }
}

function autoSlide() {
	// console.log("step >> " + (step + 1));
    animFun(16, 800, swipeBanner, step * outerWidth, (step+1) * outerWidth);

    step = (step >= 4) ? 0 : ++ step;
	setTimeout(function() {toggleTab()}, 640);
}

function beginScroll() {
    scrollTimer = setInterval(function() {
        autoSlide();
    }, 3000);
}

// 添加触控事件
(function() {
	var startX;
    var boxSite;

    if(!scrollWrap.style.transform) {
        swipeBanner(0);
    }

    function updateBoxSite() {
        var index = scrollWrap.style.transform.indexOf("px");
		return boxSite = Math.abs(scrollWrap.style.transform.slice(12, index));
    }

    function resetBoxSite() {
        var tmp = boxSite - step * outerWidth;
        if(tmp > 0) {
            if(tmp/outerWidth > 0.35)  step++;
        } else {
        	if(Math.abs(tmp/outerWidth) > 0.4) step--;
		}

        console.log("resetBoxSite>> tmp: " + tmp);
        if(Math.abs(tmp) > 600) {
            console.error(tmp);
            console.log("step: " + step);
        }
        animFun(16, 300, swipeBanner, boxSite, step * outerWidth);
        toggleTab();

        if(step > 4) {
        	setTimeout(function() {
        	    swipeBanner(0);
        	    step = 0;
        	}, 320);
        	console.log("set default >>");
        }
    }

    scrollWrap.addEventListener("touchstart", function(event) {
        startX = event.touches[0].pageX;
        updateBoxSite();
        clearInterval(scrollTimer);
    });

    scrollWrap.addEventListener("touchmove", function(event) {
        event.preventDefault();

    	var pageX = event.touches[0].pageX;
        var scrollX = startX - pageX;
        var sum = boxSite + scrollX;
        var site;

        if(sum < 0) {
        	site = boxSite + 0.2 * scrollX;
		} else {
        	site = sum;
		}
        swipeBanner(site);
    });

    scrollWrap.addEventListener("touchend", function() {
        updateBoxSite();
        resetBoxSite();
        beginScroll();
        console.log("boxSite: " + boxSite);
    	console.log(">> touch END.");
	});

})();

// 添加点击事件，切换隐藏菜单
var menuBtn = document.getElementsByClassName("menu-btn")[0];
menuBtn.addEventListener("click", function(event) {
	event.preventDefault();
	var topMenu = document.getElementById("top-menu");
	if(topMenu.className !== "menu-show") {
		topMenu.className = "menu-show";
		menuBtn.className = "menu-btn" + " " + "clear-menu";
	} else {
		topMenu.className = "menu-hidden";
		menuBtn.className = "menu-btn";
	}
});


(function() {
	var listScroll = document.getElementsByClassName("list-scroll")[0];
	var boxWidth = listScroll.clientWidth;
    var boxSite;
    var startX, startY;

    if(!listScroll.style.transform) {
        listScroll.style.transform = "translate3d(0, 0, 0)";
        updateBoxSite();
    }

    function setupBoxSite(site) {
        listScroll.style.transform = "translate3d(" + site + "px, 0, 0)";
    }

    function updateBoxSite() {
            var index = listScroll.style.transform.indexOf("px");
            return boxSite = parseInt(listScroll.style.transform.slice(12, index));
    }

    function resetBoxSite() {
        var bkWidth = boxWidth * 0.33;
        var tmp = Math.abs(boxSite) % bkWidth;
        var step = Math.floor(Math.abs(boxSite) / bkWidth);
        if(tmp > bkWidth * 0.35 && boxSite < 0) {
                step = step >= 2 ? 1 : step;
                animFun(16, 300, setupBoxSite, boxSite, -1 * (step+1) * bkWidth);

                console.log(boxSite + "; step: " + step);
                console.log(">>> reset boxSite");
        } else {
            animFun(16, 300, setupBoxSite, boxSite, -1 * step * bkWidth);
        }
            updateBoxSite();
    }

	listScroll.addEventListener("touchstart", function(event) {

        startX = event.touches[0].pageX;
		startY = event.touches[0].pageY;
        updateBoxSite();
	});

	listScroll.addEventListener("touchmove", function(event) {

		var scrollX = event.touches[0].pageX - startX;
        var scrollY = event.touches[0].pageY - startY;
        var sum = boxSite + scrollX;
        var site;

        if(Math.abs(scrollY) > Math.abs(scrollX) || Math.abs(scrollX) <10) {
			return
		}
        event.preventDefault();
        if(sum >= 0 || Math.abs(sum) > boxWidth * 0.66) {
            site = boxSite + scrollX * 0.5;
        } else {
            site = boxSite + scrollX;
        }
        
		setupBoxSite(site);

       // console.log("boxSite: " + boxSite + " scrollX:" + scrollX);
    });

	listScroll.addEventListener("touchend", function() {
        updateBoxSite();
        resetBoxSite();
		console.log(">> touch end. >>")
	});

})();

var goTopBtn = document.getElementsByClassName("goTop-btn")[0];
goTopBtn.addEventListener("click", function() {
	console.log("go top");
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

    animFun(16, 300, function(site) {
    	if(document.body.scrollTop) {
            document.body.scrollTop = site;
        } else {
            document.documentElement.scrollTop = site;
		}
	}, scrollTop, 0);

});

window.addEventListener("scroll", function() {
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

    if (scrollTop > window.innerHeight) {
        goTopBtn.style.display = "block";
    } else {
        goTopBtn.style.display = "none";
    }
});

// 暂时取消 a 标签跳转
(function() {
    document.addEventListener("click", function(e) {
        var event = e || window.event;
        if(event.target && event.target.nodeName.toUpperCase() == "A"){
            event.preventDefault();
        }
    })
})();