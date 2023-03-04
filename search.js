// let clearHistoryBtn= document.getElementById('clearHistory');  //clear button of history page
let displayHistoryDiv= document.querySelector('.DisplyHistory');  //display history of history page
let searchList={};
if(localStorage.getItem('searchList')){
    searchList=JSON.parse(localStorage.getItem('searchList'));
    searchList.forEach((item)=>{
        displayHistoryDiv.innerHTML+=`
        <div class="para">
            <p>${item.value}</p>
            <p>${item.date} ${item.time}</p>
        </div>
        `
    })
}

let para=[];
document.querySelectorAll('.para')?para=document.querySelectorAll('.para'):para=[];
para.forEach((ele)=>{
    console.log(ele);
    ele.addEventListener('click',()=>{
        
    })
})
