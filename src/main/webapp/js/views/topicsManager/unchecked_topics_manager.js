$(function () {
    var page = {
        location: {
            queryForPage: "/topicsManager/uncheckedTopicsManager/queryForPage",
            verify: "/topicsManager/uncheckedTopicsManager/verify"
        },
        init: function () {
            $('[data-toggle="tooltip"]').tooltip();
            this.bindUI();
        },
        bindUI: function () {
            $("#searchBtn").on("click", page.logic.queryForPage);
            $("#verifyPassBtn").on("click", function () {
                page.logic.verifyAll("pass");
            });
            $("#verifyRejectBtn").on("click", function () {
                page.logic.verifyAll("reject");
            });
            $("#AAA_Table").delegate(".btn-xs", "click", function () {
                var id = $(this).attr('data-row-id');
                var status = $(this).attr('data-row-status5');
                $.messager.confirm("操作提示", "您确定要执行操作吗？", function (data) {
                    if (data) {
                        var ids = [];
                        ids.push(id);
                        $.ajax({
                            url: page.location.verify,
                            type: "POST",
                            async: false,
                            data: {ids: ids.toString(), status: status},
                            success: function (response) {
                                if (response.code = '000000') {
                                    $.messager.alert("操作成功");
                                    page.logic.queryForPage();
                                }
                            }
                        })
                    }
                });
            });
            /*$("#btnSingleOk").on("click", page.logic.verifyOne);
             $("#btnSingleCancle").on("click", page.logic.verifyOne);*/
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
                    navigation: 2,
                    formatters: {
                        "operation": function (column, row) {
                            return "<button id=\"btnSingleOk\" type=\"button\" class=\"btn btn-xs btn-success glyphicon glyphicon-pencil\" data-row-id=\"" + row.id + "\" data-row-status='pass' onclick=\"verifyOne()\"/>" +
                                "&nbsp;&nbsp;&nbsp;&nbsp;<button id=\"btnSingleCancle\" type=\"button\" class=\"btn btn-xs btn-danger glyphicon glyphicon-remove-circle\" data-row-id=\"" + row.id + "\" data-row-status='reject' onclick=\"verifyOne()\"/>";
                        },
                        "content": function (column, row) {
                            return "<a href=\"javascript:void(0);\" data-toggle=\"tooltip\" title=\" " + row.content + "\">" + row.content + "</a>";
                        }
                    }
                });
                $("#AAA_Table").bootgrid("reload");
                $("#AAA_Panel").show();
            },
            verifyOne: function () {
                var id = $(this).attr('data-row-id');
                var status = $(this).attr('data-row-status5');
                $.messager.confirm("操作提示", "您确定要执行操作吗？", function (data) {
                    if (data) {
                        var ids = [];
                        ids.push(id);
                        $.ajax({
                            url: page.location.verify,
                            type: "POST",
                            async: false,
                            data: {ids: ids.toString(), status: status},
                            success: function (response) {
                                if (response.code = '000000') {
                                    $.messager.alert("操作成功");
                                    page.logic.queryForPage();
                                }
                            }
                        })
                    }
                });


            },
            verifyAll: function (status) {
                var ids = [];
                $('input[name="select"]:checked').each(function () {
                    if ("all" != $(this).val()) {
                        ids.push($(this).val());
                    }
                });
                if (ids.length == 0) {
                    $.messager.alert("警告", "请选择要操作的数据!");
                    return;
                }
                $.messager.confirm("提示", "您确定要执行操作吗？", function () {
                    $.ajax({
                        url: page.location.verify,
                        type: "POST",
                        async: false,
                        data: {ids: ids.toString(), status: status},
                        success: function (response) {
                            if (response= '000000') {
                                $.messager.alert("操作成功");
                                page.logic.queryForPage();
                            }
                        }
                    });
                });

            }
        }

    }

    page.init();
});
