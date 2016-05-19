/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var addTabs = function (obj) {
    id = "tab_" + obj.id;
    $("[role=presentation]").removeClass("active");
    //如果TAB不存在，创建一个新的TAB
    if (!$("#" + id)[0]) {
        //固定TAB中IFRAME高度,根据需要自己修改
        mainHeight = $(document.body).height();
        //创建新TAB的title
        title = '<li role="presentation" id="tab_' + id + '"><a href="#' + id + '" aria-controls="' + id + '" role="tab" data-toggle="tab">' + obj.title+'</a>';
        //是否允许关闭
        if (obj.close) {
            title += ' <i class="close-tab glyphicon glyphicon-remove"></i>';
        }
        title += '</li>';
        $(".nav-tabs").append(title);
        //是否指定TAB内容
        if (obj.content) {
            content = '<div role="tabpanel" class="tab-pane" id="' + id + '">' + obj.content + '</div>';
        } else {
            content = '<div role="tabpanel" class="tab-pane" id="' + id + '"></div>';
            //ajax请求
            $.ajax({
		  		url : obj.url,
		  		type : 'post',
		  		success : function(data) {
		  			$("#"+id).html(data);
				}
		  	});
            obj.content=content;
            $(".tab-content").append(content);
        }
        //加入TABS
    }
    //激活TAB
    $("#tab_" + id).addClass('active');
    $("#" + id).addClass("active");
};
var closeTab = function (id) {
    //如果关闭的是当前激活的TAB，激活他的前一个TAB
    if ($("li.active").attr('id') == "tab_" + id) {
        $("#tab_" + id).prev().addClass('active');
        $("#" + id).prev().addClass('active');
    }
    //关闭TAB
    $("#tab_" + id).remove();
    $("#" + id).remove();
};
$(function () {
    $("[addtabs]").click(function () {
        addTabs({id: $(this).attr("addtabs"), title: $(this).attr('title'), url: $(this).attr('url'), close: true});
    });

    $(".nav-tabs").on("click", ".close-tab", function () {
        id = $(this).prev("a").attr("aria-controls");
        closeTab(id);
    });
});