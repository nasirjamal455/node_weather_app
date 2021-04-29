console.log("javascript file is loaded correctly")


const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#data-1')
const messageTwo = document.querySelector('#data-2')

weatherform.addEventListener('submit', (e)=>{
    e.preventDefault()
    const place_name = search.value 
    messageOne.textContent= "loading ..."
    messageTwo.textContent = ''
    fetch('/weather?address='+place_name).then((response)=>{
    response.json().then((data)=>{
        
        if(data.err){

        messageOne.textContent = data.err
        }else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})
})