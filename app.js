let isFetching = false
let accessToken
const recherche = document.getElementById('search')
const affiche = document.getElementById('img-artist')


const getUrlParameter = (sParam) => {
  let sPageURL = window.location.search.substring(1),////substring will take everything after the https link and split the #/&
      sURLVariables = sPageURL != undefined && sPageURL.length > 0 ? sPageURL.split('#') : [],
      sParameterName,
      i;
  let split_str = window.location.href.length > 0 ? window.location.href.split('#') : [];
  sURLVariables = split_str != undefined && split_str.length > 1 && split_str[1].length > 0 ? split_str[1].split('&') : [];
  for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] === sParam) {
          return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      }
  }
};

const auth = () => {
  accessToken = getUrlParameter('access_token');
  let client_id = "1d0ad851d2c64e5588725f306f5d3c10"
  let redirect_uri = "http://localhost:5500/"

  const redirect = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}`;
  // Don't authorize if we have an access token already
  if (accessToken == null || accessToken == "" || accessToken == undefined) {
    window.location.replace(redirect);
  }
};



const getAllInfo = async () => {
    
    const response = await fetch(`https://api.spotify.com/v1/search?q=${result}&type=artist`,{
            type: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + accessToken
        }
    })
    .then(res => res.json())
    .then(res => res.artists)
    .then(res => res.items)
    console.log(response)
    let tabImg = []
    response.map(img=>(
        tabImg.push(img.images)
    ))
    console.log(tabImg)
    affiche.innerHTML =(
        response.map(res =>(
            `  <div class="container-artist" >
                    <img src='${tabImg['url']}' alt='not found'/> 
                    <h1>${res.name}</h1>
                    

                </div>
            ` 
        )).join('')
    )
    
}

recherche.addEventListener('input',function(e){
    result = e.target.value
    console.log(result)
})

auth();