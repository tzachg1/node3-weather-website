console.log('Client side javascript file is loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const ms1 = document.querySelector('#ms1')
const ms2 = document.querySelector('#ms2')


weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    const location = search.value
    ms1.textContent = 'Loading...'
    ms2.textContent = ''
    fetch('http://localhost:3000/weather?address='+location).then((respones) => {
        respones.json().then((data) =>{
    if(data.error){
            return ms1.textContent = (data.error)
            
        }
        ms1.textContent = data.location,
        ms2.textContent = data.forecast

    
        })
    })
})