$(document).ready(function() {
	AV.initialize('LxpfQik9wwJivKv9dygidXCM', 'uHVT6193PNbwx6Wf5NnExCF5');
	test();
});

// 显示该用户存在的Project  仅仅是为member的project
function test() {
	var user_current = null;
	user_current = AV.User.current();
	var user = user_current.get('username');
	console.log(user);


	var Member = AV.Object.extend('Member');
	var query_m_p = new AV.Query(Member);
	query_m_p.equalTo('name', user);
	query_m_p.find({
		success: function(result) {
			console.log("Member" + result.length);
			if (result.length > 0) {

				for (var i = 0; i < result.length; ++i) {
					var p = result[i].get('project');
					console.log(p);
					var htmlstring = '<option>' + p + '</option>';
					$('.belongP').append(htmlstring);
				}
			}

		},
		error: function(error) {
			console.log('error');
		}

	});

	var Project = AV.Object.extend('Project');
	var query_p_m = new AV.Query(Project);
	query_p_m.equalTo('manager', user);
	query_p_m.find({
		success: function(result) {
			console.log("manger:" + result.length);
			if (result.length > 0) {

				for (var i = 0; i < result.length; ++i) {
					var p = result[i].get('projectName');
					console.log(p);
					var count = $(".belongP").length;

					for (var i = 0; i < count; i++) {
						if ($(".belongP ").options[i].text != p) {
							var htmlstring = '<option>' + p + '</option>';
							$('.belongP').append(htmlstring);
						}
					}
				}
			}
		},
		error: function(error) {
			console.log('error');
		}
	});

}


function link_p() {
	var m = $(".belongP").find("option:selected").text();
	console.log(m);
	link_project(m);
	link_member(m);

}

function link_project(m) {
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

function link_member(m) {
	var user_current = null;
	user_current = AV.User.current();
	var user = user_current.get('username');
	console.log(user);
	var Member = AV.Object.extend('Member');
	var query_member = new AV.Query(Member);
	query_member.equalTo('project', m);
	query_member.find({
		success: function(result) {
			if (result.length > 0) {

				for (var i = 0; i < result.length; ++i) {
					if (result[i].get('name') == user) {

						var mem = result[i];
//						console.log(mem.get('allocated'));
//						console.log(mem.get('actual'));
//						console.log(mem.get('accom'));
						var accom= mem.get('accom');
						var reg=new RegExp("<br/>","g"); 
						accom = accom.replace(reg,'\r\n');
						console.log(accom);
						$('.allocated_f').html(mem.get('allocated'));
						$('.actual_f').html(mem.get('actual'));
						$('.load').val(mem.get('workload'));
						$('.textarea').val(accom);
					}
				}
			}
		},
		error: function(error) {


		}
	});
}



function compare() {
	var allocated = $('.allocated_l').val();
	var actual = $('.actual_l').val();
	console.log(allocated);
	console.log(actual);
	
	if (parseInt(actual)/parseInt(allocated)<=0.5) {
		$('.load').val('Low');
	}
	if (parseInt(actual)/parseInt(allocated)>0.5&&parseInt(actual)/parseInt(allocated)<=1.1) {
		$('.load').val('Medium');
	}
	if (parseInt(actual)/parseInt(allocated)>1.1) {
		$('.load').val('High');
	}
}

function submit_y() {
	var allocated = $('.allocated_l').val();
	var actual = $('.actual_l').val();
	var workload = $('.load').find('option:selected').text();
	//to solve accomplishment change line
	var accom = $('.textarea').val().replace(/\n/g, '_@').replace(/\r/g, '_#');
	accom = accom.replace(/_@/g, '<br/>');
	 
//	console.log(accom);
	var m = $(".belongP").find("option:selected").text();
	console.log(workload + allocated + actual);
	if (m == '---Please choose--') {
		alert('Please Select Project!');
	} else {
		if (allocated == "" | actual == "") {
			alert('Please fill out!');
		} 
		else {
//		if(allocated.endsWith("%")==false){
//			allocated=allocated+"%";
//		}
//			if(actual.endsWith("%")==false){
//			actual=actual+"%";
//		}
//			actual.substr(actual.length-1,1)
	if(allocated.substr(allocated.length-1,1)!='%'){
			allocated=allocated+"%";
		}
			if(actual.substr(actual.length-1,1)!='%'){
			actual=actual+"%";
		}
		
			var user_current = null;
			user_current = AV.User.current();
			var user = user_current.get('username');
			var Member = AV.Object.extend('Member');
			var query_member = new AV.Query(Member);
			query_member.equalTo('project', m);
			query_member.find({
				success: function(result) {
					if (result.length > 0) {

						for (var i = 0; i < result.length; ++i) {
							if (result[i].get('name') == user) {

								var mem = result[i];
								mem.set('allocated', allocated);
								mem.set('actual', actual);
								mem.set('workload', workload);
								mem.set('accom',accom);
								mem.save(null, {
									success: function() {
										alert('Submit successfully!');
										//location.reload();
										window.location.href="make.html";
									},
									error: function() {
										console.log("Sumbit failed!");
									}
								})


							}
						}
					}
				},
				error: function(error) {


				}
			});
		}
	}

}



function cancel() {
	window.location.href = "function.html";
}
//set mouse location
//		function s(e,a)
//	{
//		 if ( e && e.preventDefault )
//	            e.preventDefault();
//		else 
//		window.event.returnValue=false;
//			a.focus();
//			
//	}