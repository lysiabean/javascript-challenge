/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/
"use strict";
document.addEventListener('DOMContentLoaded', onReady);

//does not work!!!!
function onReady() {
	var states = document.getElementsByName("state");
		for(var i = 0; i < usStates.length; i++) {
			var opt = document.createElement("option");
			var curr = usStates[i];
			opt.value = curr.code;
			var text = document.createTextNode(curr.name);
			opt.appendChild(text);
			states[0].appendChild(opt);
		}
	
	var occu = document.getElementById("occupation");
	occu.addEventListener('change', showOther);
	var cancel = document.getElementById("cancelButton");
	cancel.addEventListener('click', confirmNo);
	var submit = document.getElementById("signup");
	submit.addEventListener('submit', onSubmit);
}

function showOther() {
	if(document.getElementById("occupation").value == "other") {
		console.log(document.getElementsByName("occupationOther")[0]);
		document.getElementsByName("occupationOther")[0].style.display = "block";
	}
}

function confirmNo() {
	var response = window.confirm("Do you really want to leave?");
	if(response == true) {
		window.location.href = "http://google.com";
	}
}

function validateForm(form) {
	var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
	if(document.getElementById("occupation").value == "other") {
		requiredFields[requiredFields.length] = 'occupationOther';
	}
	var idx;
	var valid = true;
	for(idx = 0; idx < requiredFields.length; idx++) {
		valid &= validateRequiredField(requiredFields[idx], form);
	}

	return valid;

}

function validateRequiredField(field, form) {
	if(field == 'zip') {
		var zipRegExp = new RegExp('^\\d{5}$');
		var validZip = zipRegExp.test(form[field].value);
		if(validZip) {
			form[field].className = 'form-control';
			return true;
		} else {
			console.log("i'm invalid");
			form[field].className = 'form-control invalid';
			return false;
		}
	}
	//birthday??
	if(field == 'birthdate') {
		var d = new Date(form[field].value);
		var now = new Date();
		if(now.getFullYear() - d.getFullYear() < 13) {
			form[field].className = 'form-control invalid';
			document.getElementById("birthdateMessage").innerHTML = "You must be 13 years or older to sign up";
			return false;
		} else {
			form[field].className = 'form-control';
			document.getElementById("birthdateMessage").innerHTML = "";
			return true;
		}

	}

	if(field != 'zip' && field != 'birthdate') {
		if(0 == form[field].value.trim().length ) {
			form[field].className = 'form-control invalid';
			return false;
		} else {
			form[field].className = 'form-control';
			return true;
		}
	}
}

function onSubmit(evt) {
    var valid = validateForm(this);
    if (!valid && evt.preventDefault) {
        evt.preventDefault();
    }
    evt.returnValue = valid;
    return valid;
}



