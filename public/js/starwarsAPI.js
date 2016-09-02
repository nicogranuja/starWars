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

	//number used to check when the user selects a smaller number coming from a bigger one in the people dropdown list.
	var number = 1;


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
	var infoPeople = "<tr><th>Name</th><th>Gender</th> <th>Height</th><th>Mass</th></tr>";
	var infoPlanets = "<tr><th>Name</th><th>Terrain</th> <th>Climate</th><th>Gravity</th><th>Population</th><th>Residents</th></tr>";
	

	//this function will return true if we are going from a bigger number to a smaller in our dropdown
	function comingFromBigToSmallInDropDownList(newNumber){
		var number = 1;
		var temp = number;//saves the last number
		number = newNumber//assigns it to the new number required to display
		//if loop if the new number is smaller than the old one we reset what we have and start over again
		if(temp < newNumber){
			return true;
		}
		else{
			return false;
		}
	}
	//draw the planets
	function drawPlanets(planet){
		infoPlanets += "<tr>"+
			// "<td><img src='/img/"+ planet.name+ ".png' class='charactersIMG center-block'</td>"+
			"<td><b>Name: </b>"+ planet.name+"</td>"+
			"<td><b>Terrain: </b>"+ planet.terrain+"</td>"+
			"<td><b>Gender: </b>"+ planet.climate+"</td>"+
			"<td><b>Height: </b>"+ planet.gravity+" G's</td>"+
			"<td><b>Mass: </b>"+ planet.population+"</td>"+
			// "<td><b>Residents: </b>"+ planet.residents+"</td>"+
			"</tr>";

		$table.html(infoPlanets);
	}
	function ajaxForPlanets(){

		/////////////Initial Values for every anchor??///////////////////
		createDropDown(maxNumberOfPlanets, $dropDownPlanets);
		//dealing with drop downs make function
		hideTheRestDropDowns($dropDownPlanets);
		//*******************
		$spanInfo.text("Number of Planets");
		$table.show().html("");//clearing the table
		$divContent.show();
		/////////////Initial Values for every anchor??///////////////////

		//do this once which is showing the first element once
		// do{
		// 	swapiModule.getPlanet(2,function(planet) {
		// 		drawPlanets(planet);
		// 	});
		// }while(3>4);
		$dropDownPlanets.on( "change", function(){
			var numberPlanets = $(this).val();

			for(var i=1; i < numberPlanets; i++){//is just printing one planet in i the number of i FIX THIS
				swapiModule.getPlanet(i,function(planet) {
				    drawPlanets(planet);
				});	
			}
			infoPlanets="";
		});

	}
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
		//for the planets because it starts at 2 for some reason
		if($dropDown == arrayDropDowns[0]){
			for (var i=1;i<=max;i++){
		        $dropDown.append($('<option></option>').val(i+1).html(i))
		    }
		}
		else{
		    for (var i=1;i<=max;i++){
		        $dropDown.append($('<option></option>').val(i).html(i))
		    }
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
		// console.log(person.name);
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
		// var temp = number;//saves the last number
		// number = numberOfPeople;//assigns it to the new number required to display
		// //if loop if the new number is smaller than the old one we reset what we have and start over again
		// if(temp < number){
		// 	infoPeople = "<tr><th>Name</th><th>Gender</th> <th>Height</th><th>Mass</th></tr>";
		// }
		// if(comingFromBigToSmallInDropDownList(numberOfPeople)){
		// 	infoPeople = "<tr><th>Name</th><th>Gender</th> <th>Height</th><th>Mass</th></tr>";
		// }
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
		//span info shows the data being displayed Ex: characters planets etc..
		$spanInfo.text("Number of Characters");
		$divContent.show();
		//dealing with drop downs.......
		hideTheRestDropDowns($dropDownPeople);
		//**************************


		// get the ajax request
		$.get("http://swapi.co/api/people/", {
			
		}).done(function(data) {
			$dropDownPeople.on( "change", function(){
				generatePeople($(this).val());
			});
			generatePeople(1);
			createDropDown(maxNumberOfPeople, $dropDownPeople);
			$table.show();
			
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
			//trying to maybe reset the content every time we click in the anchor tag
			// $divContent.html("<span id='spanInfo'></span><select class='1-100'></select>");
			$spanInfo.html("");
			$dropDownPeople.html("");
			$dropDownPlanets.html("");
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
	
	$table.hide();
	$divContent.hide();
	

});