let data;
let result = [];

fetch("./travel_recommendation_api.json")
.then((response)=>{return response.json()})
.then((d)=>{data=d; console.log(d)})
.catch((err)=>{console.log(err)});

document.getElementById("clear").addEventListener("click", ()=>{
    document.getElementById("keyword").value = "";
    result = [];
})

document.getElementById("search").addEventListener("click", search);

function search(){
    result = [];
    let prompt = document.getElementById("keyword").value.trim().toLowerCase();
    if (prompt.includes("beach")){
        data.beaches.forEach(element => {
            result.push(element);
        });
    }
    if (prompt.includes("temple")){
        data.temples.forEach(element => {
            result.push(element);
        });
    }
    data.beaches.forEach(element => {
        if(element.name.toLowerCase().includes(prompt) && !result.includes(element)){
            result.push(element);
        }
    });
    data.temples.forEach(element => {
        if(element.name.toLowerCase().includes(prompt) && !result.includes(element)){
            result.push(element);
        }
    });
    data.countries.forEach(element=>{
        element.cities.forEach(subElement=>{
            if(subElement.name.toLowerCase().includes(prompt)){
                result.push(subElement);
            }
        })
    })
    displayResults();
}

function displayResults(){
    document.getElementById("result").innerHTML="";
    if(!result.length){
        alert("No result found");
        document.getElementById("keyword").focus();
    }else{
        result.forEach(element=>{
            document.getElementById("result").innerHTML+=`
                <div class="resultCard">
                    <img src="${element.imageUrl}"/>
                    <div class="cardText">
                        <h3>${element.name}</h3>
                        <p>${element.description}</p>
                        <button>Visit</button>
                    </div>
                </div>
            `
        })
    }
}