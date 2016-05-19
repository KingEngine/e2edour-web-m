$(function () {
    var page = {
        location: {
            queryForPage: "/topicsManager/uncheckedTopicsManager/queryForPage",
            verify: "/topicsManager/uncheckedTopicsManager/verify"
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
                            return "<button type=\"button\" class=\"btn btn-xs btn-success glyphicon glyphicon-pencil\" data-row-id=\"" + row.id + "\" />" +
                                "&nbsp;&nbsp;&nbsp;&nbsp;<button type=\"button\" class=\"btn btn-xs btn-danger glyphicon glyphicon-remove-circle\" data-row-id=\"" + row.id + "\" />";
                        }
                    }
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
