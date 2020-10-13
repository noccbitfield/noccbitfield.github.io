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

