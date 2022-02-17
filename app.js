
const menuButton = document.querySelector('.menubtn'); 
const enlangbtn = document.querySelector('.enlang_btn');
const frlangbtn = document.querySelector('.frlang_btn');
const delangbtn = document.querySelector('.delang_btn');
const eslangbtn = document.querySelector('.eslang_btn');
const select1_btn = document.querySelector('.select1_btn');
const select2_btn = document.querySelector('.select2_btn');

//var currentlanguage =[]

//all Event listeners
menuButton.addEventListener('click',e=>{menudiv.classList.toggle('show')})

enlangbtn.addEventListener('click',e=>{setlang('en')})
frlangbtn.addEventListener('click',e=>{setlang('fr')})
delangbtn.addEventListener('click',e=>{setlang('de')})
eslangbtn.addEventListener('click',e=>{setlang('es')})
select1_btn.addEventListener('click',changepage)
select2_btn.addEventListener('click',changepage)

/*const  getData=async(neededlanguage)=>{
    const data= await fetch('language.json')
    .then(reponse=>{
            if (reponse.ok===true){return reponse.json()}
                    }) 
    currentlanguage =data[neededlanguage]

 }*/

const setlang=async(a)=>{
    lang=a 
    localStorage.setItem('language',a);
    getData(lang)
    .then(reponse=>{
        textprint()
        //ferme le menu s'il est ouvert
        if(!menudiv.classList.contains('show')){
            menudiv.classList.toggle('show')
            }
    
    })
}

//systeme language detection au demarage de l'appli
var lang = navigator.language.slice(0,2);
if(localStorage.getItem('language')===null)
    {localStorage.setItem('language',lang);}
else {lang=localStorage.getItem('language')}
textprint()
setlang(lang)

function changepage(){
    select1ID.classList.toggle('selected_btn')
    select2ID.classList.toggle('selected_btn')
    manualdivID.classList.toggle('switch')
    autodivID.classList.toggle('switch')
    materialContainerID.classList.toggle('switch')
}

//load correct language and print it
function textprint(){
    
    document.getElementById("010").innerText=currentlanguage[0];
    document.getElementById("011").innerText=currentlanguage[1];
    document.getElementById("012").innerText=currentlanguage[2];
    document.getElementById("013").innerText=currentlanguage[12];
    document.getElementById("014").innerText=currentlanguage[13];
    if(lifespan!=null){showreponce()}
    
    Array.from(document.getElementsByClassName('txtOutclass01')).forEach(item => item.innerText=currentlanguage[14])
    Array.from(document.getElementsByClassName('txtOutclass02')).forEach(item => item.innerText=currentlanguage[15])
    Array.from(document.getElementsByClassName('txtOutclass03')).forEach(item => item.innerText=currentlanguage[16])

    Array.from(document.getElementsByClassName('txtInclass01')).forEach(item => item.innerText=currentlanguage[17])
    Array.from(document.getElementsByClassName('txtInclass02')).forEach(item => item.innerText=currentlanguage[18])
    Array.from(document.getElementsByClassName('txtInclass03')).forEach(item => item.innerText=currentlanguage[19])
}   

