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
                console.log(data.data.length);
                var store = data.data;
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
                        <span class="piece">'+ store[i].volume +'</span>\
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