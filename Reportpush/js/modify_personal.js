
function load(){

	$(document).ready(function() {
		AV.initialize('LxpfQik9wwJivKv9dygidXCM', 'uHVT6193PNbwx6Wf5NnExCF5');		
	});
	
		var user_current=null;
	 	user_current=AV.User.current();
//		console.log(user_current);
	$("#entered").html(user_current.get('username'));
	}
	
window.onload=load;


function save_personal(){
	var mm = document.getElementsByName('in');
   	console.log(mm.length);
   	if(mm[1].value!=mm[2].value){
   		alert(" New passwords don't match");
   	}
   	
	else{
	
	var user = AV.User.current();
user.updatePassword(mm[0].value, mm[1].value,{
  success: function(){
    //更新成功
    alert("Update successfully!");
    window.location.href="index.html"
  },
  error: function(user, err){
    //更新失败
    console.dir(err);
    alert("Your current password is not correct!")
  }
});
}
}



function cancel(){
	 window.location.href="function.html"
}
