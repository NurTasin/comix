function sha256(msg){
    const shaObj = new jsSHA("SHA-256", "TEXT", { encoding: "UTF8" });
    shaObj.update(msg);
    return shaObj.getHash("HEX");
}
const unamehashed="97e2f08f2fa4899259375857fac479eded2b079b7b64e3230c1f6b4ce358b81a"
const pwordhashed="b27b52491894901e7da1709f4286ee2de0835231751437c093f68fb540fb366e"
const unameField=document.querySelector("#uname")
const pwordField=document.querySelector("#pword")
const loginPage=document.querySelector("#login")
const comixPage=document.querySelector("#page")
const nextPageBtn=document.querySelector("#next")
const previousPageBtn=document.querySelector("#previous")

const MAXPAGE=32;
const MINPAGE=0;
var currentPage=0;
var username="";
var password="";

function updatePage(){
    //http://parahin-img-cdn.herokuapp.com/?uname=$user&pword=$pword&fname=$file
    var href=`http://parahin-img-cdn.herokuapp.com/?uname=${username}&pword=${password}&fname=${currentPage}.jpeg`;
    comixPage.style.backgroundImage='url('+href+")";
    if(currentPage==MAXPAGE){
        nextPageBtn.style.display="none";
    }
    else{
        nextPageBtn.style.display="flex";
    }
    
    if(currentPage==MINPAGE){
        previousPageBtn.style.display="none";
    }
    else{
        previousPageBtn.style.display="flex";
    }
}


function login(){
    if (sha256(unameField.value)===unamehashed && sha256(pwordField.value)===pwordhashed){
        username=unameField.value
        password=pwordField.value
        loginPage.style.display="none";
        updatePage();
    }
    else{
        unameField.value="";
        pwordField.value="";
        unameField.style.borderColor="red";
        pwordField.style.borderColor="red"
    }
}

function nextPage(){
    if (currentPage<MAXPAGE){
        currentPage++;
    }
    updatePage();
}
function previousPage(){
    if (currentPage>MINPAGE){
        currentPage--;
    }
    updatePage();
}