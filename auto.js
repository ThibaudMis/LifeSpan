const start_btn= document.querySelector('.start_tbn');
const lotinput=document.querySelector('.lotinput');
const hourinput=document.querySelector('#hourinput');
const minuteinput=document.querySelector('#minuteinput');
const material_list=document.querySelector('.material_listclass');

let Listlotnumber =[]
let thislotnumber =[]
var lastexpenddiv=null;
var lastexpandbtn
var id,index
material_list.addEventListener("click",action)
start_btn.addEventListener('click',createMaterial)

loadData()
checklifespan()

function loadData(){
    
    if(localStorage.getItem('Listlotnumber')!=null){
        Listlotnumber= Array.from(localStorage.getItem('Listlotnumber').split(','))
    }
    if(Listlotnumber[0]!=''){
        for(i=0; i<Listlotnumber.length;i++){
            thislotnumber= Array.from(localStorage.getItem(Listlotnumber[i]).split(','))

            createMaterialDiv()
            showData()
        }
    }
}


function createArray(sj,lifetime0,lifetime1,datestamp0,datestamp1,timebetweenstamp,lifedate0,lifedate1,date0,date1,timebetweendate,exdate,){
    Listlotnumber.push(sj)
    thislotnumber = [sj,lifetime0,lifetime1,datestamp0,datestamp1,timebetweenstamp,lifedate0,lifedate1,date0,date1,timebetweendate,exdate,]    
}

function computeData(){
// deternime la lifedate0   
    if(thislotnumber[6]===null){
        thislotnumber[6]=convertStampHM(thislotnumber[1])//converti le stamp duree de vie restante en heures minutes
    } 
//determine la date d'expiration
    if(thislotnumber[11]===null){
        thislotnumber[11]=convertStampDate((thislotnumber[3]+(thislotnumber[1]*1000)))// ajoute la duree de vie a la date de sortie et calcule la date d'expiration
    }    
// determine la lifedate1
    if(thislotnumber[2]!=null){
        thislotnumber[7]=convertStampHM(thislotnumber[2])//converti le stamp duree de vie restante en heures minutes 
    }
// determine date0
    if(thislotnumber[8]===null){
        thislotnumber[8]=convertStampDate(thislotnumber[3])//converti le stamp duree de vie restante en date
    }
    
// determine date1 timebetweenstamp timebetweendate
    if(thislotnumber[4]!=null){
        thislotnumber[9]=convertStampDate(thislotnumber[4])//converti le stamp duree de vie restante en date
        thislotnumber[5]=thislotnumber[4]-thislotnumber[3]// calcule le temps a l'ambiant en stamp
        thislotnumber[2]=thislotnumber[1]-Math.trunc((thislotnumber[5]/1000))
        if(thislotnumber[2]<0){thislotnumber[2]=0}
        thislotnumber[10]=convertStampHM((thislotnumber[5]/1000))//converti le stamp duree de vie restante en heurs et minute
       
    }
    //console.log('1 stamp duree de vie de sortie :'+thislotnumber[1]+'\n2 stamp duree de vie de retour :'+thislotnumber[2]+'\n3 stamp de sortie :'+thislotnumber[3]+'\n4 stamp de retour :'+thislotnumber[4]+'\n5 stamp ecart temps :'+thislotnumber[5])
    //console.log('6 duree de vie :'+thislotnumber[6]+'\n7 nouvelle duree de vie :'+thislotnumber[7]+'\n8 date de sortie :'+thislotnumber[8]+'\n9 date de retour :'+thislotnumber[9]+'\n10 temps a l ambiant :'+thislotnumber[10]+'\n11 expire le :'+thislotnumber[11])
    saveData()
}

function createMaterialDiv(){

    //si il y a plus d'une entree dans la list, reduir la derniere expendediv ouvert
    if(document.getElementsByClassName('lotnumberclass').length>0){
    lastexpenddiv.classList.add('hideSJdiv')
    lastexpandbtn.classList.add('hideSJdiv')}
                
//creation de la div principal qui contien l'ID sj
    const addedmaterialdiv = document.createElement('div')
    addedmaterialdiv.classList.add('materiallist',thislotnumber[0])
    addedmaterialdiv.setAttribute('id',thislotnumber[0])

//creation de la div bandeau toujours visible qui affiche le SJ
    const lotnumberdiv = document.createElement('div')
    lotnumberdiv.classList.add('lotnumberclass',thislotnumber[0])
    lotnumberdiv.innerText=thislotnumber[0]
    addedmaterialdiv.appendChild(lotnumberdiv)

//creation de la div developable
    const expanddiv = document.createElement('div')
    expanddiv.classList.add('expenddivclass',thislotnumber[0])
    lastexpenddiv=expanddiv
    addedmaterialdiv.appendChild(expanddiv)
    
//creation de la div material info
    const matinfo = document.createElement('div')
    matinfo.classList.add('matinfoclass',thislotnumber[0])
    expanddiv .appendChild(matinfo)


// creation div premiere ligne text et de sa valeur
    const L1 = document.createElement('div')
    L1.classList.add('lotOutclass',thislotnumber[0])
    matinfo.appendChild(L1)
    
    const txtOut1 = document.createElement('div')
    txtOut1.classList.add('txtOutclass01')
    L1.appendChild(txtOut1)

    const valOut1 = document.createElement('div')
    valOut1.classList.add('valclass')
    valOut1.setAttribute('id',thislotnumber[0]+'valOut1')
    L1.appendChild(valOut1)

// creation div deuxieme ligne text et de sa valeur
    const L2 = document.createElement('div')
    L2.classList.add('lotOutclass',thislotnumber[0])
    matinfo.appendChild(L2)

    const txtOut2 = document.createElement('div')
    txtOut2.classList.add('txtOutclass02')
    L2.appendChild(txtOut2)
 
    const valOut2 = document.createElement('div')
    valOut2.classList.add('valclass')
    valOut2.setAttribute('id',thislotnumber[0]+'valOut2')
    L2.appendChild(valOut2)
// creation div troisieme ligne text et de sa valeur
    const L3 = document.createElement('div')
    L3.classList.add('lotOutclass',thislotnumber[0])
    matinfo.appendChild(L3)

    const txtOut3 = document.createElement('div')
    txtOut3.classList.add('txtOutclass03')
    L3.appendChild(txtOut3)
 
    const valOut3 = document.createElement('div')
    valOut3.classList.add('valclass')
    valOut3.setAttribute('id',thislotnumber[0]+'valOut3')
    L3.appendChild(valOut3)



// creation div premiere ligne text et de sa valeur
    const L4 = document.createElement('div')
    L4.classList.add('lotInclass')
    matinfo.appendChild(L4)
    
    const txtIn1 = document.createElement('div')
    txtIn1.classList.add('txtInclass01')
    L4.appendChild(txtIn1)

    const valIn1 = document.createElement('div')
    valIn1.classList.add('valclass')
    valIn1.setAttribute('id',thislotnumber[0]+'valIn1')
    L4.appendChild(valIn1)

// creation div deuxieme ligne text et de sa valeur
    const L5 = document.createElement('div')
    L5.classList.add('lotInclass')
    matinfo.appendChild(L5)

    const txtIn2 = document.createElement('div')
    txtIn2.classList.add('txtInclass02')
    L5.appendChild(txtIn2)
 
    const valIn2 = document.createElement('div')
    valIn2.classList.add('valclass')
    valIn2.setAttribute('id',thislotnumber[0]+'valIn2')
    L5.appendChild(valIn2)

// creation div troisieme ligne text et de sa valeur
    const L6 = document.createElement('div')
    L6.classList.add('lotInclass')
    matinfo.appendChild(L6)

    const txtIn3 = document.createElement('div')
    txtIn3.classList.add('txtInclass03')
    L6.appendChild(txtIn3)
 
    const valIn3 = document.createElement('div')
    valIn3.classList.add('valclass')
    valIn3.setAttribute('id',thislotnumber[0]+'valIn3')
    L6.appendChild(valIn3)

//creation de la div btn_contaner    
    const btn_contaner = document.createElement('div')
    btn_contaner.classList.add('btn_contaner')
    expanddiv.appendChild(btn_contaner)
//creation du bouton finish et ajout de bouton a la div
    const finish_btn= document.createElement('button')
    finish_btn.classList.add("finish_btn",thislotnumber[0])
    btn_contaner.appendChild(finish_btn)

//creation du bouton delet et ajout de bouton a la div developable
    const delet_btn= document.createElement('button')
    delet_btn.classList.add("delet_btn",thislotnumber[0])
    delet_btn.setAttribute('id',"dlt"+thislotnumber[0])
    lastexpandbtn=delet_btn
    btn_contaner.appendChild(delet_btn)

    if(Listlotnumber.length>0){
    let fisrtNode=material_list.firstChild
    material_list.insertBefore(addedmaterialdiv,fisrtNode)
    }
    else {material_list.appendChild(addedmaterialdiv)}//inclu la div creer en js a la div list du html
    
    
    

}

function showData(){
    Array.from(document.getElementsByClassName('txtOutclass01')).forEach(item => item.innerText=currentlanguage[14])
    document.getElementById(thislotnumber[0]+"valOut1").innerHTML=thislotnumber[8].replaceAll(':','h')
    Array.from(document.getElementsByClassName('txtOutclass02')).forEach(item => item.innerText=currentlanguage[15])
    document.getElementById(thislotnumber[0]+"valOut2").innerHTML=thislotnumber[6]
    Array.from(document.getElementsByClassName('txtOutclass03')).forEach(item => item.innerText=currentlanguage[16])
    document.getElementById(thislotnumber[0]+"valOut3").innerHTML=thislotnumber[11].replaceAll(':','h')
    
    if( thislotnumber[9]){
        
    Array.from(document.getElementsByClassName('txtInclass01')).forEach(item => item.innerText=currentlanguage[17])
    document.getElementById(thislotnumber[0]+"valIn1").innerHTML=thislotnumber[9].replaceAll(':','h')
    Array.from(document.getElementsByClassName('txtInclass02')).forEach(item => item.innerText=currentlanguage[18])
    document.getElementById(thislotnumber[0]+"valIn2").innerHTML=thislotnumber[7]
    Array.from(document.getElementsByClassName('txtInclass03')).forEach(item => item.innerText=currentlanguage[19])
    document.getElementById(thislotnumber[0]+"valIn3").innerHTML=thislotnumber[10]
    }
}

function saveData(){
    localStorage.setItem('Listlotnumber',Listlotnumber)
    localStorage.setItem(thislotnumber[0],thislotnumber)
}

function createMaterial(event){
    event.preventDefault();// script anti refresh

    if(lotinput.value===""){return;}// pas d'action si champs vide

    //remplacement des espace par un tirer bas et passe le numero de lot un uppercase
    lotinput.value=lotinput.value.replaceAll(' ','_').toUpperCase()
  
    //detection de SJ deja existan et creation d'un  sj /+n
    if(Listlotnumber.includes(lotinput.value)){
        var arg=1
        var thisloop=1
        var lotnumberdiv=1
        while(thisloop===1){
            lotnumberdiv=lotinput.value+'/'+arg
            if(Listlotnumber.includes(lotnumberdiv)){arg++}
            else {lotinput.value=lotnumberdiv
                  thisloop=0}
            }
    }

    lifetime0=((hourinput.value*3600)+(minuteinput.value*60))//converti les heure et minute en timestamp
    if(lifetime0<1){return;}
    //creation du datestamp a l'heure courant du navigateur
    let datestamp0 =new Date()
    datestamp0=datestamp0.getTime()

    createArray(lotinput.value,lifetime0,null,datestamp0,null,null,null,null,null,null,null,null)
    
    computeData()
    saveData()
    createMaterialDiv()
    showData()
    //vidange des champs
    lotinput.value=""
    hourinput.value=""
    minuteinput.value=""
    checklifespan()
}

function action(e){
    checklifespan()
    const item= e.target;

//delete material
    if(item.classList[0]==="delet_btn"){
        id=item.classList[1]
        
        document.getElementById(id).remove()
        localStorage.removeItem(id)
        Listlotnumber.splice(index,1)
        localStorage.setItem('Listlotnumber',Listlotnumber)
    //strategie de viddange du localstorage
        let clearlocal=[null]
        var i =0
        Array.from(document.getElementsByClassName('materiallist')).forEach(item=>{
        clearlocal[i]=item.classList[1]
        i++
        })
        if(clearlocal[0]===null)
            {clearlocalstorage()}
        
      }


//show and hide material info and button
    else if(item.classList[0]==="lotnumberclass"){
        // determine le sj de la div cliquee    
        id=item.classList[1]
        index=Listlotnumber.indexOf(id)
        //charge les valeur depuis le localstorage pour le sj pointe    
        thislotnumber= Array.from(localStorage.getItem(id).split(','))

        const expanddiv = item.nextSibling;
        const delet_btn =document.getElementById("dlt"+thislotnumber[0])
        

            if(expanddiv.classList[2]==='hideSJdiv'&&lastexpenddiv===null){
                expanddiv.classList.remove('hideSJdiv')
                delet_btn.classList.remove('hideSJdiv')}
            
            else if(expanddiv.classList[2]==='hideSJdiv'){
                lastexpenddiv.classList.add('hideSJdiv')
                lastexpandbtn.classList.add('hideSJdiv')
                expanddiv.classList.remove('hideSJdiv')
                delet_btn.classList.remove('hideSJdiv')
                
                }

            else if(expanddiv.classList[2]!='hideSJdiv'){
                expanddiv.classList.add('hideSJdiv') 
                delet_btn.classList.add('hideSJdiv')      
                }  
            else{return}      
            lastexpenddiv=expanddiv
            lastexpandbtn= delet_btn    
    }


//complete la valeur datestamp1 et lance le calule de toute les valeur via computeData() 
     else if(item.classList[0]==="finish_btn"){
        let datestamp0 =new Date()
        thislotnumber[4]=datestamp0.getTime()
        computeData()
        computeData()
        showData()
    }   
}

function convertStampHM(time){
    var hours, minute,result
         if(time<3600){
            minute=Math.trunc(time/60)
            if(minute<10){result='00h0'+minute}
            else{result='00h'+minute}
            }
        else{
            hours=Math.trunc(time/3600)
            if(hours<10){hours='0'+hours}
            minute=Math.trunc((time-(hours*3600))/60)
            if(minute<10){minute='0'+minute}
            result=hours+'h'+minute
        }    
    return result
}

function convertStampDate(time){
    let now = new Date(time);
    var min=now.getMinutes()
    if(min<10){min='0'+now.getMinutes()}
    now=now.getDate() + ' ' + mountharray[now.getMonth()] +' '+ now.getFullYear() +'  '+ now.getHours()+':'+min
    return now

}

function clearlocalstorage(){
    var lang
    lang=localStorage.getItem('language');
    localStorage.clear();
    localStorage.setItem('language',lang);
}

function checklifespan(){
    //fonction test if product is expiered
    Array.from(document.getElementsByClassName('lotnumberclass')).forEach(item => {
        
        const id=item.classList[1]
        let array= Array.from(localStorage.getItem(item.classList[1]).split(','))
        let date =new Date()
        date=date.getTime()
        const thisspan =parseInt(array[3],10)+(parseInt(array[1],10)*1000)
        
        if(thisspan<date&&item.classList[2]!='expired'){
            item.classList.add('expired')
            }

    })
    }
