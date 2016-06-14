$(function () {
    var page = {
        location: {
            queryForPage: "/topicsManager/checkedTopicsManager/queryForPage",
            deleteData: "/topicsManager/checkedTopicsManager/deleteData"
        },
        init: function () {
            $('[data-toggle="tooltip"]').tooltip();
            this.bindUI();
        },
        bindUI: function () {
            $("#searchBtn").on("click", page.logic.queryForPage);
            $("#btnDelete").on("click", page.logic.verifyAll);
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
                            return "&nbsp;&nbsp;&nbsp;&nbsp;<button data-verify=\"verify\" type=\"button\" class=\"btn btn-xs btn-danger glyphicon glyphicon-remove-circle\" data-row-id=\"" + row.id + "\"/>";
                        },
                        "content": function (column, row) {
                            return "<a href=\"javascript:void(0);\" class=\"alert-link\" data-toggle=\"tooltip\" data-placement=\"right\" title=\" " + row.content + "\">" + row.content + "</a>";
                        }
                    }
                }).on("loaded.rs.jquery.bootgrid", function () {
                    $('[data-toggle="tooltip"]').tooltip();

                    $('[data-verify="verify"]').on("click", function () {
                        var id = $(this).attr('data-row-id');
                        $.messager.confirm("操作提示", "您确定要执行操作吗？", function () {
                            var ids = [];
                            ids.push(id);
                            $.ajax({
                                url: page.location.deleteData,
                                type: "POST",
                                async: false,
                                data: {ids: ids.toString()},
                                success: function (response) {
                                    if (response.code = '000000') {
                                        $.messager.alert("操作成功");
                                        page.logic.queryForPage();
                                    }
                                }
                            })
                        })
                    });
                });
                $("#AAA_Table").bootgrid("reload");
                $("#AAA_Panel").show();
            },
            verifyAll: function () {
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
                        url: page.location.deleteData,
                        type: "POST",
                        async: false,
                        data: {ids: ids.toString()},
                        success: function (response) {
                            if (response == '000000') {
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
