document.getElementById('input').addEventListener("keyup",function(ev){
    console.log(ev.keyCode);
    if(ev.keyCode == 13){
        if(ev.currentTarget.value == 123){
            alert("Correct!");
        }
        else{
            alert("Nope");
        }
    }
});

document.getElementById("div_password").setAttribute("style","width:200px");
// document.getElementById("div_password").setAttribute("position","width:500px");