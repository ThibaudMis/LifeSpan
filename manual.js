const Din = document.querySelector('.IN');
const Dout = document.querySelector('.OUT');
const Dlife = document.querySelector('.left');

var milOutdate =null; 
var milIntdate=null; 
var span=null; 
var life=null; 
var lifespan=null; 

//Getting local date and time and pushing it to html
let now =new Date();
now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
let todaydate = now.toISOString().substr(0, 16);
document.querySelector("#today2").value = todaydate;
todaydate=todaydate.substr(0, 14);
todaydate=todaydate.padEnd(16,"0");
document.querySelector("#today").value = todaydate;

Din.addEventListener('change',timer)
Dout.addEventListener('change',timer)
Dlife.addEventListener('keyup',timer)

// calculate life span based on user input
function timer(event){
    event.preventDefault();

    let Outdate= new Date(Dout.value);
    milOutdate= Outdate.getTime()/1000;

    let Indate= new Date(Din.value);
    milIntdate= Indate.getTime()/1000;

    span = Math.round( (milIntdate-milOutdate)/3600);
    life =Dlife.value;
    lifespan = life - span;
    showreponce()
}


// display reponse and erroe messages
function showreponce(){
    if(milOutdate===milIntdate){
        res.classList.add("fail");
        hleft.classList.remove("fail");
        document.getElementById("res").innerHTML=currentlanguage[3];
        }
    else if(milOutdate>milIntdate){
            res.classList.add("fail");
            hleft.classList.remove("fail");
            document.getElementById("res").innerHTML=currentlanguage[4];
            } 
    else if(life===""){
            res.classList.add("fail");
            hleft.classList.add("fail");
            document.getElementById("res").innerHTML=currentlanguage[5];
            }           
    else if(life<span){
            const exede = span-life;
            res.classList.add("fail");
            hleft.classList.remove("fail");
            if(exede===1){
            document.getElementById("res").innerHTML=currentlanguage[6]+exede+currentlanguage[7]+".";  }
            else{
            document.getElementById("res").innerHTML=currentlanguage[6]+exede+currentlanguage[8]+".";}
            }
         
        else{
            res.classList.remove("fail");
            hleft.classList.remove("fail")
            var textstring=""
            if(span===1&& lifespan===1){
                textstring= +span+currentlanguage[7]+currentlanguage[9]+lifespan +currentlanguage[7]+currentlanguage[11]
            }
            else if(span===1&& lifespan>1){         
                textstring= +span+currentlanguage[7]+currentlanguage[9]+lifespan +currentlanguage[8]+currentlanguage[11]
            }
            else if(span>1&& lifespan===1){
                textstring= +span+currentlanguage[8]+currentlanguage[10]+lifespan +currentlanguage[7]+currentlanguage[11]
            }
            else{
                textstring= +span+currentlanguage[8]+currentlanguage[10]+lifespan + currentlanguage[8]+currentlanguage[11]
            }
            document.getElementById("res").innerHTML=textstring;
            
        }


    }


