
let currentIndex=0;
let test=0;

let slides = document.querySelectorAll('.slide');

const prev = document.getElementById('prev');
prev.addEventListener('click', prevSlide)

const next = document.getElementById('next');
next.addEventListener('click', nextSlide)

function show(index){
    if (index < 0) {
        index = slides.length - 1;
   } else if (index >= slides.length) {
        index = 0;
   }
   
   currentIndex = index;

   for (let i = 0; i < slides.length; i++){
      if(i === currentIndex) {
         slides[i].classList.add('active');
         slides[i].classList.remove('slide');
      }
      if(i !== currentIndex) {
        slides[i].classList.remove('active');
        slides[i].classList.add('slide');
      }
   }

}

function nextSlide() {
    show(currentIndex + 1);
}

function prevSlide() {
     show(currentIndex - 1);
}


const kart = document.getElementById('carrello');
kart.addEventListener('click', ticket)

function ticket(){
  if(test===0){
    let valore = document.createElement('strong');
    valore.textContent = "Effettuare prima l'accesso, clicca su ACCEDI";
    let container = document.querySelector('.market');
    container.appendChild(valore);
    let container2 =document.querySelector('#imgcentrale');
    container2.src="img/errore.jpg";
    test=1;
  }
  else{
    let container = document.querySelector('.market');
    container.innerHTML='';
    let container2 =document.querySelector('#imgcentrale');
    container2.src="img/dolcenera.png";
    test=0;
  }
}


function onJsonemail(json) {
  const verifica = document.querySelector('#verifica-email');
  verifica.innerHTML = '';
  const stato=json.status;
  let ritorno;
  if(stato==200){
    ritorno=json.email;
  }
  else{
    ritorno=json.error;
  }
  const emailmessaggio = document.createElement('strong');
  emailmessaggio.textContent=ritorno;
  verifica.appendChild(emailmessaggio);
}

function onResponseemail(response) {
  console.log('Risposta ricevuta');
  return response.json();
}

function searchemail(event)
{
  event.preventDefault();

  const email_input = document.querySelector('#form1');
  const email_value = encodeURIComponent(email_input.value);
  rest_url = 'https://api.mailcheck.ai/email/' + email_value;
  fetch(rest_url).then(onResponseemail).then(onJsonemail);
}

const form1 = document.querySelector('#formemail');
form1.addEventListener('submit', searchemail)






function onJson(json) {
  console.log('JSON ricevuto');
  const vista = document.querySelector('#image_view');
  vista.innerHTML = '';
  const image_data = json;
  const title = image_data.description;
  const selected_image = image_data.urls.small;
  const album = document.createElement('div');
  album.classList.add('albumwed');
  const img = document.createElement('img');
  img.src = selected_image;
  const caption = document.createElement('span');
  caption.textContent = title;
  album.appendChild(img);
  album.appendChild(caption);
  vista.appendChild(album);
}

function onResponse(response) {
  console.log('Risposta ricevuta');
  return response.json();
}

function search(event)
{
  event.preventDefault();

  fetch("https://api.unsplash.com/photos/random",
    {
      headers:
      {
        'Authorization': 'Bearer ' + token
      }
    }
  ).then(onResponse).then(onJson);
}

function onTokenJson(json)
{
  console.log(json)
  token = json.access_token;
}


function onTokenResponse(response)
{
  return response.json();
}


const clientid = 'Ns0ASiwALzmQhu6hP5YT67X8rRRXENrTC3jSnWW8bW0';
const secret= 'cIuJ_dWpl8rYeg1C8aWomOZU11cPrnuHRyPyVzWAHnc';
const _access_token_url = 'https://unsplash.com/oauth/token';

fetch(_access_token_url,
{
	method: 'POST',
	body: 'grant_type=client_credentials&client_id=' + clientid + '&client_secret=' + secret,
	headers:
	{
		'Content-Type': 'application/x-www-form-urlencoded'
	}
}
).then(onTokenResponse).then(onTokenJson);

const imgrandom = document.getElementById('imgrandom');
imgrandom.addEventListener('click', search)