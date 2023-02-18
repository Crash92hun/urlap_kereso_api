const state ={
    teendok:[],
    szures:{
        userId:"",
        title:"",
        completed:null

    },
    isPending:false
};



document.getElementById('loaddoc').onclick=loadDoc;
document.getElementById('urlap').onsubmit=function(event){
    event.preventDefault();
    state.szures.userId=event.target.elements.userid.value;
    state.szures.title=event.target.elements.title.value;
    loadDoc();
}
function szures(){
    state.isPending=true;
    state.teendok=state.teendok.filter(function(item){
    
        return (state.szures.userId?item.userId==state.szures.userId:true)
        && (state.szures.title?item.title.includes(state.szures.title):true);
   
    });
    state.isPending=false;
}
function render(){
    let adatok = document.getElementById("adatok");
    adatok.innerHTML="";
    state.teendok.forEach(function(item){
        let sor = document.createElement('div');
        sor.className="sor";
        sor.innerHTML=`userId: ${item.userId}, title${item.title} (${item.completed})`;
        adatok.appendChild(sor);
    })
}
function loadDoc(){
   const xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        //0-4 ig valtozhat az erteke
        console.log(xhttp.readyState && xhttp.status)
        if(xhttp.readyState==4 && xhttp.status==200){
            console.log("Minden ok!")
        }else{
            state.isPending = true;
            console.log("töltődik...", this.readyState);
        }
    };
    /*
    xhttp.onloadstart = function(){
        console.log("OnloadStart");
    };
    xhttp.onloadend = function(){
        console.log("OnloadEnd");
    };
    xhttp.onerror = function(){
        console.log("hiba", xhttp.status);
    };
    */
    xhttp.onload = function(){
        state.teendok = JSON.parse(this.responseText);
        console.log(state.teendok)
        state.isPending = false;
        szures();
        render();
    }

    xhttp.open("GET","https://jsonplaceholder.typicode.com/todos", true);
    xhttp.send();
}; //loadDoc vége

