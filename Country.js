function Country(countryName) {
  var name = countryName;
  var datalist = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var x = new SoftFloat(0);
  var y = new SoftFloat(0);
  var r = new SoftFloat(0);
  var clr = color(128)

  this.setYearData = function(year, dataArray) {
    if (year<2014 && year>1994)
      datalist[year-1995] = dataArray
    }
  
  this.update = function(year){
  if (datalist[year-1995]!=0) { 
    x_target = datalist[year-1995][25]*960-150     
    y_target = (1-datalist[year-1995][26])*540+20
 
    
    r_target = sqrt(datalist[year-1995][24])*datalist[year-1995][4]*0.05;
        //if (r_target<100)
        //  r_target = 100  
    x.setTarget(x_target);
    y.setTarget(y_target);
    r.setTarget(r_target);
        maxii = findMostCommon(datalist[year-1995]);
        clr = colors[maxii-5];
        this.x = x.value;
        this.y = y.value;
        this.r = r.value/2;
      }
  }
  
  this.methodUpdate = function(year, methodNumber){
        x.setTarget(datalist[year-1995][25]*960);
        y.setTarget((1-datalist[year-1995][26])*540);
        r_target = sqrt(datalist[year-1995][24])*datalist[year-1995][5+methodNumber]*0.05;
        r.setTarget(r_target);
        clr = colors[methodnumber];
        this.x = x.value;
        this.y = y.value;
        this.r = r.value/2;
  }

    this.display = function() {
        x.update();
        y.update();
        r.update();
        fill(clr);
        noStroke();
        ellipse(x.value, y.value, r.value);
      }

    

  this.checkname = function(inputName) {
    if (inputName == name)
      return True
  else
  return False
};

this.setXY = function(inX,inY){
  x.update();
  y.update();
  x.setTarget(inX);
  y.setTarget(inY);
  this.x = x.value;
  this.y = y.value;
};

this.displayDetails = function(year){
if (datalist[year-1995]!=0){
costomizeMethodLine(datalist[year-1995]);
drawDonut(datalist[year-1995]);
}
else{
textSize(10)
text("data unavailable",840,450)
}
textAlign(CENTER,CENTER)
fill(80)
stroke(80)
strokeWeight(0);
textSize(15)
if (name=="United States of America")
text("USA",840,420)
else if(name == "United Kingdom")
text("UK",840,420)
else
text(name,840,420)

}

this.checkMouse = function(){
L = sqrt(sq(mouseX-x.value)+sq(mouseY-y.value))
if(L<=r.value/2)
return true
else
return false
}


};


function findMostCommon(givenarray) {
  maxi = 0;
  maxn = 0;
  for (var j=5; j<20; j++) {
    newelement = parseFloat(givenarray[j])
    if (newelement>=maxn) {
        maxn = givenarray[j]
        maxi = j
    }
  }
  return maxi
};

function costomizeMethodLine(givenArray){
  maxii = findMostCommon(givenArray)
  for(var i=0; i<15; i++){

  y = map(i,0,16,40,350)
 x = map(givenArray[i+5],givenArray[maxii],0,770,800)
 stroke(colors[i])
 strokeWeight(8)
 strokeCap(ROUND)
 line(x,y,800,y)
}
}

function drawDonut(givenArray){
  var lastAngle = 0;
  data = []
  angles = []
  data.push(100-parseFloat(givenArray[4]))
  for (var j=5;j<20;j++){
  a = parseFloat(givenArray[j])
    if (a>=0)
    data.push(a)
    else
    data.push(-a)
  }
  var total=0;
  for(var j in data) {total += data[j]; }

  for(var j in data){angles.push(data[j]/total*360)}
    angleMode(DEGREES)
  for (var k = 1; k < angles.length; k++) {
    fill(colors[k-1]);
    noStroke();
    arc(840, 420, 130,130, lastAngle, 0);
    lastAngle += angles[k];
  }
  nonColor = color(10)
  fill(nonColor)
  arc(840, 420, 130 , 130, lastAngle, 0);
  
  fill(240)
  ellipse(840,420,80,80)
  
}




