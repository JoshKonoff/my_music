
// declarations for song values 
let song;
let playSong;

//spotify client creds 
const clientId = "0b3c09dd546f418d8c2cb8fd779c4c88";
const clientSecret = "3aa6945aadeb47dfa4b67950166f53e3";


const _getToken = async () => {
    const result = await fetch(`https://accounts.spotify.com/api/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });
    // access the data given to us by the fietch response (promise)
    const data = await result.json();
    return data.access_token
}


// function to get song info when image figure is clicked 
/**
 * @param img_index
 * @param item_index
 * 
 * funciton gets song from spotify using the image index of our gallery.
 * then finds the correct item-index inside of the json response data from spotify
 * which will produce a preveiw url that will be used to paly song form soundtrack. 
 */

 async function clickedEvent(img_index, item_index){
     //get track name
    let track = document.getElementsByTagName('img')[img_index].attributes[2].value
    // get token
    let token = await _getToken();

    let headers = new Headers([
        ['Content-Type', 'application/json'],
        ['Accept', 'application/json'],
        ['Authorization', `Bearer ${token}`]
    ]);

    let request = new Request(`https://api.spotify.com/v1/search?q=${track}&type=track&limit=15`, {
        method: 'GET',
        headers: headers 
    });

    let result = await fetch(request);

    let response = await result.json();

    console.log(response)
    let song = response.tracks.items[item_index].preview_url
    
    //TODO: add song variable for url_preview data 
    // Todo: Add songSnippet function to play the selected song
    songSnippet(song);
}


/**
* @param id
* @param event
*
*
*/

function getSong(id,event){
    switch(id){
        case 'fig1':{
            event.stopPropagation();
            clickedEvent(0,3)
            break;
        }
        case 'fig2':{
            event.stopPropagation();
            clickedEvent(1,3)
            break;
        }
        case 'fig3':{
            event.stopPropagation();
            clickedEvent(2,3)
            break;
        }
        case 'fig4':{
            event.stopPropagation();
            clickedEvent(3,5)
            break;
        }
        case 'fig5':{
            event.stopPropagation();
            clickedEvent(4,0)
            break;
        }
        case 'fig6':{
            event.stopPropagation();
            clickedEvent(5 ,1)
            break;
        }
    }
}


/**
 * @param url
 * 
 * url = Song Preview_url
 * 
 * Function will return an audio clip given by the preview url
 */

function songSnippet(url){
    playSong = new Audio(url);
    return playSong.play();
}


function stopSnippet(){
    
    return playSong.pause();

}

let trackss = document.getElementsByTagName('img')

for (let i = 0; trackss.length; i++){
    console.log(trackss[i])
}