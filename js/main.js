import {key} from './key.js'

let metObjects = 'https://collectionapi.metmuseum.org/public/collection/v1/objects'

fetch (metObjects)
    .then(res => res.json())
    .then(data => {
        console.log(data)

        let maxMet = Number(data.total)
        console.log(maxMet) //490874

        let randomMet = Math.floor(Math.random()*maxMet)
        console.log(randomMet)

        let displayRandom = data.objectIDs[randomMet]
        console.log(displayRandom)

        let metObject = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${displayRandom}`
        fetch (metObject)
            .then(res=>res.json())
            .then(data => {
                console.log(data)

                document.querySelector('#metTitle').innerText = data.title
                
                if (!data.primaryImage=="") {
                    document.querySelector('img').src = data.primaryImageSmall
                } else {
                document.querySelector('#error').innerText = 'Woops, there\'s no image for this.'
                }

                document.querySelector('#info').innerHTML = `For more info click <a target="_blank" href="${data.objectURL}">here</a>.`

                let beginDate = data.objectBeginDate
                let endDate = data.objectEndDate
                let historicalEventBegin = `https://api.api-ninjas.com/v1/historicalevents?year=${beginDate}`
                let historicalEventEnd = `https://api.api-ninjas.com/v1/historicalevents?year=${endDate}`


                fetch(historicalEventBegin, {
                    method: 'GET',
                    url: 'https://api.api-ninjas.com/v1/historicalevents?year=' + historicalEventBegin,
                    headers: { 'X-Api-Key': key},
                    contentType: 'application/json',
                    success: function(result) {
                        console.log(result);
                    },
                    error: function ajaxError(jqXHR) {
                        console.error('Error: ', jqXHR.responseText);
                }})
                    .then(res => res.json())
                    .then(data => {
                        console.log(data, 'historicalEventBegin')
                        document.querySelector('#begin').innerText = `and a historical event that happened at the start of the piece in ${beginDate}...`
                        document.querySelector('#beginEvent').innerText = data[0].event
                    })

                fetch(historicalEventEnd, {
                    method: 'GET',
                    url: 'https://api.api-ninjas.com/v1/historicalevents?year=' + historicalEventEnd,
                    headers: { 'X-Api-Key': key},
                    contentType: 'application/json',
                    success: function(result) {
                        console.log(result);
                    },
                    error: function ajaxError(jqXHR) {
                        console.error('Error: ', jqXHR.responseText);
                }})
                    .then(res => res.json())
                    .then(data => {
                        console.log(data, 'historicalEventEnd')
                        document.querySelector('#end').innerText = `...and at the year of completion, in ${endDate}.`
                        document.querySelector('#endEvent').innerText = data[0].event
                    })
            })

            //objectBeginDate, accessionYear, objectEndDate, objectDate
        })



































// let year = 














    

// //run function getAPOD when button is clicked (if no date is added default is today)
// document.querySelector('button').addEventListener('click', getAPOD)

// function loading(ms) {
//     return new Promise(loaded => setTimeout(loaded, ms));
// }

// function getAPOD() {
//     document.querySelector('h3').innerText = 'Your photo is on it\'s way! 🚀'; //would like to add a little animation hmm
//     document.querySelector('p').innerText = ''
//     document.querySelector('img').src = ''
//     loading(1000).then(() => {
//     let date = document.querySelector('input').value
//     fetch(`${url}&date=${date}`)
//     .then(res => res.json())
//     .then(data => {
//         console.log(data)
//         document.querySelector('h3').innerText = data.title
//         document.querySelector('p').innerText = data.explanation
//         if (data.media_type==='image') {
//             document.querySelector('iframe').classList.add('hidden')
//             document.querySelector('img').classList.remove('hidden')
//             document.querySelector('img').src = data.url
//             console.log(document.querySelector('iframe').classList, document.querySelector('img').classList)
//         } else {
//             document.querySelector('img').classList.add('hidden')
//             document.querySelector('iframe').classList.remove('hidden')
//             document.querySelector('iframe').src = data.url
//             console.log(document.querySelector('iframe').classList, document.querySelector('img').classList)
//         }
//     })
//     })
// }


// // //https://www.youtube.com/watch?v=0dmS0He_czs

// // // function getSpotify(championName) {
// // //     console.log(spotifyClientID, spotifyClientSecret, championName,'working')
// // //     fetch('https://accounts.spotify.com/api/token', {
// // //         method: 'POST',
// // //         headers: {
// // //             'Content-Type' : 'application/x-www-form-urlencoded',
// // //             'Authorization' : 'Basic ' + btoa(spotifyClientID+':'+spotifyClientSecret)
// // //         },
// // //         body: 'grant_type=client_credentials'
// // //     })
// // //         .then(res = console.log(res))
// // //         .then(data => {
// // //             let token = data.access_token;
// // //             console.log(data)
// // //             console.log(data.access_token);
// // //         })

// // //     // fetch(`https://api.spotify.com/v1/search?query=${championName}&type=playlist&locale=en-US%2Cen%3Bq%3D0.6&offset=0&limit=20`)
// // // }