//加载页面就加载该方法
//	var person=document.getElementById("enter_person");
//	person.innerText=data.name;
//var data = JSON.parse(localStorage.getItem('userinfo'));
//console.log("name:" + data.name + "\r password:" + data.pwd);




function load(){

	$(document).ready(function() {
		AV.initialize('LxpfQik9wwJivKv9dygidXCM', 'uHVT6193PNbwx6Wf5NnExCF5');		
	});
	
		var user_current=null;
	 	user_current=AV.User.current();
//		console.log(user_current);
	$("#enter_person").html(user_current.get('username'));
	}
	
window.onload=load;