$(function () {
    var page = {
        location: {
            addData: "contentManager/eaasyManager/eaasyAdd/addData"
        },
        init: function () {
            this.bindUI();
        },
        bindUI: function () {
            $("#addDataBtn").on("click", page.logic.addData);
        },
        logic: {
            addData: function () {
                var title = $("#title").val();
                var content = UM.getEditor('eaasyEditor').getContent();
                $.ajax({
                    url: page.location.addData,
                    type: "POST",
                    async: false,
                    data: {title: title, content: content},
                    success: function (response) {
                        if (response.code = '000000') {
                            $.messager.alert("添加成功");
                        }
                    }
                });
            }
        }
    }
    page.init();
});
