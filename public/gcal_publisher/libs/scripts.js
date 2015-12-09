var courses = [];


var createHTMLList = function(parent, listId) {

	var listContainer = document.createElement("div");
	if (listId != "") {
		listContainer.id = listId;
	}

	parent.appendChild(listContainer);

	var listElement = document.createElement("ul");
	listContainer.appendChild(listElement);

	return listElement;
};



var display = function() {
	var disp = document.getElementById("display");

	//clear the display div
	disp.innerHTML = "";

	var courseList = createHTMLList(disp, "courses");
	var numCourses = courses.length;

	for ( i = 0; i < numCourses; i++) {

		var courseItem = document.createElement("li");
		var currCourse = courses[i];
		courseList.appendChild(courseItem);
		courseItem.innerHTML = currCourse.name;

		var assignmentList = createHTMLList(courseItem, "");
		var numAssignments = courses[i].assigns.length;

		for ( j = 0; j < numAssignments; j++) {

			var assignmentHeader = document.createElement("li");
			var currAssignment = courses[i].assigns[j];
			assignmentList.appendChild(assignmentHeader);
			assignmentHeader.innerHTML = "Assignment";

			var assignInfoList = createHTMLList(assignmentHeader, "");

			var aName = document.createElement("li");
			var aDate = document.createElement("li");
			var aWeight = document.createElement("li");

			aName.innerHTML = currAssignment.name;
			aDate.innerHTML = currAssignment.date;
			aWeight.innerHTML = currAssignment.weight;

			assignInfoList.appendChild(aName);
			assignInfoList.appendChild(aDate);
			assignInfoList.appendChild(aWeight);

		}

	}

};



var numCourses = 0;

var newCourse = function() {

	numCourses++;

	//get course name from input
	var cName = $("#courseInput").val();

	if (!/\S/.test(cName)) {
		// string is empty or just whitespace
		return;
	}

	//create new accordion with name in heading
	var accordion = $("#accordion");
	var exampleCourse = document.getElementById("course_example");

	var newCourse = exampleCourse.cloneNode(true);
	newCourse.id = "course" + numCourses;
	newCourse.setAttribute("style", "");
	//remove the display none from the copied, hidden example course
	
	
	accordion.first().append(newCourse);
	

	//find the heading of the new course
	var title = $("#course" + numCourses).find("a");
	title.text(cName);

	title.attr("data-toggle", "collapse");
	title.attr("href", "#collapse" + numCourses);

	//find the body of the collapse box
	var body = $("#course" + numCourses).find("div:last-of-type");
	//console.log(body);
	body.attr("id", "collapse" + numCourses);
	
	$( ".dp" ).datepicker();
	
	$(".dp").mousedown(function(){
		$(".dp").datepicker('hide');
	});

};



$("document").ready(function() {


	$("#course_example").hide();
	//$('#datetimepicker1').datetimepicker();
	
	/*
	$(function() {
	  // Generic selector to be used anywhere
	  $(".js-scroll-to").click(function(e) {

		var destination = $(this)
		console.log(destination.text())

		// Animate scroll to destination
		$('#content').animate({
		  scrollTop: $(destination).offset().top
		}, 2000);
	  });
	});
	*/
	
	newCourse();
	$( ".dp" ).datepicker();
	
	$(".dp").mousedown(function(){
		$(".dp").datepicker('hide');
	});
	

});


var deleteCourse = function(course) {
	course.parentNode.removeChild(course);
};


var deleteAssignment = function(assign) {
	assign.parentNode.removeChild(assign);
};


var newAssignment = function(assignBody) {
	var exampleAssign = document.getElementById("assign0-0");

	var newAssign = exampleAssign.cloneNode(true);
	newAssign.id = "";
	var insertPlace = $(assignBody).children().last();
	$(newAssign).insertBefore(insertPlace)
	$( ".dp" ).datepicker();
	
	$(".dp").mousedown(function(){
		$(".dp").datepicker('hide');
	});
	
};

var fullYear = new Date().getFullYear();

var getCourseTitles = function(){
	
	var disp = document.getElementById("display");
	//clear the display div
	disp.innerHTML = "";
	
	var  titles = $(".panel-title").find("a");
	
	//i=1 : ignore the cloning course
	for(i=1; i < titles.length; i++){
		
		disp.innerHTML += titles[i].innerHTML + "<br/></br>";
		
		
		
	}
	
	
};






var getCourseElements = function(){
	
	//clear data array
	courses = []
	
	//Courses
	var courses_elements = $(".panel");
	var numCourses = courses_elements.length;
	var cTitles = $(".panel").find(".panel-title a");
	
	for(i=1;i<numCourses; i++){
		
		var currCourse = courses_elements[i];
		var assignments = $(currCourse).find(".assignment");
		var numAssigns = assignments.length;
		
		var assigns = []
		for(j=0; j < numAssigns; j++){
			
			var curAssign = $(assignments[j]);
			var curAssignData = $(curAssign).find("input");
			//console.log($(curAssignData))
			//console.log(curAssignData.eq(0).val());
			//console.log(curAssignData.eq(1).val());
			//console.log(curAssignData.eq(2).val());
			
			//create assign obj
			var assign = {
				name: curAssignData.eq(0).val(),
				date: curAssignData.eq(1).val(),
				weight: curAssignData.eq(2).val(),
			}
			
			assigns.push(assign);
			
		}
		
		
		var course = {
			name: cTitles[i].innerHTML,
			assigns: assigns
		}
		courses.push(course);

		
	}
	
	console.log(courses)
	
};





