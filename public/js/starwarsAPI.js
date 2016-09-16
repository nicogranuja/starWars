$(document).ready(function() {
	"use strict";

	//getting the number of things from the API using wrapper swapi
	var maxNumberOfPeople = 0;
	swapiModule.getPeople(function(data) {
	    maxNumberOfPeople = data.count;
	    // console.log("getting number of people = "+ data.count);
	});
	var maxNumberOfPlanets = 0;
	swapiModule.getPlanets(function(data) {
	    maxNumberOfPlanets = data.count;
	    // console.log("getting number of planets = "+ data.count);
	});
	var maxNumberOfSpecies = 0;
	swapiModule.getAllSpecies(function(data) {
	    maxNumberOfSpecies = data.count;
	    // console.log("getting number of Species = "+ data.count);

	});
	var maxNumberOfStarships = 0;
	swapiModule.getStarships(function(data) {
	    maxNumberOfStarships = data.count;
	    // console.log("getting number of Starships = "+ data.count);
	});
	var maxNumberOfVehicles = 0;
	swapiModule.getVehicles(function(data) {
	    maxNumberOfVehicles = data.count;
	    // console.log("getting number of Vehicles = "+ data.count);
	});
	var maxNumberOfFilms = 0;
	swapiModule.getFilms(function(data) {
	    maxNumberOfFilms = data.count;
	    // console.log("getting number of Films = "+ data.count);
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
	//var type will contain the string defining each category whether it is human specie film etc
	var $type = "";
	//buttons
	var $buttonShowAll = $('#buttonShowAll');
	//buttons end
	//*******************************
	var $divContent = $('#divContent');
	var $spanInfo = $('#spanInfo');
	var $errorLoadingAPI = $('#errorLoading');
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
	//search bar rows from the table
	var $rows;
	var $searchBar = $('#searchBar');
	//end search bar

	
	//array will be the array of api links
	//name will be the object's name attribute used for creating the modal and assigning its id
	//kind  will be used to know what information we are handling.
	function drawModal(array, name, kind){
		var content="";
		var name = name.replace(/ /g, '');//remove white space
		//when emtpy array
		if(array.length == 0)
			return "None";
		//loop through the array and call an ajax request for each link that comes in the array
		//when we get the data assign it to the modal we just returned.
		array.forEach(function(element,index,array){
			$.when($.ajax(array[index])).then(function(data){
				//special case for films
				if(kind == 'films'){
					content+= "<li>"+data.title;
					content += "<img src='/img/"+kind+"/"+ IgnoreSpecialCharactersFromString(data.title)+ ".jpg' class='charactersIMG center-block'</li>";
				}
				//else use title
				else{
					content +="<li>"+data.name;
					content += "<img src='/img/"+kind+"/"+ IgnoreSpecialCharactersFromString(data.name)+ ".png' class='charactersIMG center-block'</li>";
				}
				$('#'+name+'').html(content);
			});
		});
		//create and return the "empty modal initialized with unique id"
		var modal = 
		"<button type='button' class='btn btn-warning btn-sm' data-toggle='modal' data-target='."+name+"'>Display</button>"+
		"<div class='modal fade "+name+"' tabindex='-1' role='dialog' aria-labelledby='mySmallModalLabel'>"+
		  "<div class='modal-dialog modal-sm' role='document'>"+
		    "<div class='modal-content' id='"+name+"'>"+
		"</div></div></div>";

		return modal;
	}


	//function to call when the ajax request fails for some specific elements.
	//some API links are broken producing a 404 not found error message
	function errorMessagePullingDataFromAPI(){
		$errorLoadingAPI.text("Error pulling all the data from the API");
	}
	//function displayAllElements will display the max number of elements that the API has for the specific category
	function displayAllElements(kind){
		//kind will be vehicles, people, starships, etc
		switch(kind){
			case 'people':
				generatePeople(maxNumberOfPeople);
				break;
			case 'planets':
				generatePlanets(maxNumberOfPlanets);
				break;
			case 'films':
				generateFilms(maxNumberOfFilms);
				break;
			case 'species':
				generateSpecies(maxNumberOfSpecies);
				break;
			case 'vehicles':
				generateVehicles(maxNumberOfVehicles);
				break;
			case 'starships':
				generateStarships(maxNumberOfStarships);
				break;
			default:
				console.log("inside default displayAllElements()");
		}
	}
	// function that will show on the initial screen sample values from each link
	function displayInitialSample(){
		//probably call it when starwars is clicked
		clearInfo();
		$spanInfo.html("<h4><b>Sample piece of data from each class on the API</b></h4>");
		// $spanInfo.append("<h4 class='label label-info lb-md'>Starships, Vehicles, Species, Films, Planets, People</h4>");
		$spanInfo.append("<table class='table tableHeaderHome label-default lb-sm'><th>Starships</th><th>Vehicles</th><th>Species</th><th>Films</th><th>Planets</th><th>People</th></table>");
		$table.show();
		//print out the sample 1 per each.
		generateStarships(2);//no values on 1
		generateVehicles(4);//no values on first 3
		generateSpecies(1);
		generateFilms(1);
		generatePlanets(1);
		generatePeople(1);						
	}

	//function that deletes the characters that mess up the image loading on screen
	function IgnoreSpecialCharactersFromString(name){
		var answer = name.split("");
		
		for(var i=0; i < answer.length; i++){
			if(answer[i] == "/" || answer[i]== "'"){
				answer[i] = "";
			}
		}
		answer = answer.join("");
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
		$errorLoadingAPI.html("");
	}
	//function turns off all the listeners for the non-active anchor tags
	function turnOffListenersButCurrentOne($listener){
		for(var i=0; i < arrayDropDowns.length; i++){
			if(arrayDropDowns[i] == $listener){//the one we exclude
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
	    //create a dropdown every 5
	    for (var i=1; i<max; i++){
	    	if(i%5==0)
	        	$dropDown.append($('<option></option>').val(i).html(i));
	    }
	    $dropDown.append($('<option></option>').val(max).html('Max'));
	}
	//draw the planets
	function drawPlanets(planet){
		infoPlanets = $('#tableContent').html();
		infoPlanets += "<tr>"+
			"<td><img src='/img/planets/"+ IgnoreSpecialCharactersFromString(planet.name)+ ".png' class='charactersIMG center-block'</td>"+
			"<td><b>Name: </b>"+ planet.name+"</td>"+
			"<td><b>Terrain: </b>"+ planet.terrain+"</td>"+
			"<td><b>Climate: </b>"+ planet.climate+"</td>"+
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
			"<td><b>Starships Piloted: </b>"+drawModal(person.starships, person.name+"Starships", 'starships')+"</td>"+
			"<td><b>Vehicles Driven: </b>"+drawModal(person.vehicles, person.name+"Vehicles", 'vehicles')+"</td>"+
			"<td><b>Specie: </b>"+drawModal(person.species, person.name+"Species", 'species')+"</td>"+
			"<td><b>Films: </b>"+drawModal(person.films, person.name+"Films", 'films')+"</td>"+
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
	//draws the table for one starship at the time
	function drawTableStarships(starship){
		infoStarships = $('#tableContent').html();
		infoStarships += "<tr>"+
			"<td><img src='/img/starships/"+ IgnoreSpecialCharactersFromString(starship.name)+ ".png' class='charactersIMG center-block'</td>"+
			"<td><b>Name: </b>"+ starship.name+"</td>"+
			"<td><b>Model: </b>"+ starship.model+"</td>"+
			"<td><b>Manufacturer: </b>"+ starship.manufacturer+" Years</td>"+
			"<td><b>Passengers: </b>"+ starship.passengers+"</td>"+
			"<td><b>Crew: </b>"+ starship.crew+"</td>"+
			"<td><b>Atmosphering Speed: </b>"+ starship.max_atmosphering_speed+" </td>"+
			"<td><b>Cost: </b>"+ starship.cost_in_credits+" Galactic credits</td>"+
			"<td><b>Length: </b>"+ starship.length+" Meters</td>"+
			"</tr>";

		$table.html(infoStarships);
	}
	//draws the table for one film at the time
	function drawTableFilms(film){
		infoFilms = $('#tableContent').html();
		infoFilms += "<tr>"+
			"<td><img src='/img/Films/"+ IgnoreSpecialCharactersFromString(film.title)+ ".jpg' class='charactersIMG center-block'</td>"+
			"<td><b>Title: </b>"+ film.title+"</td>"+
			"<td><b>Director: </b>"+ film.director+"</td>"+
			"<td><b>Producer: </b>"+ film.producer+" Years</td>"+
			"<td><b>Release Date: </b>"+ film.release_date+"</td>"+
			"<td><b>Created: </b>"+ film.created+"</td>"+
			"<td><b>Edited: </b>"+ film.edited+" </td>"+
			"</tr>";

		$table.html(infoFilms);
	}
	//ajax for getting each planet
	function generatePlanets(numberOfPlanets){
		$('#tableContent').html("");
		//for loop that will run for the number that comes from the drop down list
		for(var i=1; i <= numberOfPlanets; i++){
			$.get("http://swapi.co/api/planets/"+i+"/", {//gets the specific person
			}).done(function(planet) {
				drawPlanets(planet);//draws the row of info
			}).fail(function() {
				errorMessagePullingDataFromAPI();
				// console.log('something went wrong in the ajaxForPeople()!');
			});
		}
		infoPlanets="";
	}
	//ajax for getting each person and displaying its info
	function generatePeople(numberOfPeople){
		$('#tableContent').html("");
		//for loop that will run for the number that comes from the drop down list
		for(var i=1; i <= numberOfPeople; i++){
			//for loop that will run for the number that comes from the drop down list
			$.get("http://swapi.co/api/people/"+i+"/", {//gets the specific person
			}).done(function(person) {	
				drawTablePeople(person);//draws the row of info
			}).fail(function() {
				errorMessagePullingDataFromAPI();
				// console.log('something went wrong in the ajaxForPeople()!');
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
				errorMessagePullingDataFromAPI();
				// console.log('something went wrong in the ajaxForSpecies()!');
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
				errorMessagePullingDataFromAPI();
				// console.log('something went wrong in the ajaxForVehicles()! SECOND');
			});
		}
		infoVehicles="";
		// $panInfo.html("");
	}
	//ajax for getting each specie and displaying its info
	function generateStarships(numberOfStarships){
		$('#tableContent').html("");
		//for loop that will run for the number that comes from the drop down list
		for(var i=1; i <= numberOfStarships; i++){
			$.get("http://swapi.co/api/starships/"+i+"/", {//gets the specific specie
			}).done(function(starship) {	
				drawTableStarships(starship);//draws the row of info
			}).fail(function() {
				errorMessagePullingDataFromAPI();
				// console.log('something went wrong in the ajaxForStarships()!');
			});
		}
		infoStarships="";
	}
	//ajax for getting each specie and displaying its info
	function generateFilms(numberOfFilms){
		$('#tableContent').html("");
		//for loop that will run for the number that comes from the drop down list
		for(var i=1; i <= numberOfFilms; i++){
			$.get("http://swapi.co/api/films/"+i+"/", {//gets the specific specie
			}).done(function(film) {	
				drawTableFilms(film);//draws the row of info
			}).fail(function() {
				errorMessagePullingDataFromAPI();
				// console.log('something went wrong in the ajaxForFilms()!');
			});
		}
		infoFilms="";
	}
	//ajax that gets the starships
	function ajaxForFilms(){
		createDropDown(maxNumberOfFilms, $dropDownFilms);
		hideTheRestDropDowns($dropDownFilms);
		$spanInfo.text("Number of Films");
		$divContent.show();
		//initial value when link is clicked
		generateFilms(initialNumberDisplayed);
		// get the ajax request
		$.get("http://swapi.co/api/films/", {	
		}).done(function(data) {
			$dropDownFilms.on( "change", function(){
				generateFilms($(this).val());
			});
			$table.show();	
		}).fail(function() {alert('something went wrong in the ajaxForFilms()!');});
		//end of ajax request
	}
	//ajax that gets the starships
	function ajaxForStarships(){
		createDropDown(maxNumberOfStarships, $dropDownStarships);
		hideTheRestDropDowns($dropDownStarships);
		$spanInfo.text("Number of Starships");
		$divContent.show();
		//initial value when link is clicked
		generateStarships(initialNumberDisplayed);
		// get the ajax request
		$.get("http://swapi.co/api/starships/", {	
		}).done(function(data) {
			$dropDownStarships.on( "change", function(){
				generateStarships($(this).val());
			});
			$table.show();	
		}).fail(function() {alert('something went wrong in the ajaxForStarships()!');});
		//end of ajax request
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
				turnOffListenersButCurrentOne($dropDownFilms);
				ajaxForFilms();
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
				turnOffListenersButCurrentOne($dropDownStarships);
				ajaxForStarships();
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
			$type = $(this).attr('value');
			//clears the values that need to be reset every time the user clicks on the links
			clearInfo();
			linkClicked($type);
		});
		//listener for the show all button
		$buttonShowAll.click(function(e){
			// console.log("the type you clicked is"+ $type);
			displayAllElements($type);
		});
		//listener for the search bar key up looking for the characters on screen
		$searchBar.keyup(function() {
			$rows = $('#tableContent tr');

		    var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
		        reg = RegExp(val, 'i'),
		        text;
		    
		    $rows.show().filter(function() {
		        text = $(this).text().replace(/\s+/g, ' ');
		        return !reg.test(text);
		    }).hide();
		});


	}).fail(function() {
		alert('something went wrong in the main ajax request!');
	});
	//end of ajax request
	$table.hide();
	$divContent.hide();

	//first screen seen that displays a sample
	displayInitialSample();


});