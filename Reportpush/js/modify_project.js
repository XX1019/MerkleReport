$(document).ready(function() {
	AV.initialize('LxpfQik9wwJivKv9dygidXCM', 'uHVT6193PNbwx6Wf5NnExCF5');
	//在开始时加载Project和Member的下拉框的值
	tt();
	link_member();
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

function link_member() {
	$('#about_member').length;
	var User = AV.Object.extend('User');
	var query_user = new AV.Query(User);
	var user = null;
	query_user.find({
		success: function(result) {
		//	console.log($('.add_member').length);
			
			for (var i = 0; i < result.length; ++i) {
				user = result[i].get('username');
				//console.log(manager01);
				var HtmlString = '<option style="width:150px">' + user + '</option>';
				$("#about_member  p:last-child").children('select').append(HtmlString);

			}
		},
		error: function(error) {
			console.log(error);
		}

	});
}

////点击Project下拉框 触发事件
function linkage() {
	var m = $("#select_project").find("option:selected").text();
	console.log(m);
	link_project(m);
	link_deleteM();
	
}


//点击下拉框的ＶＡＬＵＥ　　获得相应的项目信息
function link_project(m){
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

function link_deleteM(){
	var m = $("#select_project").find("option:selected").text();
	$('.member_has').html('Team Member(s):');
	$('.d_m option:eq(0)').nextAll().remove();
	var Member = AV.Object.extend('Member');
	var query_M_info = new AV.Query(Member);
	query_M_info.equalTo('project',m)
	query_M_info.find({
		success: function(result) {
		console.log(result.length);
		if(result.length==0){
			$('.member_has').html('No member,Please add.');
		}else{
			
		for (var i=0;i<result.length;++i) {
			
			$('.member_has').append(result[i].get('name')+ "|");
			var m_name=result[i].get('name');

			var HtmlString = '<option style="width:150px">' + m_name + '</option>';
			$(".d_m").append(HtmlString);
		}
		}
			
		},
		error: function(error) {
			console.dir(error);
		}
	});

}



//function add_m() {
//
//	var htmlstring = '<p><label>member : </label><select name="add_member" ><option style="width:200px">---Please Choose--</option></select><input type="button" class="minus" onclick="delete_m()"/></p>'
//	$("#about_member").append(htmlstring);
//
//	link_member();
//	//console.log($('.add_member').length);
//}

//function delete_m() {
//	$("#about_member  p:last-child").remove();
//
//}



function cancel() {
	window.location.href = "function.html";
}

//function get_member(){
//	var m=$(".add_member").find("option:selected").text();
//	console.log(m);
//}
//点击修改按钮  触发事件
function modify_p(){
	//project.value
	var m = $("#select_project").find("option:selected").text();
	console.log(m);	
	//member.value
  	var mm= $('.add_member').find("option:selected").text();
   	//将添加的member存入leancloud
	if(mm!='---Please Choose--'&m!='---Please Choose--'){
	var Member = AV.Object.extend("Member");
	var member=new Member();
   	member.set('name',mm);
   	member.set('project',m);
   	member.save(null,{
   			success:function(){
   				alert('Add member successfully!');
   				console.log($('.member_has').html());
   				if($('.member_has').html()=='No member,Please add.'){
   					$('.member_has').html('Member as follow :');
   				}
   				
			$(".d_m").append('<option style="width:150px">' + mm + '</option>');
   				$('.member_has').append(mm+"|");
   				$('.add_member').find("option[text='---Please Choose--']").attr('selected','selected');
   				$('.add_member').val('please');
   			},
   			error:function(){
   				alert('Member has been in existence!');
   			}
   		
   			
   		});	
   	
   
}
  else{
  	alert('Select none!');
  }
}
//delete Member	
function de_m(){
	
	var  me= $(".d_m").find("option:selected").text();
	var p = $("#select_project").find("option:selected").text();
	if(me!='---Please Choose--'&p!='---Please Choose--'){
	var Member = AV.Object.extend("Member");
	var query_me=new AV.Query(Member);
	query_me.equalTo('project',p);
	query_me.find({
		success:function(result){
			for (var i=0;i<result.length;++i) {
				console.log(result.length);
				var rs = result[i];
				if(rs.get('name')==me){
					console.log(rs.get('name'));
					rs.destroy({
									
						success: function(rs) {
    // 对象的实例已经被删除了.
    console.log('success');
    alert("Delete member successfully!");
    link_deleteM();
    
  },
  error: function(rs, error) {
    // 出错了.
       console.log('delete error');
       alert("Delete failed");
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
	else{
		alert('Select None!');
	}
}
