$(document).ready(function() {
	"use strict";
	//getting the number of things from the API using wrapper swapi
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
	var maxNumberOfSpecies = 0;
	swapiModule.getAllSpecies(function(data) {
	    maxNumberOfSpecies = data.count;
	    console.log("getting number of Species = "+ data.count);

	});
	var maxNumberOfStarships = 0;
	swapiModule.getStarships(function(data) {
	    maxNumberOfStarships = data.count;
	    console.log("getting number of Starships = "+ data.count);
	});
	var maxNumberOfVehicles = 0;
	swapiModule.getVehicles(function(data) {
	    maxNumberOfVehicles = data.count;
	    console.log("getting number of Vehicles = "+ data.count);
	});
	var maxNumberOfFilms = 0;
	swapiModule.getFilms(function(data) {
	    maxNumberOfFilms = data.count;
	    console.log("getting number of Films = "+ data.count);
	});
	//////////////////************************** End of count *******////////////////
	var $content = $('#content');
	var $links = $('.generalOptions');
	var $table = $('#tableContent');
	//Dropdown lists
	var $dropDownPeople = $(".dropDownPeople");
	var $dropDownPlanets = $(".dropDownPlanets");
	var $dropDownStarships = $(".dropDownStarships");
	var $dropDownSpecies = $(".dropDownSpecies");
	var $dropDownVehicles = $(".dropDownVehicles");
	var $dropDownFilms = $(".dropDownFilms");
	//*******************************
	var $divContent = $('#divContent');
	var $spanInfo = $('#spanInfo');
	//arr that has all the dropdowns...keep adding as we develop
	var arrayDropDowns = [$dropDownPlanets, $dropDownPeople, $dropDownStarships, $dropDownSpecies, $dropDownVehicles, $dropDownFilms];
	//initial values shown at the beginning
	var initialNumberDisplayed = 5;
	//global that prints the table
	var infoPlanets="";
	var infoPeople="";
	var infoStarships="";
	var infoSpecies="";
	var infoVehicles="";
	var infoFilms="";
	////******************


	//function that deletes the characters that mess up the image loading on screen
	function IgnoreSpecialCharactersFromString(name){
		var answer = name.split("");
		
		for(var i=0; i < answer.length; i++){
			if(answer[i] == "/" || answer[i]== "'"){
				answer[i] = "";
			}
		}
		answer = answer.join("");
		console.log(answer);
		return answer;
	}
	//function clears info that needs to be reset every time.
	function clearInfo(){
		$spanInfo.html("");
		$dropDownPeople.html("");
		$dropDownPlanets.html("");
		$dropDownStarships.html("");
		$dropDownSpecies.html("");
		$dropDownVehicles.html("");
		$dropDownFilms.html("");
	}
	//function turns off all the listeners for the non-active anchor tags
	function turnOffListenersButCurrentOne($listener){
		for(var i=0; i < arrayDropDowns.length; i++){
			if(arrayDropDowns[i] == $listener){//the one we exclude'
				continue;
			}
			else{
				arrayDropDowns[i].off("change");
			}
		}
	}
	//function will exclude the dropdown parameter and hide the rest of dropdowns.
	function hideTheRestDropDowns($notMe){
		for(var i=0; i < arrayDropDowns.length; i++){
			if(arrayDropDowns[i] == $notMe){//the one we exclude'
				//also show it.
				$notMe.show();
				//setting up the initial value for the displayed elemens when user clicks
				$notMe.val(initialNumberDisplayed);
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
			"<td><img src='/img/planets/"+ IgnoreSpecialCharactersFromString(planet.name)+ ".png' class='charactersIMG center-block'</td>"+
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
		infoPeople = $('#tableContent').html();
		infoPeople += "<tr>"+
			"<td><img src='/img/people/"+ IgnoreSpecialCharactersFromString(person.name)+ ".png' class='charactersIMG center-block'</td>"+
			"<td><b>Name: </b>"+ person.name+"</td>"+
			"<td><b>Gender: </b>"+ person.gender+"</td>"+
			"<td><b>Height: </b>"+ person.height+" Cm.</td>"+
			"<td><b>Mass: </b>"+ person.mass+" Kg.</td>"+
			"</tr>";

		$table.html(infoPeople);
	}
	//draws the table for one specie at the time
	function drawTableSpecies(specie){
		infoSpecies = $('#tableContent').html();
		infoSpecies += "<tr>"+
			"<td><img src='/img/species/"+ IgnoreSpecialCharactersFromString(specie.name)+ ".png' class='charactersIMG center-block'</td>"+
			"<td><b>Name: </b>"+ specie.name+"</td>"+
			"<td><b>Classification: </b>"+ specie.classification+"</td>"+
			"<td><b>Designation: </b>"+ specie.designation+"</td>"+
			"<td><b>Average Lifespan: </b>"+ specie.average_lifespan+" Years.</td>"+
			"<td><b>Language: </b>"+ specie.language+"</td>"+
			"<td><b>Skin Colors: </b>"+ specie.skin_colors+"</td>"+
			//get the origin probably use swapi
			// "<td><b>Planet of Origin: </b>"+ specie.homeworld+"</td>"+
			"</tr>";

		$table.html(infoSpecies);
	}
	//draws the table for one vehicles at the time
	function drawTableVehicles(vehicle){
		infoVehicles = $('#tableContent').html();
		infoVehicles += "<tr>"+
			"<td><img src='/img/vehicles/"+ IgnoreSpecialCharactersFromString(vehicle.name)+ ".png' class='charactersIMG center-block'</td>"+
			"<td><b>Name: </b>"+ vehicle.name+"</td>"+
			"<td><b>Model: </b>"+ vehicle.model+"</td>"+
			"<td><b>Manufacturer: </b>"+ vehicle.manufacturer+" Years</td>"+
			"<td><b>Passengers: </b>"+ vehicle.passengers+"</td>"+
			"<td><b>Crew: </b>"+ vehicle.crew+"</td>"+
			"<td><b>Atmosphering Speed: </b>"+ vehicle.max_atmosphering_speed+" </td>"+
			"<td><b>Cost: </b>"+ vehicle.cost_in_credits+" Galactic credits</td>"+
			"<td><b>Length: </b>"+ vehicle.length+" Meters</td>"+
			"</tr>";

		$table.html(infoVehicles);
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
		infoPeople="";
	}
	//ajax for getting each specie and displaying its info
	function generateSpecies(numberOfSpecies){
		$('#tableContent').html("");
		//for loop that will run for the number that comes from the drop down list
		for(var i=1; i <= numberOfSpecies; i++){
			$.get("http://swapi.co/api/species/"+i+"/", {//gets the specific specie
			}).done(function(specie) {	
				drawTableSpecies(specie);//draws the row of info
			}).fail(function() {
				console.log('something went wrong in the ajaxForSpecies()!');
			});
		}
		infoSpecies="";
	}
	//ajax for getting each vehicle and displaying its info
	function generateVehicles(numberOfVehicles){
		$('#tableContent').html("");
		//for loop that will run for the number that comes from the drop down list
		for(var i=1; i <= numberOfVehicles; i++){
			$.get("http://swapi.co/api/vehicles/"+i+"/", {//gets the specific specie
			}).done(function(vehicle) {	
				drawTableVehicles(vehicle);//draws the row of info
			}).fail(function() {
				// $spanInfo.append("<br><b>Failed loading some of the content</b>");
				console.log('something went wrong in the ajaxForVehicles()! SECOND');
			});
		}
		infoVehicles="";
		// $panInfo.html("");
	}
	//ajax that gets the vehicles
	function ajaxForVehicles(){
		createDropDown(maxNumberOfVehicles, $dropDownVehicles);
		hideTheRestDropDowns($dropDownVehicles);
		$spanInfo.text("Number of Vehicles");
		$divContent.show();
		//initial value when link is clicked
		generateVehicles(initialNumberDisplayed);
		// get the ajax request
		$.get("http://swapi.co/api/vehicles/", {	
		}).done(function(data) {
			$dropDownVehicles.on( "change", function(){
				generateVehicles($(this).val());
			});
			$table.show();	
		}).fail(function() {
			alert('something went wrong in the ajaxForVehicles()! FIRST');
		});
		//end of ajax request
	}
	//ajax that gets the starships
	function ajaxForSpecies(){
		createDropDown(maxNumberOfSpecies, $dropDownSpecies);
		hideTheRestDropDowns($dropDownSpecies);
		$spanInfo.text("Number of Species");
		$divContent.show();
		//initial value when link is clicked
		generateSpecies(initialNumberDisplayed);
		// get the ajax request
		$.get("http://swapi.co/api/species/", {	
		}).done(function(data) {
			$dropDownSpecies.on( "change", function(){
				generateSpecies($(this).val());

			});
			$table.show();	
		}).fail(function() {alert('something went wrong in the ajaxForspecies()!');});
		//end of ajax request
	}
	//ajax for the planets
	function ajaxForPlanets(){
		//dealing with drop downs make function
		createDropDown(maxNumberOfPlanets, $dropDownPlanets);
		hideTheRestDropDowns($dropDownPlanets);
		$spanInfo.text("Number of Planets");
		$divContent.show();
		//initial value when link is clicked
		generatePlanets(initialNumberDisplayed);
		// get the ajax request
		$.get("http://swapi.co/api/planets/", {	
		}).done(function(data) {
			$dropDownPlanets.on( "change", function(){
				generatePlanets($(this).val());
			});
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
		//initial value when link is clicked
		generatePeople(initialNumberDisplayed);
		// get the ajax request
		$.get("http://swapi.co/api/people/", {	
		}).done(function(data) {
			$dropDownPeople.on( "change", function(){
				generatePeople($(this).val());

			});
			$table.show();	
		}).fail(function() {alert('something went wrong in the ajaxForPeople()!');});
		//end of ajax request
	}

	//flow control for our program whatever the user clicks on
	function linkClicked(type){
		switch(type){
			case 'people':
				turnOffListenersButCurrentOne($dropDownPeople);
				ajaxForPeople();
				break;
			case 'planets':
				turnOffListenersButCurrentOne($dropDownPlanets);
				ajaxForPlanets();
				break;
			case 'films':
				// turnOffListenersButCurrentOne($dropDownPlanets);
				break;
			case 'species':
				turnOffListenersButCurrentOne($dropDownSpecies);
				ajaxForSpecies();
				break;
			case 'vehicles':
				turnOffListenersButCurrentOne($dropDownVehicles);
				ajaxForVehicles();
				break;
			case 'starships':
				turnOffListenersButCurrentOne($dropDownPlanets);
				break;
			default:
				console.log("inside default linkClicked()");
		}
	}
	//initial ajax request
	// get the ajax request
	$.get("http://swapi.co/api/", {	
	}).done(function(data) {
		//listens to the clicks on the anchor tags and sends its value to the function 
		$links.click(function(e){
			e.preventDefault();
			var $type = $(this).attr('value');
			//clears the values that need to be reset every time the user clicks on the links
			clearInfo();
			linkClicked($type);
		});
	}).fail(function() {
		alert('something went wrong!');
	});
	//end of ajax request
	$table.hide();
	$divContent.hide();	
});