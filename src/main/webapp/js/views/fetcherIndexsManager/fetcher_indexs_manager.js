$(function () {
    var page = {
        location: {
            queryForPage: "/fetcherIndexsManager/queryForPage",
            addData:"/fetcherIndexsManager/addData",
            deleteData:"/fetcherIndexsManager/deleteData"
        },
        init: function () {
            this.bindUI();
        },
        bindUI: function () {
            $("#searchBtn").on("click", page.search);
            $("#addBtn").on("click", page.showAddDiv);
            $("#addDataBtn").on("click", page.addData);
        },
        search: function () {
            $("#AAA_Table").bootgrid({
                ajax: true,
                url: page.location.queryForPage,
                selection: true,
                multiSelect: true,
                rowSelect: true,
                keepSelection: true,
                navigation:2,
                formatters: {
                    "urls": function (column, row) {
                        var urls = row.urls;
                        var html = "";
                        for (var i = 0; i < urls.length; i++) {
                            html += urls[i];
                            html+="<br>";
                        }
                        return html;
                    },
                    "operation": function (column,row) {
                        return "<button type=\"button\" class=\"btn btn-xs btn-success glyphicon glyphicon-pencil\" data-row-id=\"" + row.id + "\" />" +
                            "&nbsp;&nbsp;&nbsp;&nbsp;<button type=\"button\" class=\"btn btn-xs btn-danger glyphicon glyphicon-remove-circle\" data-row-id=\"" + row.id + "\" />";
                    }
                }
            }).on("loaded.rs.jquery.bootgrid",function(){
                $(".glyphicon-pencil").on("click", function(e)
                {
                    alert(e);
                    alert("You pressed edit on row: " + $(this).data("row-id"));
                });
                //删除事件
                $(".glyphicon-remove-circle").on("click", function()
                {
                    var id =$(this).data("row-id");
                    $.messager.confirm("提示", "确定删除该记录吗!", function() {
                        $.ajax({
                            url:page.location.deleteData,
                            type:"POST",
                            async: false,
                            data:{id:id},
                            success:function(response){
                                if(response.code='000000'){
                                    $.messager.alert("删除成功");
                                    page.search();
                                }
                            }
                        });
                    });
                });
            });
            $("#AAA_Panel").show();
        },
        showAddDiv:function(){
            $("#addFetcherDiv").modal('show');
        },
        addData: function () {
            $.ajax({
                url:page.location.addData,
                type:"POST",
                async: false,
                data:$("#addDataForm").serialize(),
                success:function(response){
                    if(response.code='000000'){
                        $("#addFetcherDiv").modal('hide');
                        $.messager.alert("添加成功");
                        page.search();
                    }
                }
            });
        }
    }
    page.init();
});
