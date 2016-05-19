$(function() {
	var page = {
		location : {
			search : "topicVerifySearch"
		},
		init : function() {
			console.log();
			this.bindUI();
		},
		bindUI : function() {
			$("#searchBtn").on("click", this.search);
		},
		search : function() {
			/*var options = {
				target : '#dataList',
				url : page.location.search,
				type : 'post',
				//dataType : null,
				//async : false
			};
			$("#dataList").show();
			$("#searchForm").ajaxForm(options).submit();*/
			//$.ajax({
				//type : "post",
				//url :  page.location.search,
				//data : "id="+ id +"&loginName=" + loginName + "&oldPwd=" + oldPwdPge.pwdResult() +"&newPwd="+ newPwdPge.pwdResult(),
				//dataType : "text",
				//success : function(data) {

					//$("#AAA_Panel").show();
					//var html = template.render("dataList", data);
					//$("#AAA_tbody").html(html);
				//}});


		    $("#AAA_Table").bootgrid({
		        ajax: true,
		        url: page.location.search,
		        selection: true,
		        multiSelect: true,
		        rowSelect: true,
		        keepSelection: true,
		        navigation:2,
		        formatters: {
		            "commands": function(column, row) {
		                return "<button type=\"button\" class=\"btn btn-xs btn-default glyphicon glyphicon-ok\" data-row-id=\"" + row.id + "\" />" + 
		                    "<button type=\"button\" class=\"btn btn-xs btn-default glyphicon glyphicon-remove\" data-row-id=\"" + row.id + "\" />";
		            }
		        }
		    }).on("selected.rs.jquery.bootgrid", function(e, rows){
		        var rowIds = [];
		        for (var i = 0; i < rows.length; i++)
		        {
		            rowIds.push(rows[i].id);
		        }
		        alert("Select: " + rowIds.join(","));
		    }).on("deselected.rs.jquery.bootgrid", function(e, rows){
		        var rowIds = [];
		        for (var i = 0; i < rows.length; i++)
		        {
		            rowIds.push(rows[i].id);
		        }
		        alert("Deselect: " + rowIds.join(","));
		    });
		    $("#AAA_Panel").show();
		}
	}
	page.init();
});
