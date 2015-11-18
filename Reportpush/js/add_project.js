$(document).ready(function() {
	AV.initialize('LxpfQik9wwJivKv9dygidXCM', 'uHVT6193PNbwx6Wf5NnExCF5');
	test();
});


function test(){
var Manager = AV.Object.extend('Manager');
var query_manager = new AV.Query(Manager);
var manager01 = null;
query_manager.find({
	success: function(result) {
		for (var i = 0; i < result.length; ++i) {
			manager01 = result[i].get('username');
			//console.log(manager01);
			
	var HtmlString=	'<option style="width:200px">'+manager01+'</option>';
			
	$("#select_manager").append(HtmlString);
		
		}
	},
	error: function(error) {
		console.log(error);
	}

});

}
function save(){
	
	var m=$("#select_manager").find("option:selected").text();
	console.log(m);
	var Project = AV.Object.extend("Project");
	var project = new Project();
	var mm = document.getElementsByName('in');
   console.log(mm.length);
   if(mm[0].value==""|mm[1].value==""){
   	alert("Please fill out the complete!")
   }else{
   	
   	project.set("projectName",mm[0].value);
   	project.set("DELSM",mm[1].value);
   	project.set("manager",m);
   	 console.log(mm[1].value+"   "+mm[0].value);
   	   	project.save(null,{
   		success:function(){
   			//将此项目关系与manager绑定
   		//	link(m);
   				alert('successfully');
   				
   				
   				location.reload();
   		},
   		error:function(error){
   			console.log(error);
   			alert('Project has been in existence!')
   		}
   	});
   }
   
// function link(m){
// 	//m is the project's manager'
// 	
// 	
// 	
// 	
// }
 
   }


			
function cancel(){
	window.location.href="function.html";
}




