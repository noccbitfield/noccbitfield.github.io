function showbp(){
	/*	FIRST CLICK IS A DOUBLE CLICK */
	var img = document.getElementById("hallBluePrint");
	if (img.style.display === "none"){
		img.style.display = "block";
	} else {
		img.style.display = "none";
	}
}