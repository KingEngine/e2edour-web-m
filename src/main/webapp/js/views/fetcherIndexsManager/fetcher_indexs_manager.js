$(function () {
    var page = {
        location: {
            queryForPage: "/fetcherIndexsManager/queryForPage",
            addData: "/fetcherIndexsManager/addData",
            deleteData: "/fetcherIndexsManager/deleteData",
            updateData: "/fetcherIndexsManager/updateData",
        },
        init: function () {
            this.bindUI();
        },
        bindUI: function () {
            $("#searchBtn").on("click", page.logic.search);
            $("#addBtn").on("click", page.logic.showAddDiv);
            $("#addDataBtn").on("click", page.logic.addData);
            $("#updateDataBtn").on("click", page.logic.updateData);
        },
        logic: {
            search: function () {
                $("#AAA_Table").bootgrid({
                    ajax: true,
                    url: page.location.queryForPage,
                    selection: true,
                    multiSelect: true,
                    rowSelect: true,
                    keepSelection: true,
                    navigation: 2,
                    formatters: {
                        "urls": function (column, row) {
                            var urls = row.urls;
                            var html = "";
                            for (var i = 0; i < urls.length; i++) {
                                html += urls[i];
                                html += "<br>";
                            }
                            return html;
                        },
                        "operation": function (column, row) {
                            return "<button type=\"button\" class=\"btn btn-xs btn-success glyphicon glyphicon-pencil\" data-row-id=\"" + row.id + "\" data-row-className=\"" + row.className + "\" data-row-urls=\"" + row.urls + "\"/>" +
                                "&nbsp;&nbsp;&nbsp;&nbsp;<button type=\"button\" class=\"btn btn-xs btn-danger glyphicon glyphicon-remove-circle\" data-row-id=\"" + row.id + "\" />";
                        }
                    }
                }).on("loaded.rs.jquery.bootgrid", function () {
                    $(".glyphicon-pencil").on("click", function (e) {
                        var id = $(this).attr("data-row-id");
                        var className = $(this).attr("data-row-className");
                        var urls = $(this).attr("data-row-urls");
                        $("#update_id").val(id);
                        $("#update_className").val(className);
                        $("#update_urls").val(urls);
                        $("#updateFetcherDiv").modal('show');
                    });
                    //删除事件
                    $(".glyphicon-remove-circle").on("click", function () {
                        var id = $(this).attr("data-row-id");
                        $.messager.confirm("提示", "确定删除该记录吗!", function () {
                            $.ajax({
                                url: page.location.deleteData,
                                type: "POST",
                                async: false,
                                data: {id: id},
                                success: function (response) {
                                    if (response.code = '000000') {
                                        $.messager.alert("删除成功");
                                        page.logic.search();
                                    }
                                }
                            });
                        });
                    });
                });
                $("#AAA_Table").bootgrid("reload");
                $("#AAA_Panel").show();
            },
            showAddDiv: function () {
                $("#addFetcherDiv").modal('show');
            },
            addData: function () {
                $.ajax({
                    url: page.location.addData,
                    type: "POST",
                    async: false,
                    data: $("#addDataForm").serialize(),
                    success: function (response) {
                        if (response == '000000') {
                            $("#addFetcherDiv").modal('hide');
                            $.messager.alert("添加成功");
                            page.logic.search();
                        }
                    }
                });
            },
            updateData: function () {
                $.ajax({
                    url: page.location.updateData,
                    type: "POST",
                    async: false,
                    data: $("#updateDataForm").serialize(),
                    success: function (response) {
                        if (response == '000000') {
                            $("#updateFetcherDiv").modal('hide');
                            $.messager.alert("修改成功");
                            page.logic.search();
                        }
                    }
                });
            }
        }

    }
    page.init();
});
