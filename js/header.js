const header = document.querySelector('.header')
const phone = localStorage.getItem('signedInPhone')
console.log(phone);
if(phone){
    header.innerHTML += `
<h5>Web đặt sân cầu lông</h1>
<div>
<a class="btn btn-primary" href="">Xin chào ${phone}</a>
<button type="button" id="logOut" class="btn btn-danger">Đăng xuất</button>
</div>

`
} else{
    header.innerHTML += `
    <h5>Web đặt sân cầu lông</h1>
    <a class="btn btn-primary" href="../user.html">Đăng nhập/Đăng ký</a>
    `
}

const btnlogOut = document.querySelector('#logOut')
btnlogOut.addEventListener('click', ()=>{
    localStorage.removeItem('signedInPhone')
    localStorage.removeItem('signedInUserId')
    location.reload()
})

