var outerWidth = document.getElementById("wrapper").clientWidth; // 定义容器宽度，最高值为 600

// 动画函数，参数 per 运行间隔时间，dur 动画总运行时间，fn 调用的 function，start 开始的位置，end 结束的位置
function animFun(per, dur, fn, start, end) {
	var startTime = Date.now();
	var diff = end - start;

	function cycle(fn) {
		var t = Math.min(1, (Date.now() - startTime)/dur);
		var site = Math.floor(t * diff) + start;

		if(t >= 1) {
			fn(end);
			return;
		}
		fn(site);
		setTimeout(function() {cycle(fn)}, per);
	}

    cycle(fn);
}

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
	var listScroll = document.getElementsByClassName("scroll-box")[0];
    var boxSite;
    var startX, startY, scrollX, scrollY;

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
        var min = outerWidth * 0.2;

        if(boxSite >= 0 || scrollX > min) {
            animFun(16, 300, setupBoxSite, boxSite, 0);
        } else if(Math.abs(boxSite) > min || -1 * scrollX > min) {
            animFun(16, 300, setupBoxSite, boxSite, -0.6 * outerWidth);
        }

        updateBoxSite();
    }

	listScroll.addEventListener("touchstart", function(event) {

        startX = event.touches[0].pageX;
		startY = event.touches[0].pageY;
        updateBoxSite();
	});

	listScroll.addEventListener("touchmove", function(event) {

		scrollX = event.touches[0].pageX - startX;
        scrollY = event.touches[0].pageY - startY;
        var sum = boxSite + scrollX;
        var site;

        if(Math.abs(scrollY) > Math.abs(scrollX) || Math.abs(scrollX) <10) {
			return;
		}
        
        event.preventDefault();

        if(sum >= 0 || Math.abs(sum) > outerWidth * 0.6) {
            site = boxSite + scrollX * 0.3;
        } else {
            site = boxSite + scrollX;
        }

		setupBoxSite(site);
    });

	listScroll.addEventListener("touchend", function() {
        updateBoxSite();
        resetBoxSite();
		console.log(">> touch end. >>");
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