let speach = ["./Images/home_page_2.png","./Images/home_page_3.png","./Images/home_page_4.png","./Images/home_page_5.png","./Images/home_page_6.png"];
let i=0;

function changespeach(){
    if (i>=speach.length){
        document.getElementById("planet").scrollIntoView({ behavior: 'smooth'});
    }
    else{
        var img = document.createElement('img');
        img.src = speach[i];
        document.getElementById("speach").src = img.src;
        i++;
    }
}