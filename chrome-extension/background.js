const apiUrl = 'https://pi7r00gio5.execute-api.eu-central-1.amazonaws.com/live/gold/info/offer';

chrome.webNavigation.onCommitted.addListener(function(details)
    {
        let url = JSON.stringify(details.url);
        console.log(url);
    },
    {   //todo find a closer match to trigger the script less, allegro.pl/oferta doesn't apply to all offers
        url: [{urlMatches : 'https://roll20.net/*'}]
    }
);




function getOfferData(offerIds) {
    //check if offers are in cache AND is not too old
    for(offer of offerIds) {
        //let r = getOffer(offer);
        //console.log(r);
        chrome.storage.local.set({
            [offer]: 'fetching...'
        });



        fetch('https://pi7r00gio5.execute-api.eu-central-1.amazonaws.com/live/gold/info/offer', {
            method: 'GET',
            headers: new Headers({
                'offer': offer
            })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                chrome.storage.local.set({
                    [data.offerId]: data
                });
              })
        .catch(error => console.error(error));
    }
}