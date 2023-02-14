const form = document.querySelector('#form');
const btn = form.lastElementChild;
btn.addEventListener('click', (e) => {
    e.preventDefault();
    btn.innerHTML = '<i class="fa fa-refresh fa-spin"></i>';
    let addr = form.firstElementChild.value;
    let result = document.getElementById('result');
    console.log(addr)
    if(addr.length <= 1){
        result.innerHTML = 'Please enter atleast 2 letters in the box above';
        result.style.color = 'red';
        btn.innerHTML = '<i class="fa fa-search"></i>';
    } else {
        fetch(`http://localhost:3000/weather?address=${addr}`).then((response) => response.json().then((data) => {
            if(data.error){
                result.innerHTML = data.error;
                result.style.color = 'red';
            } else {
                result.innerHTML = data.forecast;
                result.style.color  = 'black';
            }
            btn.innerHTML = '<i class="fa fa-search"></i>';
        }))
    }
    
})

document.getElementById('search-text').addEventListener('focus', () => {
    btn.className = 'change';
})