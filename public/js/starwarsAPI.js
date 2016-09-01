$(document).ready(function() {
	"use strict";
	var maxNumberOfPeople = 87;
	var maxNumberOfPlanets = 61;


	//number used to check when the user selects a smaller number coming from a bigger one in the people dropdown list.
	var number = 1;


	var $generalList = $('#generalList');
	var $content = $('#content');
	var $links = $('.generalOptions');
	var $table = $('#tableContent');
	var $dropDownPeople = $(".1-100");
	var $divPeople = $('#divNumberPeople');
	var $peopleHeader = $('#hiddenPeopleHeaders');
	//head rows for the table for people
	var infoPeople = "<tr><th>Name</th><th>Gender</th> <th>Height</th><th>Mass</th></tr>";
	var infoPlanets = "";

	function ajaxForPlanets(){

	}
	//this function will create the drop down list with the numbers from 1 to 87
	function createDropDown(max){
	    for (var i=1;i<=max;i++){
	        $dropDownPeople.append($('<option></option>').val(i).html(i))
	    }
	}
	//old dropdown iffe
	// $(function(){
	//     for (var i=1;i<=87;i++){
	//         $dropDownPeople.append($('<option></option>').val(i).html(i))
	//     }
	// });
	//draws the table for one person at the time
	function drawTablePeople(person){
		console.log(person.name);
		infoPeople += "<tr>"+
			"<td><img src='/img/"+ person.name+ ".png' class='charactersIMG center-block'</td>"+
			"<td><b>Name: </b>"+ person.name+"</td>"+
			"<td><b>Gender: </b>"+ person.gender+"</td>"+
			"<td><b>Height: </b>"+ person.height+" Cm.</td>"+
			"<td><b>Mass: </b>"+ person.mass+" Kg.</td>"+
			"</tr>";

		$table.html(infoPeople);
	}

	//ajax for getting each person and displaying its info
	function generatePeople(numberOfPeople){
		var temp = number;//saves the last number
		number = numberOfPeople;//assigns it to the new number of people required to display
		//if loop if the new number is smaller than the old one we reset what we have and start over again
		if(temp < number){
			infoPeople = "<tr><th>Name</th><th>Gender</th> <th>Height</th><th>Mass</th></tr>";
		}
		//for loop that will run for the number that comes from the drop down list
		for(var i=1; i <= numberOfPeople; i++){
			//if that fixes error of the API that does not have a 17 character
			if(i == 17){
				continue;
			}
			$.get("http://swapi.co/api/people/"+i+"/", {//gets the specific person
			
			}).done(function(person) {
				drawTablePeople(person);//draws the row of info
			}).fail(function() {
				console.log('something went wrong in the ajaxForPeople()!');
			});
		}
		infoPeople="";
		
	}
	//ajax that gets the number of people
	function ajaxForPeople(){
		$divPeople.show();
		// get the ajax request
		$.get("http://swapi.co/api/people/", {
			
		}).done(function(data) {
			$dropDownPeople.on( "change", function(){
				generatePeople($(this).val());
			});
			generatePeople(1);
			createDropDown(maxNumberOfPeople);
			$table.show();
			$peopleHeader.show();
		}).fail(function() {
			alert('something went wrong in the ajaxForPeople()!');
		});
		//end of ajax request
	}
	// get the ajax request
	$.get("http://swapi.co/api/", {
		
	}).done(function(data) {
		//listens to the clicks on the anchor tags and sends its value to the function 
		$links.click(function(e){
			e.preventDefault();
			var $type = $(this).attr('value');
			linkClicked($type);
		});
	}).fail(function() {
		alert('something went wrong!');
	});
	//end of ajax request
	
	//flow control for our program whatever the user clicks on
	function linkClicked(type){
		switch(type){
			case 'people':
				console.log("inside people");
				ajaxForPeople();
				break;
			case 'planets':
				console.log("inside planets");
				ajaxForPlanets();
				break;
			case 'films':
				break;
			case 'species':
				break;
			case 'vehicles':
				break;
		}
	}
	$peopleHeader.hide();
	$table.hide();
	$divPeople.hide();


	//get planet 1
	// swapiModule.getPlanet(1,function(data) {
	//     console.log("planet 1", data);
	// });

});