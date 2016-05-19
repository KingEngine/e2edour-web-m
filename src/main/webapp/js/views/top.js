$(function() {
	var page = {
		location : {
			search : "getLeftMenus"
		},
		init : function() {
			this.bindUI();
		},
		bindUI : function() {
			$("[data-next]").on("click", this.showLeft);
		},
		showLeft : function() {
			$("[data-next]").parent().removeClass("active");
			var menuId = $(this).attr("data-next");
			$(this).parent().addClass("active");
			$.ajax({
				type : "post",
				url :  page.location.search,
				data:{"firstMenuId":menuId},
				success : function(data) {
					//var html = template.render("menuDataList", data);
					//$("#leftDiv").html(html);
					$("#leftDiv").html(data);
				}});
		}
	}
	page.init();
});
