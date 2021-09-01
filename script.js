console.log('hello!')


function getT2WResult(eventId, raceId, apiKey, page, callback)
{
    var urlResult = 'https://time2win.at/api/1.1/results/' + eventId + '/individuals?race_id=' + raceId + '&data_extra=splits,laps,positions' + '&apikey=' + apiKey;

    console.log(urlResult);

    if ( (page==1) || (page == undefined))
    {
        ResultBuffer = [];
        page = 1;
    }

    $.ajax({
        xhrFields: {
            withCredentials: false
        },
        type:"GET",
        url: (urlResult + '&page=' + page),
        dataType: 'json',
        success: function(data, status)
        {
            for (var i=0; i<data.list.length; i++){							
                ResultBuffer.push(data.list[i]);							
            }

            if(data.page_more == true)
            {
                console.log("next page " + (page+1));
                getT2WResult(eventId, raceId, apiKey, page+1, callback);
            } else {
                console.log("load all results");
                
                callback(ResultBuffer);

                //console.log("result set");
            }
        }
    });
}