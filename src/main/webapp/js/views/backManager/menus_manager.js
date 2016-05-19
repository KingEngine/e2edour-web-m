$(function () {
    var page = {
        location: {
            queryForPage: "/settingManger/backManager/menusManager/queryForPage",
            addData: "/settingManger/backManager/menusManager/addData",
            deleteData: "/settingManger/backManager/menusManager/deleteData",
            queryOne: "/settingManger/backManager/menusManager/queryOne",
            updateData: "/settingManger/backManager/menusManager/updateData"
        },
        init: function () {
            this.bindUI();
        },
        bindUI: function () {
            $("#searchBtn").on("click", page.logic.queryForPage);
            $("#showAddDataDivBtn").on("click", page.logic.showAddDataDiv);
            $("#addDataBtn").on("click", page.logic.addData);
            $("#updateDataBtn").on("click", page.logic.updateData);
        },
        logic: {
            queryForPage: function () {
                $("#AAA_Table").bootgrid({
                    ajax: true,
                    url: page.location.queryForPage,
                    formatters: {
                        "operation": function (column, row) {
                            return "<i class=\"btn btn-xs btn-success glyphicon glyphicon-pencil\" data-row-id=\"" + row.id + "\" />" +
                                "&nbsp;&nbsp;&nbsp;&nbsp;<i  class=\"btn btn-xs btn-danger glyphicon glyphicon-remove-circle\" data-row-id=\"" + row.id + "\" />"
                        }
                    }
                }).on("loaded.rs.jquery.bootgrid", function () {
                    $(".glyphicon-pencil").on("click", function (e) {
                        var id = $(this).data("row-id");
                        $.ajax({
                            url: page.location.queryOne,
                            type: "POST",
                            async: false,
                            data: {id: id},
                            success: function (response) {
                                if (response.code = '000000') {
                                    var obj = response.obj;
                                    console.log(obj);
                                    $("#update_id").val(obj.id);
                                    $("#update_name").val(obj.name);
                                    $("#update_menuId").val(obj.menuId);
                                    $("#update_url").val(obj.url);
                                    $("#updateDataDiv").modal('show');
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
            showAddDataDiv: function () {
                $("#addDataDiv").modal('show');
            },
            addData: function () {
                $.ajax({
                    url: page.location.addData,
                    type: "POST",
                    async: false,
                    data: $("#addDataForm").serialize(),
                    success: function (response) {
                        if (response.code = '000000') {
                            $("#addDataDiv").modal('hide');
                            $.messager.alert("添加成功");
                            page.logic.queryForPage();
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
                        if (response.code = '000000') {
                            $("#updateDataDiv").modal('hide');
                            $.messager.alert("修改成功");
                            page.logic.queryForPage();
                        }
                    }
                });
            }
        }


    }
    page.init();
});
