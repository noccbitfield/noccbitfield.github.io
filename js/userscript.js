/*set max to datepicker*/
document.getElementById("bday").max = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0];


function getage(bday){
	var birthday = new Date(bday.value);
	var today = new Date();
	var age = today.getFullYear() - birthday.getFullYear();  
	var m = today.getMonth() - birthday.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
		age = age - 1;
	}

	return age;
}

function calcavgage(table){
	var i = 0;
	var rows = table.rows;
	var totage = 0;
	var items = rows.length;
	var test;

	for (i = 0; i < rows.length; i++){
		var age = rows[i].getElementsByTagName("TD")[3];
		totage = totage + parseFloat(age.innerHTML);
	}
	
	var average = totage / items;
	average = average.toFixed(3);
	document.getElementById("ageavg").innerHTML = "The average age of users is: " + average;

}

function checkempty(name, email, bday){
	if (name.value.length == 0 || email.value.length == 0 || bday.value.length == 0 ){
		alert("FORM INCOMPLETE");
		return 1
	}
	return 0;
}

function dupcheck(table, email){
	var rows = table.rows;
	var test;
	var test1;
	var i = 0;
	
	if (rows.length > 0){
		for ( i = 0; i < rows.length; i++){
			test = rows[i].getElementsByTagName("TD")[1];
			test = test.innerHTML.toLowerCase();
			if (test == email){
				alert("EMAIL IN USE");
				return 1;
			}
			
		}
	
	}
	return 0;


}

function recorddata(){
	var table = document.getElementById("usertable");

	var name = document.getElementById("name");
	var email = document.getElementById("email");
	var bday = document.getElementById("bday");

	
	if (checkempty(name, email, bday) == 1){
		return;
	}
	
	if (dupcheck(table, email.value) == 1){
		return;
	}
	
		var age = getage(bday);

		
	var row = table.insertRow(-1);
	var namecell = row.insertCell(0);
	var emailcell = row.insertCell(1);
	var bdaycell = row.insertCell(2);
	var agecell = row.insertCell(3);

	namecell.innerHTML = name.value;
	emailcell.innerHTML = email.value;
	bdaycell.innerHTML = bday.value;
	agecell.innerHTML = age;
	calcavgage(document.getElementById("usertable"));

	
}

function givesortinfo(n){
	if (n == 0){
		document.getElementById("sortinfo").innerHTML = "table sorted on NAME";
	}
	else if (n == 1){
		document.getElementById("sortinfo").innerHTML = "table sorted on EMAIL";
	}
	else {
		document.getElementById("sortinfo").innerHTML = "table sorted on BIRTHDAY";
	}

}

function sorttable(n){
	var table, rows, switching, current, next, shouldSwitch, dir, switchcount = 0;
	var i = 0;
	table = document.getElementById("usertable");
	switching = true;
	dir = "asc";

	givesortinfo(n);

	while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 0; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      current = rows[i].getElementsByTagName("TD")[n]; 
      next = rows[i + 1].getElementsByTagName("TD")[n];

      current = current.innerHTML.toLowerCase();
      next = next.innerHTML.toLowerCase();


      if (n == 2){
      	current = new Date(current);
      	next = new Date(next);
      }

      if (dir == "asc") {
        if (current > next) {

          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (current < next) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }

  }
}

