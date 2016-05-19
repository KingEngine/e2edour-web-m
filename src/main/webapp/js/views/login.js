$(function() {
	var page = {
		init : function() {
			this.validate();
			//this.bindUI();
		},
		bindUI:function(){
			$("#loginBtn").on("click",page.login);
		},
		login:function(){
				/*var validate = $("#loginForm").data('bootstrapValidator').validate();
				if(validate.isValid()){
					$("#loginForm").attr("action", page.url.login);
					$("#loginForm").submit();
				}*/
		},
		validate : function() {
		  $('#loginForm').bootstrapValidator({
		    feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
			fields : {
				name : {
					validators : {
						notEmpty : {
							message : '请填写用户名'
						}
					}
				},
				pwd: {
	                validators: {
	                    notEmpty: {
	                        message: '请输入密码'
	                    }
	                }
	            }
			}
		});
	  }
	}
	page.init();
});
