$(document).ready(function() {
	AV.initialize('LxpfQik9wwJivKv9dygidXCM', 'uHVT6193PNbwx6Wf5NnExCF5');
	tt();
});


function tt() {
	var Project = AV.Object.extend('Project');
	var query_project = new AV.Query(Project);
	var project = null;
	query_project.find({
		success: function(result) {
			for (var i = 0; i < result.length; ++i) {
				project = result[i].get('projectName');
				//console.log(manager01);

				var HtmlString = '<option style="width:200px">' + project + '</option>';

				$("#select_project").append(HtmlString);

			}
		},
		error: function(error) {
			console.log(error);
		}

	});

}

function linkage() {

	var m = $("#select_project").find("option:selected").text();
	console.log(m);

	var Project = AV.Object.extend('Project');
	var query_P_info = new AV.Query(Project);
	query_P_info.equalTo("projectName", m);
	query_P_info.find({
		success: function(result) {
			//result.get("DELSM");
			console.log(result[0].get("DELSM"));
			console.log(result[0].get("manager"));
			$("#sm").html(result[0].get("DELSM"));
			$("#gdc").html(result[0].get("manager"));
		},
		error: function(error) {
			console.dir(error);
		}
	});


}




function deleted() {
	var m = $("#select_project").find("option:selected").text();
	console.log(m);




	var Project = AV.Object.extend('Project');
	var query_P_info = new AV.Query(Project);
	query_P_info.equalTo("projectName", m);
	query_P_info.find({
		success: function(result) {

			var rs = result[0];
//			console.log(rs.get("DELSM"));
//			console.log(rs.get("manager"));
				console.log(result.length);
			AV.Object.destroyAll(result).then(function(object){
				console.log("在Project中删除成功");
				alert("删除成功");
				location.reload();
			},function(error){});

		},
		error: function(error) {
			console.dir(error);
		}
	});
	
	
var Member = AV.Object.extend('Member');
	var query_mp_info = new AV.Query(Member);
	query_mp_info.equalTo('project',m);
	query_mp_info.find({
		success:function(result){
			if(result.length>0){
				AV.Object.destroyAll(result).then(function(object){
				console.log("在Member中删除成功");
				//alert("删除成功");
				//location.reload();
			},function(error){});
			}
		},
		error:function(error){
			
		}
	});
}

function cancel(){
	window.location.href="function.html";
}
