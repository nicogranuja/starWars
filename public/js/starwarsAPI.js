$(document).ready(function() {
	"use strict";

	var $generalList = $('#generalList');
	var $content = $('#content');
	var $links = $('.generalOptions');
	var $table = $('#tableContent');
	var $dropDownPeople = $(".1-100");
	var $divPeople = $('#divNumberPeople');
	var $peopleHeader = $('#hiddenPeopleHeaders');
	//head rows for the table for people
	var infoPeople = "<tr><th>Name</th><th>Gender</th> <th>Height</th><th>Mass</th></tr>";



	//this function will create the drop down list with the numbers from 1 to 87
	$(function(){
	    for (var i=1;i<=87;i++){
	        $dropDownPeople.append($('<option></option>').val(i).html(i))
	    }
	});
	//draws the table for one person at the time
	function drawTablePeople(person){

		infoPeople += "<tr>"+
			"<td><b>Name: </b>"+ person.name+"</td>"+
			"<td><b>Gender: </b>"+ person.gender+"</td>"+
			"<td><b>Height: </b>"+ person.height+" Cm.</td>"+
			"<td><b>Mass: </b>"+ person.mass+" Kg.</td>"+
			"</tr>";

		$table.html(infoPeople);
	}

	//ajax for getting each person and displaying its info
	function generatePeople(numberOfPeople){
		var number = 1;//will control number of people displayed max 87	
		for(var i=1; i <= numberOfPeople; i++){
			$.get("http://swapi.co/api/people/"+i+"/", {
			
			}).done(function(data) {
				drawTablePeople(data);
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
		$links.click(function(e){
			e.preventDefault();
			var $type = $(this).attr('value');
			linkClicked($type);
			console.log(data);
		});
	}).fail(function() {
		alert('something went wrong!');
	});
	//end of ajax request
	

	function linkClicked(type){
		switch(type){
			case 'people':
				console.log("inside people");
				ajaxForPeople();
				break;
			case 'planets':
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


});