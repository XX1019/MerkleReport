
//return to function.html
function goback(){
	window.location.href="function.html";
}

//send email
function send(){

	$("#href").attr("href","mailto:?subject=Weekly report &body="); 
	
	
}

////copy the table
//function CopyTable() 
//
//{ 
//  var clip = new ZeroClipboard.Client(); // 新建一个对象
//  clip.setHandCursor( true );
//  var sa=$('#hey').html();
//  
//  clip.setText(sa); // 设置要复制的文本。
//  clip.addEventListener( "mouseUp", function(client) {
//      alert("复制成功！");
//  });
//  clip.glue("send"); // 和上一句位置不可调换
//} 


//if you are manager,if not you have no permission
//search all projects' information
function get_all(){
	
	var user_current = null;
	user_current = AV.User.current();
	var user = user_current.get('username');
	var Manager = AV.Object.extend('Manager');
	var query_is_mananger = new AV.Query('Manager');
	query_is_mananger.equalTo('username',user);
	query_is_mananger.find({
		success:function(result){
			console.log(result.length);
			if(result.length==0){
				alert("Sorry,You don't have permission!");
			}
			else{
				$('#hey tr:eq(0)').nextAll().remove();
	var Project = AV.Object.extend('Project');
	var query_project = new AV.Query('Project');
	query_project.find({
		success:function(result){
			//console.log(result.length);
			for (var i = 0; i < result.length; ++i) {
				var project = result[i];
				get_member(project);
			}
		},
		error:function(error){
			console.log(error);
		}
	});
	function get_member(project,callback){
		
					        var Member = AV.Object.extend('Member');
							var query_m = new AV.Query('Member');
							query_m.equalTo('project',project.get('projectName'));
							query_m.find({
								success:function(result){
									if(result.length==0){
										var htmlstr='<tr><td>' + project.get('projectName') + '</td><td>' + project.get('DELSM') + '</td><td>' + project.get('manager') + '</td><td></td><td></td><td></td><td></td><td></td></tr>';
									$('#hey').append(htmlstr);
										//	console.log(result.length);
									}
									if(result.length>0){
var htmlstr='<tr><td rowspan="' + result.length + '">' + project.get('projectName') + '</td><td rowspan="' + result.length + '">' + project.get('DELSM') + '</td><td rowspan="' + result.length + '">' + project.get('manager') + '</td><td>'+result[0].get('name')+'</td><td>'+result[0].get('allocated')+'</td><td>'+result[0].get('actual')+'</td><td>'+result[0].get('workload')+'</td><td rowspan="' + result.length + '">'+project.get('Accomplishments')+'</td></tr>';

									$('#hey').append(htmlstr);
										
										if(result.length>1){
											console.log(result.length);
											for(var i=1;i<result.length;++i){
var htmlstr='<tr><td>'+result[i].get('name')+'</td><td>'+result[i].get('allocated')+'</td><td>'+result[i].get('actual')+'</td><td>'+result[i].get('workload')+'</td></tr>';
									$('#hey').append(htmlstr);
											}

										}
			
									}

								},
								error:function(error){
									console.log(error);
								}
							});
}
			}
		},
		error:function(error){
			console.log(error);
		}
	});
	
	
}



$(document).ready(function() {
	AV.initialize('LxpfQik9wwJivKv9dygidXCM', 'uHVT6193PNbwx6Wf5NnExCF5');
	form_accomplish()
	test();//get which projrct that user belong to 
	get_asManager();//get which project that user mamnge 
});

//get all member's accomplishment into project's accomplishments
function form_accomplish() {
			
	var Project = AV.Object.extend('Project');
	var query_project = new AV.Query('Project');
	query_project.find({
		success: function(result) {
			//console.log(result.length);
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
							accomplish+=result[i].get('name') + ":  <br/>" + result[i].get('accom')+'<br/>';
//							console.log(accomplish);
						}

					}
							//console.log(accomplish);
							callback(project,accomplish);
				}

			},
			error: function(error) {
				console.log(error);
			}
		});

	}
}

// 显示该用户存在的Project  
function test() {
	//	var project_delsm = null;
	//	var project_gdc = null;
	//	var project_accomplish = null;
	//	var project_delsm = null;
	//	var project_name=null;
	//	var member_count = null;

	var user_current = null;
	user_current = AV.User.current();
	var user = user_current.get('username');
	//console.log("current user name is " + user);


	var Member = AV.Object.extend('Member');
	var query_m_p = new AV.Query(Member);
	query_m_p.equalTo('name', user);
	query_m_p.find({
		success: function(result) {
			console.log("as Member of project is " + result.length + "times");
			if (result.length > 0) {

				for (var i = 0; i < result.length; ++i) {
					var p = result[i].get('project');
					//找出身为member所在的project
					console.log(p);
					//查找project的相关信息

					//查找member中 该project的member个数 及信息；
					search(p, function(JSONObject, project) {	
						console.log(JSONObject);
						var members = $.parseJSON(JSONObject);
						console.log(members.member);
						console.log("member.length= " + members.member.length);
						member_count = members.member.length;
						//						console.log(members.member[0].name);
						show(members.member, project, function(p_info, all_member) {
							var all_member_count = all_member.length;
							console.log(p_info.get('DELSM'));
							console.log(p_info.get('manager'));
							console.log(p_info.get('Accomplishments'));
							var project_delsm = p_info.get('DELSM');
							var project_gdc = p_info.get('manager');
							var project_accomplish = p_info.get('Accomplishments');
							var project_name = p_info.get('projectName');
							//							console.log("adjsjaldlasda");
							if (all_member_count == 0) {
								var htmlString = '<tr><td>' + project_name + '</td><td>' + project_delsm + '</td><td>' + project_gdc + '</td><td></td><td></td><td></td><td></td><td></td></tr>';
								//这个project没有member的情况要单独写一个html字符串
								$("#hey").append(htmlString);
							}
							if (all_member_count > 0) {
								var member0 = all_member[0];
								//								console.log(members.member[0].name);
								var htmlstring = '<tr><td name="project" rowspan="' + all_member_count + '">' + project_name + '</td ><td rowspan="' + all_member_count + '">' + project_delsm + '</td><td rowspan="' + all_member_count + '">' + project_gdc + '</td><td>' + member0.name + '</td><td>' + member0.allocated + '</td><td>' + member0.actual + '</td><td>' + member0.workload + '</td><td rowspan="' + all_member_count + '">' + project_accomplish + '</td></tr>';
								//console.log(htmlstring);
								$('#hey').append(htmlstring);


								if (all_member_count > 1) {
									for (var i = 1; i < all_member_count; ++i) {
										var memberi = all_member[i];
										//										console.log(members.member[i].name + members.member[i].allocated);
										var htmlstring = '<tr><td>' + memberi.name + '</td><td>' + memberi.allocated + '</td><td>' + memberi.actual + '</td><td>' + memberi.workload + '</td></tr>'
										console.log(htmlstring);
										$('#hey').append(htmlstring);
									}
								}



							}


							//							var htmlstring = '<tr><td name="project" rowspan="' + member_count + '">' + p + '</td ><td rowspan="' + member_count + '">' + project_delsm + '</td><td rowspan="' + member_count + '">' + project_gdc + '</td><td rowspan="' + member_count + '">' + project_accomplish + '</td></tr>';
							//
							//							console.log(htmlstring);
							//							$('#hey').append(htmlstring);

						});


					});
					//											console.log("member.length= "+member_count);






				}
			}

		},
		error: function(error) {
			console.log('error');
		}

	});

}



function show(members, p, callback) {
	var p_info = null;
	var Project = AV.Object.extend('Project');
	var query_project = new AV.Query("Project");
	query_project.equalTo('projectName', p);
	query_project.find({
		success: function(result) {
			//console.log(result.length);
			if (result.length > 0) {
				p_info = result[0];
				//				console.log(p_info.get('DELSM'));
				//				console.log(p_info.get('manager'));
				//				console.log(p_info.get('Accomplishments'));
			}
			callback(p_info, members);
		},
		error: function(error) {
			console.log(error);
		}
	});

}

function search(p, callback) {
	var member_length = null;
	var member = null;
	//console.log(p);
	var jsonObject = '{"projectName":"' + p + '","member":[';
	var Member = AV.Object.extend('Member');
	var query_member = new AV.Query('Member');
	query_member.equalTo('project', p);
	query_member.find({
		success: function(result) {
			member_length = result.length;
			//console.log(member_length);

			if (member_length > 0) {
				for (var i = 0; i < member_length; i++) {
					member = result[i];
					var memberJSON = '{"name":"' + member.get('name') + '","allocated":"' + member.get('allocated') + '","actual":"' + member.get('actual') + '","workload":"' + member.get('workload') + '"}';
					//					console.log(member.get('name'));
					//					console.log(member.get('allocated'));
					//					console.log(member.get('actual'));
					jsonObject += memberJSON;
					if (i < member_length - 1) {
						jsonObject += ',';
					}
				}
			}
			jsonObject += ']}';
			callback(jsonObject, p);
		},
		error: function(error) {
			console.log(error);
			callback(undefined);
		}
	});


}



function get_asManager() {
	var user_current = null;
	user_current = AV.User.current();
	var user = user_current.get('username');
	//console.log(user);
	var pro = document.getElementsByName('project');
	console.log("has exist project is :" + pro.length);
	//console.log(pro);
	var Project = AV.Object.extend('Project');
	var query_p_m = new AV.Query(Project);
	query_p_m.equalTo('manager', user);
	query_p_m.find({
		success: function(result) {
			console.log("as manger project is :" + result.length);
			if (result.length > 0) {
				for (var i = 0; i < result.length; ++i) {
					var p_name = result[i];
					//as manager has projects
				//	console.log(p_name.get('projectName'));

					lp_member(p_name, user, function(ismember,projName) {
						console.log(projName.get('projectName') + " is member ?:" + ismember);
						
						if(ismember==false){
							console.log("Manager project name is "+projName.get('projectName'));
							//present as manager project that not as member.
							//search table Member, get the members of the project
							var Member = AV.Object.extend('Member');
							var query_m = new AV.Query('Member');
							query_m.equalTo('project',projName.get('projectName'));
							query_m.find({
								success:function(result){
									if(result.length==0){
										var htmlstr='<tr><td>' + projName.get('projectName') + '</td><td>' + projName.get('DELSM') + '</td><td>' + projName.get('manager') + '</td><td></td><td></td><td></td><td></td><td></td></tr>';
									$('#hey').append(htmlstr);
											console.log(result.length);
									}
									if(result.length>0){
var htmlstr='<tr><td rowspan="' + result.length + '">' + projName.get('projectName') + '</td><td rowspan="' + result.length + '">' + projName.get('DELSM') + '</td><td rowspan="' + result.length + '">' + projName.get('manager') + '</td><td>'+result[0].get('name')+'</td><td>'+result[0].get('allocated')+'</td><td>'+result[0].get('actual')+'</td><td>'+result[0].get('workload')+'</td><td rowspan="' + result.length + '">'+projName.get('Accomplishments')+'</td></tr>';

									$('#hey').append(htmlstr);
										
										if(result.length>1){
											console.log(result.length);
											for(var i=1;i<result.length;++i){
var htmlstr='<tr><td>'+result[i].get('name')+'</td><td>'+result[i].get('allocated')+'</td><td>'+result[i].get('actual')+'</td><td>'+result[i].get('workload')+'</td></tr>';
									$('#hey').append(htmlstr);
											}

										}
			
									}

								},
								error:function(error){
									console.log(error);
								}
							});
							
						}
						
						
						
					});

				}
			}
		},
		error: function(error) {
			console.log('error');
		}
	});

}

function lp_member(p_name, user, callback) {

	//console.log(p_name.get('projectName'));
	var Member = AV.Object.extend('Member');
	var look_member = new AV.Query('Member');
	look_member.equalTo("project", p_name.get('projectName'));
	look_member.find({
		success: function(result) {
			var isMember = false;
			if (result.length > 0) {
				console.log(p_name.get('projectName') + "length = " + result.length);

				for (var i = 0; i < result.length; ++i) {
					var msm = result[i];
					if (msm.get('name') == user) {
						console.log("name equals");
						isMember = true;
					}
					console.log(p_name.get('projectName') + msm.get('name'));

				}

			}

			callback(isMember,p_name);


		},
		error: function(error) {
			console.log(error);
		}
	});


}