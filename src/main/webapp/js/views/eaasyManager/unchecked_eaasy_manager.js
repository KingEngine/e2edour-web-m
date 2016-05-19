$(function () {
    var page = {
        location: {
            queryForPage: "contentManager/eaasyManager/uncheckedEaasyManager/queryForPage",
            verify: "contentManager/eaasyManager/uncheckedEaasyManager/verify",
            queryOne: "contentManager/eaasyManager/uncheckedEaasyManager/queryOne"
        },
        init: function () {
            this.bindUI();
        },
        bindUI: function () {
            $("#searchBtn").on("click", page.logic.queryForPage);
            $("#verifyPassBtn").on("click", function(){
                page.logic.verify("pass");
            });
            $("#verifyRejectBtn").on("click", function(){
                page.logic.verify("reject");
            });
        },
        logic: {
            queryForPage: function () {
                $("#AAA_Table").bootgrid({
                    ajax: true,
                    url: page.location.queryForPage,
                    selection: true,
                    multiSelect: true,
                    rowSelect: true,
                    keepSelection: true,
                    navigation:2,
                    formatters: {
                        "operation": function (column, row) {
                            return "<button type=\"button\" class=\"btn btn-xs btn-success glyphicon glyphicon-ok\" data-row-id=\"" + row.id + "\" />" +
                                "&nbsp;&nbsp;&nbsp;&nbsp;<button type=\"button\" class=\"btn btn-xs btn-danger glyphicon glyphicon-remove-circle\" data-row-id=\"" + row.id + "\" />"+
                                "&nbsp;&nbsp;&nbsp;&nbsp;<button type=\"button\" class=\"btn btn-xs btn-warning glyphicon glyphicon-zoom-in\" data-row-id=\"" + row.id + "\" />"
                                ;
                        }
                    }
                }).on("loaded.rs.jquery.bootgrid", function () {
                    $(".glyphicon-zoom-in").on("click", function (e) {
                        var id = $(this).data("row-id");
                        $.ajax({
                            url: page.location.queryOne,
                            type: "POST",
                            async: false,
                            data: {id: id},
                            success: function (response) {
                                if (response.code = '000000') {
                                    var obj = response.obj;
                                    $("#show_title").html(obj.title);
                                    $("#show_content").html(obj.content);
                                    $("#showDataDiv").modal('show');
                                }
                            }
                        });
                    });
                    //删除事件
                    $(".glyphicon-remove-circle").on("click", function () {
                        var id = $(this).data("row-id");
                        $.messager.confirm("提示", "确定删除该记录吗!", function () {
                            $.ajax({
                                url: page.location.deleteData,
                                type: "POST",
                                async: false,
                                data: {id: id},
                                success: function (response) {
                                    if (response.code = '000000') {
                                        $.messager.alert("删除成功");
                                        page.logic.queryForPage();
                                    }
                                }
                            });
                        });
                    });
                });
                $("#AAA_Table").bootgrid("reload");
                $("#AAA_Panel").show();
            },
            verify:function(status){
                var ids=[];
                $('input[name="select"]:checked').each(function(){
                    if("all"!=$(this).val()){
                        ids.push($(this).val());
                    }
                });
                $.ajax({
                    url:page.location.verify,
                    type:"POST",
                    async: false,
                    data:{ids:ids.toString(),status:status},
                    success:function(response){
                        if(response.code='000000'){
                            $.messager.alert("操作成功");
                            page.logic.queryForPage();
                        }
                    }
                });
            }
        }

    }
    page.init();
});
