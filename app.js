console.log();

// elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("content_list");
const input = document.getElementById("input");

// classes
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle"; 
const LINE_THROUGH = "lineThrough";

// variables
let LIST, id;

// get item from localstorage
let data = localStorage.getItem("TODO");

// check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; //set the id to the last one in the list
    loadList(LIST); //load the list to the user interface
}else{
    // if data isn't empty
    LIST =[];
    id = 0 ;
}
// load items to the user interface
function loadList(array){
    array.array.forEach(item => {
         addToDo(item.name, item.id, item.done, item.trash);
    });
}
// cleaar the local storage
clear.addEventListener("click", () => {
        localStorage.clear();
        location.reload();
    });
// date
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-us", options);

// todo function
function addToDo(toDo, id, done, trash){
    if(trash){return;}

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const item = `
    <li class="content_item">
    <i class="fa ${DONE}" job="complete" id="${id}"></i>
    <p class="text ${LINE}">${toDo}</p>
    <i class="fa-solid fa-trash" job="delete" id="${id}"></i>
</li>
                `;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}


// add item to list using enter key
document.addEventListener("keyup", function(event){
    if(event.keyCode == 13){
        const toDo = input.value;
        // if the input isn't empty
        if(toDo){
            addToDo(toDo, id, false, false);

            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });

            // add item to localstorage
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
        }
        input.value ="";
    }
});

// COMPLETE TO DO

function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;

}

// remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

list.addEventListener("click", function(event){
    const element = event.target; //returns the clicked element inside the list
    const elementJob = element.attributes.job.value;  //complete or delete;

    if(elementJob == "complete"){
        completeToDo(element);
    }
    else if(elementJob == "delete"){
        removeToDo(element);
    }

    // add item to localstorage
    localStorage.setItem("TODO", JSON.stringify(LIST));
});


