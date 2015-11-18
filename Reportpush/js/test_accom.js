
$(document).ready(function() {
	AV.initialize('LxpfQik9wwJivKv9dygidXCM', 'uHVT6193PNbwx6Wf5NnExCF5');
	test();
	
});


function form_accomplish() {
			
	var Project = AV.Object.extend('Project');
	var query_project = new AV.Query('Project');
	query_project.find({
		success: function(result) {
			console.log(result.length);
			for (var i = 0; i < result.length; ++i) {
				var project = result[i];
				search_member(project,function(pp,acco){
					console.log(pp.get("projectName")+": "+acco);
					pp.set('Accomplishments',acco);
					pp.save({
						success:function(){
							console.log(pp.get("projectName")+'successfully');
						},
						error:function(){
							console.log('error');
						}
					});
				});
			}



		},
		error: function(error) {
			console.log("error");
		}
	});


	function search_member(project,callback) {

		var Member = AV.Object.extend('Member');
		var query_member = new AV.Query('Member');
		query_member.equalTo('project', project.get('projectName'));
		query_member.find({
			success: function(result) {
				console.log(project.get('projectName') + " has member is :" + result.length);
				if (result.length > 0) {
					var accomplish='';
					for (var i = 0; i < result.length; ++i) {
						if (result[i].get('accom') != null) {
							accomplish+=result[i].get('name') + ":  " + result[i].get('accom')+'<br/>';
//							console.log(accomplish);
						}

					}
							console.log(accomplish);
							callback(project,accomplish);
				}

			},
			error: function(error) {
				console.log(error);
			}
		});

	}
}

//window.onload=test();