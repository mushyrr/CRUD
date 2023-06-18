const title = document.querySelector('.inputTitle');
const price = document.querySelector('.price');
const taxes = document.querySelector('.taxes');
const total = document.querySelector('.total');
const creat = document.querySelector('.creat');
const cuont = document.querySelector('.cuont');
const totalBox = document.querySelector('.totalBox');
const search = document.querySelector('.search');

let forUpdate ;

let datapro ;


if (localStorage.product){
    datapro = JSON.parse(localStorage.product);
}else{
    datapro = [];
}


function myTotal(){
    if(price.value != ''){
        let result = +price.value + +taxes.value
        total.innerHTML = result
        totalBox.classList.add('done')

    }else{
        total.innerHTML = '';
        totalBox.classList.remove('done')

    }
}
price.addEventListener('input', ()=> myTotal());
taxes.addEventListener('input', ()=> myTotal());


showDate()

creat.addEventListener('click' ,()=>{
let newprow = {
    title : title.value,
    price : price.value,
    taxes : taxes.value,
    cuont : cuont.value,
    total : +price.value + +taxes.value 
};
if (title.value != '' && price.value != '' && cuont.value < 50){
    if(creat.textContent == 'Create'){
        if (newprow.cuont > 1){
            for(let i = 0; i < newprow.cuont ; i++){
                datapro.push(newprow)
            }
        }else{
            datapro.push(newprow)
        }
    }else{
        datapro[forUpdate] = newprow;
        cuont.classList.remove('none');
        creat.innerHTML = 'Create';
    }




    localStorage.setItem('product' , JSON.stringify(datapro))
    
    clearData()

}
showDate()
});



function showDate(){

    myTD(datapro.length);



    let myDeleteAll = document.getElementById('myDeleteAll');
   
    if (datapro.length > 0){
        myDeleteAll.innerHTML = `
        <button class="deleteAll btn" onclick="deleteAll()">Delte All</button>
        `
    }else{
        setTimeout(()=>myDeleteAll.innerHTML = '' , 1000);
    }
}

function clearData(){
    title.value = '';
    taxes.value = '';
    price.value = '';
    cuont.value = '';
    myTotal()
}

function deleteDate(i){
    datapro.splice(i,1)
    localStorage.product = JSON.stringify(datapro);
    showDate()
}

function deleteAll(){
    localStorage.removeItem('product')
    datapro.splice(0)
    showDate()
    
}
function update(i){
    title.value = datapro[i].title
    price.value = datapro[i].price
    taxes.value = datapro[i].taxes
    myTotal()
    cuont.classList.add('none')
    creat.innerHTML = 'update'
    forUpdate = i
    
}




search.addEventListener('input',()=>{
   let searchValue = search.value
   let table =''

   for(let i = 0 ; i < datapro.length ; i++){
    if(datapro[i].title.includes(searchValue))
    table += `
    <tr class="flexR">
    <td>${i}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].total}</td>
    <td><submit onclick="update(${i})" id="update">update</submit></td>
    <td><submit onclick="deleteDate(${i})" id="delete">delete</submit></td>
    </tr>
    `
}
document.getElementById('tbody').innerHTML = table

})



var checkbox = document.getElementById("checkbox");
var isChecked = checkbox.checked;

checkbox.addEventListener('click', ()=>{

    if (isChecked) {
        console.log("The checkbox is checked");
        // Perform actions for when the checkbox is checked
      } else {
        console.log("The checkbox is not checked");
        // Perform actions for when the checkbox is not checked
      }
})

















function myTD(leng)
{
    let table = '';
for(let i = 0 ; i < leng ; i++){
    //myTD(table , i)
    table += `
    <tr class="flexR">
    <td>${i}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].total}</td>
    <td><submit onclick="update(${i})" id="update">update</submit></td>
    <td><submit onclick="deleteDate(${i})" id="delete">delete</submit></td>
    </tr>
    `
}
document.getElementById('tbody').innerHTML = table
let myDeleteAll = document.getElementById('myDeleteAll');

if (datapro.length > 0){
    myDeleteAll.innerHTML = `
    <button class="deleteAll btn" onclick="deleteAll()">Delte All</button>
    `
}else{
    setTimeout(()=>myDeleteAll.innerHTML = '' , 1000);
}
}