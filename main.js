console.log("window.location.hash",window.location.hash)
console.log("window.location.port",window.location.port)
console.log("window.location.host",window.location.host)
console.log("window.location.hostname",window.location.hostname)

const hashLinks = document.querySelectorAll('.hash-route-link')

const app = document.querySelector('#app')

const routes = {
"" : {
  title: "Ana Sayfa",
  isApi : false,
  data:"./home.html",
},
"#todos" : {
  title: "Todo List",
  isApi : true,
  data: " https://jsonplaceholder.typicode.com/todos/",
},
"#about" : {
  title: "About Us",
  isApi : false,
  data: "./about-us.html"
  
},
"#contact" : {
  title: "Contact",
  isApi : false,
  data : "./contact.html"
  
}



}


function checkRoute (hash = window.location.hash) {
  // console.log(routes[hash].title)
  document.title = routes[hash].title
  const dataUrl = routes[hash].data
  console.log(dataUrl)
  const isApi = routes[hash].isApi
  if (isApi) {
    app.innerHTML = ""
    const createUl = document.createElement('ul')
    app.append(createUl)
    fetch(dataUrl).then(response => response.json()).then(data => {
      data.forEach(item =>{
        const createLi = document.createElement('li')
        createLi.innerHTML = item.title
        createUl.appendChild(createLi)
      })
      
    })
  }
  else if (!isApi)
  fetch(dataUrl).then(response => response.text()).then(data=> app.innerHTML = data)
}

hashLinks.forEach(item => item.addEventListener('click', (event) =>{ 
// console.log(event)
// console.log(item.hash)
checkRoute (item.hash);

})) 

checkRoute ();

