let todo = document.getElementById("include");
let target = document.getElementById('target');
document.getElementById("save").style.display = "none"
let a=document.getElementById('save').addEventListener('click',()=>{
    iterateAjax(todo.children);
    iterateAjax(target.children);
})
function clicked(checkbox) {
    checkbox.addEventListener("click",(event) => {
        let ctarget =event.currentTarget;
        let parentElement = ctarget.parentElement;
        let input = parentElement.children[1];
        if(checkbox.checked){
            target.appendChild(parentElement)
        }else{
            todo.appendChild(parentElement)
        }
        console.log(input)
        sendData({
            input:input.innerText,
            checked:checkbox.checked
        })
    })
}
document.getElementById("form").addEventListener("submit",(event) => {
    event.preventDefault();
    let input = document.getElementById('tache');

    let span = document.createElement('span');
    let checkbox = document.createElement("input");
    let div = document.createElement('p');

    span.innerText = input.value;
    div.append(checkbox);
    div.append(span);
    checkbox.type = "checkbox";
    todo.prepend(div);
    clicked(checkbox)

    sendData({
        input:input.value,
        checked:checkbox.checked
    })
})
function iterate(target) {
    let child = target.children;
    for(let i = 0;i < child.length;i++){
        clicked(child[i].children[0]);   
    }
}
function iterateAjax(target) {
    for(let i = 0;i < target.length;i++){
        let checkbox = target[i].children[0];
        let span = target[i].children[1];
    
        if(span !== undefined) {
            sendData({
                input:span.innerText,
                checked: checkbox.checked
            })
        }
        
    }
}
function sendData(data) {
    let formData = new FormData();
    formData.append("tache",data.input);
    formData.append("checked",data.checked);

    fetch("formulaire.php",{
        method:"post",
        body:formData
    }).then(res => res.text()).then(data => console.log(data)).catch(err => console.log(err))
}
fetch('contenu.php',{
    method:'get'
})
.then(value => value.json())
.then(value => {
    let todolist = value.todo;
    let finish = value.finish;

    todolist.forEach(value => {
        todo.innerHTML += value;
    })
    finish.forEach(value => {
        target.innerHTML += value;
    })
    iterate(todo)
    iterate(target)
})
.catch(err => console.log(err))