function cancel(){
	window.location.href="index.html";
}


function register(){
//得到注册的用户名 密码
	var username = document.getElementById("username");
	var pwd = document.getElementById("password");

	console.log(username.value);
	console.log(pwd.value);
	
	$(document).ready(function() {
		AV.initialize('LxpfQik9wwJivKv9dygidXCM', 'uHVT6193PNbwx6Wf5NnExCF5');
	});
	
		var user = new AV.User();
		user.set("username", username.value);
		user.set("password", pwd.value);
	

	user.signUp(null, {
  success: function(user) {
    // 注册成功，可以使用了.
    alert("注册成功！")
    window.location.href="index.html";
  },
  error: function(user, error) {
    // 失败了
    alert("Error: " + error.code + " " + error.message);
  }
});
	
}