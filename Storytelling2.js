
var table;
var colors;
var countries;
var methods;
var lastyear=1995;
var mode;
var countryDisplay=-1;
var countryTempDisplay = -1;

function preload(){
 table_ori = loadTable("contraceptive.csv","csv","header");
}

function setup() {
  createCanvas(960,540); 
  table = table_ori.getArray();
  colors = [color(122,11,11),color(244,102,102),color(255,149,20),color(255,239,20),color(127,121,35),
  color(141,239,117),color(3,74,173),color(132,212,155),color(114,117,142),color(224,159,252),
  color(81,39,49),color(175,175,175),color(173,24,83),color(116,160,106),color(71,71,71)]
  angleMode(DEGREES);
  countries = {}
  for(var i = 1; i<table.length; i++){
  if(table[i][0]!= table[i-1][0]){
    countries[table[i][0]] = new Country(table[i][0]);
  }
  countries[table[i][0]].setYearData(table[i][2],table[i]);
}
methods = ["Female sterilization","Male sterilization","IUD","Implant","Injectable","Pill","Male condom","Female condom",
"Vaginal barriers","LAM","Emergency","Other modern","Rhythm","Withdrawal","Other traditional"]
mode = "running";

}



function draw() {
   background(240);
  fill(0);
  if (mode == "running"){
  run();
  drawTimeLine(year);
  if(countryDisplay!=-1){
  countries[countryDisplay].displayDetails(year)
  }
  else{
    if(countryTempDisplay!=-1)
  countries[countryTempDisplay].displayDetails(year)
  }
  }
  if (mode == "fixedYear"){
    balanceCountries();
    displayAllCountries();
    drawTimeLine(lastyear);
  if(countryDisplay!=-1){
  countries[countryDisplay].displayDetails(lastyear)
  }else{
  if (countryTempDisplay!=-1)
    countries[countryTempDisplay].displayDetails(lastyear)
  }
  
  }

  
  drawTitle();
  drawMethods();
  }
  
  
  function drawTitle(){
  textAlign(LEFT, CENTER)
    fill(80)
    textSize(11)
    text("Worldwide Contraceptive Methods",300,30 )
  }
  
  
  function run(){
  background(240);
  fill(0);
  year = second()%20+1995
  if (year == 2014)
  year = 2013
  if (year!=lastyear){
    tempyear = year
    updateAllCountries(year)  
}  

    balanceCountries();
    displayAllCountries();


  }
  
  
  function updateAllCountries(year){
    for(var key in countries){
    countries[key].update(year);
  }
  }
  
  function displayAllCountries(){
  for (var key in countries){
  countries[key].display();
  }
  }
  
  function balanceCountries(){
    tryBalance();
    tryBalance();
    tryBalance();
  return
 
  }
  
  function tryBalance(){
  i = 0
    for(k1 in countries){
    for(k2 in countries){
      if (k1!= k2){
      boo = rebalance(k1,k2)
      if (boo)
      i++
    }
    }
  }
  return i
  }
  
  function rebalance(key1,key2){
      R = countries[key1].r + countries[key2].r
      L = sqrt(sq(countries[key1].x-countries[key2].x)+sq(countries[key1].y-countries[key2].y))
      theta = atan2(countries[key2].y-countries[key1].y,countries[key2].x-countries[key1].x)
      if (R>L){     
        deltaX = countries[key2].x-countries[key1].x
        deltaY = countries[key2].y-countries[key1].y
        r1 = countries[key1].r;
        r2 = countries[key2].r;
        k_1 = (((r1+r2)/L)-1)*(r2*r2/(r1*r1+r2*r2));
        k_2 = (((r1+r2)/L)-1)*(r1*r1/(r1*r1+r2*r2));
        
        x1 = countries[key1].x - k_1*deltaX
        y1 = countries[key1].y - k_1*deltaY
        x2 = countries[key2].x + k_2*deltaX
        y2 = countries[key2].y + k_2*deltaY
        
        countries[key1].setXY(x1,y1);
        countries[key2].setXY(x2,y2);
    
    return(true);  
    }
    else
    {return false}
  };
  
  
  
  
  
  function displayCountriesByMethods(methodNumber){
  for(var key in countries){
  countries[key].updateMethod(methodNumber);
  }
  }
  

function drawTimeLine(year){
  fill(80);
  noStroke();
  for(var i=1995; i<2014;i++){
  x = map(i,1995,2013,50,700)
  y = 470
  if(i==year){
    if(mode == "running")
      ellipse(x,y,10)
    else if(mode == "fixedYear"){
      ellipse(x,y,15)
      fill(240)
      triangle(x-2.5,y+4,x-2.5,y-4,x+4,y)
      fill(80)
    }
  }
    
  else
    ellipse(x,470,5)
  textAlign(CENTER)
  textSize(10)
  text(i,x,490)  
}
}

function drawMethods(){
for(var i=0; i<15; i++){
 textSize(10)
  y = map(i,0,16,40,350)
 fill(colors[i])
 noStroke();
 ellipse(800,y,8)
 fill(80)
 textAlign(LEFT,CENTER);
 text(methods[i],815,y)
}
}

function mouseClicked(){
y = checkTimeLines();
if(y!=-1){
if(mode == "running"){
mode = "fixedYear";
updateAllCountries(y);
lastyear = y;
}
else if(mode == "fixedYear" && y==lastyear){
mode = "running";
}
else if(mode == "fixedYear" && y!=lastyear){
updateAllCountries(y);
lastyear = y;
}
}

c = checkCountries()
if(countryDisplay == c)
countryDisplay = -1
else
countryDisplay = c




}

function mouseMoved(){
y = checkTimeLines();
if(y!=-1){
  x = map(y,1995,2013,50,700)
  y = 470
  fill(255)
  ellipse(x,y,10);
}

c = checkCountries()
countryTempDisplay = c

}

function checkCountries(){
for(var key in countries){
if (countries[key].checkMouse()==true)
return key
}
return -1
  
}



function checkTimeLines(){
  for(var i=1995; i<2014;i++){
  x = map(i,1995,2013,50,700)
  y = 470
  if (sqrt(sq(mouseX-x)+sq(mouseY-y))<10){
  return i}
}
return -1
}
