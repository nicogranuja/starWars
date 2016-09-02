$(document).ready(function() {
	"use strict";
	var maxNumberOfPeople = 0;
	swapiModule.getPeople(function(data) {
	    maxNumberOfPeople = data.count;
	    console.log("getting number of people = "+ data.count);
	});
	var maxNumberOfPlanets = 0;
	swapiModule.getPlanets(function(data) {
	    maxNumberOfPlanets = data.count;
	    console.log("getting number of planets = "+ data.count);
	});


	var $generalList = $('#generalList');
	var $content = $('#content');
	var $links = $('.generalOptions');
	var $table = $('#tableContent');
	//Dropdown lists
	var $dropDownPeople = $(".dropDownPeople");
	var $dropDownPlanets = $(".dropDownPlanets");
	//*******************************
	var $divContent = $('#divContent');
	var $spanInfo = $('#spanInfo');
	//arr that has all the dropdowns...keep adding as we develop
	var arrayDropDowns = [$dropDownPlanets, $dropDownPeople];

	//head rows for the table for people
	// var infoPeople = "<tr><th>Name</th><th>Gender</th> <th>Height</th><th>Mass</th></tr>";
	// var infoPlanets = "<tr><th>Name</th><th>Terrain</th> <th>Climate</th><th>Gravity</th><th>Population</th><th>Residents</th></tr>";
	// var infoPeople="";
	var infoPlanets="";
	var infoPeople="";

	//function will exclude the dropdown parameter and hide the rest of dropdowns.
	function hideTheRestDropDowns($notMe){
		for(var i=0; i < arrayDropDowns.length; i++){
			if(arrayDropDowns[i] == $notMe){//the one we exclude'
				//also show it.
				$notMe.show();
			}
			else{
				arrayDropDowns[i].hide();
			}
		}

	}
	//this function will create the drop down list with numbers
	function createDropDown(max, $dropDown){
	    for (var i=1;i<=max;i++){
	        $dropDown.append($('<option></option>').val(i).html(i))
	    }
	}
	//draw the planets
	function drawPlanets(planet){
		infoPlanets += "<tr>"+
			"<td><img src='/img/planets/"+ planet.name+ ".png' class='charactersIMG center-block'</td>"+
			"<td><b>Name: </b>"+ planet.name+"</td>"+
			"<td><b>Terrain: </b>"+ planet.terrain+"</td>"+
			"<td><b>Gender: </b>"+ planet.climate+"</td>"+
			"<td><b>Height: </b>"+ planet.gravity+" G's</td>"+
			"<td><b>Mass: </b>"+ planet.population+"</td>"+
			// "<td><b>Residents: </b>"+ planet.residents+"</td>"+
			"</tr>";

		$table.html(infoPlanets);
	}
	//draws the table for one person at the time
	function drawTablePeople(person){
		// console.log(person.name);
		infoPeople = $('#tableContent').html();
		infoPeople += "<tr>"+
			"<td><img src='/img/people/"+ person.name+ ".png' class='charactersIMG center-block'</td>"+
			"<td><b>Name: </b>"+ person.name+"</td>"+
			"<td><b>Gender: </b>"+ person.gender+"</td>"+
			"<td><b>Height: </b>"+ person.height+" Cm.</td>"+
			"<td><b>Mass: </b>"+ person.mass+" Kg.</td>"+
			"</tr>";

		$table.html(infoPeople);
	}
	//ajax for getting each planet
	function generatePlanets(numberOfPlanets){
		//for loop that will run for the number that comes from the drop down list
		for(var i=1; i <= numberOfPlanets; i++){
			$.get("http://swapi.co/api/planets/"+i+"/", {//gets the specific person
			}).done(function(planet) {
				drawPlanets(planet);//draws the row of info
			}).fail(function() {
				console.log('something went wrong in the ajaxForPeople()!');
			});
		}
		infoPlanets="";
	}
	//ajax for getting each person and displaying its info
	function generatePeople(numberOfPeople){
		// infoPeople="";
		$('#tableContent').html("");
		//for loop that will run for the number that comes from the drop down list
		for(var i=1; i <= numberOfPeople; i++){
			//if that fixes error of the API that does not have a 17 character
			if(i == 17)
				continue;
			$.get("http://swapi.co/api/people/"+i+"/", {//gets the specific person
			}).done(function(person) {	
				drawTablePeople(person);//draws the row of info
			}).fail(function() {
				console.log('something went wrong in the ajaxForPeople()!');
			});
		}
	}
	function ajaxForPlanets(){
		//dealing with drop downs make function
		createDropDown(maxNumberOfPlanets, $dropDownPlanets);
		hideTheRestDropDowns($dropDownPlanets);
		$spanInfo.text("Number of Planets");
		$divContent.show();

		// get the ajax request
		$.get("http://swapi.co/api/planets/", {	
		}).done(function(data) {
			$dropDownPlanets.on( "change", function(){
				generatePlanets($(this).val());
			});
			generatePlanets(1);
			$table.show();	
		}).fail(function() {alert('something went wrong in the ajaxForPeople()!');});
		//end of ajax request
		
	}
	//ajax that gets the number of people
	function ajaxForPeople(){
		createDropDown(maxNumberOfPeople, $dropDownPeople);
		hideTheRestDropDowns($dropDownPeople);
		$spanInfo.text("Number of Characters");
		$divContent.show();
	
		// get the ajax request
		$.get("http://swapi.co/api/people/", {	
		}).done(function(data) {
			$dropDownPeople.on( "change", function(){
				generatePeople($(this).val());
			});
			generatePeople(1);
			$table.show();	
		}).fail(function() {alert('something went wrong in the ajaxForPeople()!');});
		//end of ajax request
	}

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

	// get the ajax request
	$.get("http://swapi.co/api/", {	
	}).done(function(data) {
		//listens to the clicks on the anchor tags and sends its value to the function 
		$links.click(function(e){
			e.preventDefault();
			var $type = $(this).attr('value');
			//trying to maybe reset the content every time we click in the anchor tag
			// $divContent.html("<span id='spanInfo'></span><select class='1-100'></select>");
			$spanInfo.html("");
			$dropDownPeople.html("");
			$dropDownPlanets.html("");
			$('#tableContent').html("");
			$table.html("");
			linkClicked($type);

		});
	}).fail(function() {
		alert('something went wrong!');
	});
	//end of ajax request
	$table.hide();
	$divContent.hide();	
});