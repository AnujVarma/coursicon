function main() {
	var majorId = $("#major-id").attr("data-id");

	$.ajax({
	  type: 'GET',
	  url: '/api/majors/' + majorId,
	  success: function(data){
	  	nameList = successFn(data);
	  	$(".form-control").each(function(){
	    	$(this).autocomplete({ 
	    		source: nameList 
	    	});
		});
	  }
	});

	function successFn(data){
		var courseList = data.courses;
		var names = [];
		for(i=0;i<courseList.length;i++){
			course = courseList[i];
			names[i] = course.name;
		}
		return names;
	}
}

$(document).ready(main)