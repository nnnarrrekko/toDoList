let forms = document.forms;
let todo = [];
let inprog = [];
let donelist = [];
let lired = document.getElementsByClassName("li-red")
let liorange = document.getElementsByClassName("li-orange")
let ligreen = document.getElementsByClassName("li-green");
let all = document.getElementsByClassName("all");
let list = document.querySelector('#task-list > ul');
let listOnproc = document.getElementById("task-onproc")
let count1 = document.getElementsByClassName("count1")[0];
let count2 = document.getElementsByClassName("count2")[0];
let count3 = document.getElementsByClassName("count3")[0];
let onprogress = document.querySelector("#task-onproc > ul");
let done = document.querySelector("#done > ul");
count1.innerText = list.children.length;
count2.innerText = onprogress.children.length;
count3.innerText = done.children.length;
list.addEventListener('click', e => {
    if(e.target.className === 'delete') {
        let li = e.target.parentElement;
        list.removeChild(li);
        count1.innerText = list.children.length;
    }
})
let adding = document.getElementById("hide")
adding.addEventListener("change", e => {
    if(adding.checked) {
        list.style.display = "none";

    } else {
        list.style.display = "block";
    }
})

let newtask = forms["add-task"];
newtask.addEventListener("submit", b => {
    b.preventDefault()
    let value = newtask.querySelector("[type=text]").value;
    if(value){
        let li = document.createElement("li");
        let name = document.createElement("span");
        let del = document.createElement("span");
        let ad = document.createElement("span");
        del.classList.add("delete");
        ad.classList.add("add-to")
        li.classList.add("li-red")
        name.classList.add("name");
        ad.setAttribute("onclick", "start()")
        name.innerText = value;
        ad.innerText = "+"
        del.innerText = "-";
        li.appendChild(name);
        li.appendChild(del);
        li.appendChild(ad)
        list.appendChild(li);
        newtask.querySelector('[type=text]').value = '';
        count1.innerText = list.children.length
        todo.push(li.firstChild.innerText)
        start();
        end();

    }
})
let search = forms["search-task"];
search.addEventListener("keyup", e => {
    let lis = list.querySelectorAll('li');
    let value = search.querySelector('[type=text]').value.toLowerCase();
    Array.from(lis).forEach(item => {
        if(item.firstElementChild.textContent.toLowerCase().includes(value)) {
            item.style.display = "block"
        } else {
            item.style.display = "none"
        }
    })
})
let onproc = document.getElementsByClassName("add-to");
function start(){
    for(let i = 0; i < onproc.length; i++){
        onproc[i].addEventListener("click", e => {
            let li = e.target.parentElement;
            let newli = document.createElement("li");
            let name = document.createElement("span");
            let done = document.createElement("span");
            let del = document.createElement("span");
            del.classList.add("delete");
            name.classList.add("name");
            done.classList.add("done");
            newli.classList.add("li-orange")
            done.innerText = "Done";
            name.innerText = li.firstElementChild.innerText;
            del.innerText = "-";
            list.removeChild(li)
            newli.appendChild(name)
            newli.appendChild(del)
            newli.appendChild(done)
            onprogress.appendChild(newli);
            count2.innerText = onprogress.children.length;
            count1.innerText = list.children.length;
            end()
            inprog.push(li.firstElementChild.innerText);
            todo.pop(li.firstElementChild.innerText);
        })
    }
}
onprogress.addEventListener('click', e => {
    if(e.target.className === 'delete') {
        let li = e.target.parentElement;
        onprogress.removeChild(li);
        count2.innerText = onprogress.children.length;
    }
})

let donebut = document.getElementsByClassName("done");
function end(){
    Array.from(donebut).forEach(item => {
        item.addEventListener("click", e => {
            let li = e.target.parentElement;
            let newli = document.createElement("li");
            let name = document.createElement("span");
            name.classList.add("name");
            newli.classList.add("li-green");
            name.innerText = li.firstElementChild.innerText;
            onprogress.removeChild(li);
            newli.appendChild(name);
            done.appendChild(newli);
            count1.innerText = list.children.length;
            count2.innerText = onprogress.children.length;
            count3.innerText = done.children.length
        })
    })
}
start();
end();
