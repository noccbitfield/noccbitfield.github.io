
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    // true for mobile device
    //document.write("mobile device");
    window.location.href = "../mobile/index.html";
  }else{
    // false for not mobile device
    //document.write("not mobile device");
  }




var tID; 

function stopAnimate() {
  clearInterval(tID);
} //end of stopAnimate()


function animateScript() {

  var position = 0; 
  const interval = 100; 
  const diff = 203; 
  
  tID = setInterval(() => {
  
    document.getElementById("doorImage").style.backgroundPosition =
      `-${position}px 0px`;
    
    if (position < 609) {
      position = position + diff;
    }

  
    
  }, interval); 
} 

