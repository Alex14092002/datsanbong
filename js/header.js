const header = document.querySelector('.header')
const phone = localStorage.getItem('signedInPhone')
console.log(phone);
if(phone){
    header.innerHTML += `
    <div>
        <img src="https://media.istockphoto.com/id/525417233/vi/vec-to/logo-c%C3%A2u-l%E1%BA%A1c-b%E1%BB%99-b%C3%B3ng-c%E1%BA%A7u-l%C3%B4ng.jpg?s=170667a&w=0&k=20&c=3SR9wePFWD3euz-YHQLnyWYoJPcdfa0zRITn8EBfoxw=" width="100px"/>
    </div>
<div>
<a class="btn btn-primary" href="../edit_user.html">Xin chào ${phone}</a>
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

