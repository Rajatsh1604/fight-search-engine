function returnCheck(){
    var chkreturn = document.getElementById("chkreturn");
        var oneWaycheck = document.getElementById("oneWaycheck");
        oneWaycheck.style.display = chkreturn.checked ? "grid" : "none";
}


let formdata = [];
        // example {id:1592304983049, title: 'Deadpool', year: 2015}
        const userInput = (ev)=>{
            ev.preventDefault();  //to stop the form submitting
            let userdata = {
                roundtrip: document.getElementById('chkreturn').value,
                oneway: document.getElementById('chkoneWay').value,
                originCity: document.getElementById('originCity').value,
                destinationCity: document.getElementById('destinationCity').value,
                departureDate: document.getElementById('departureDate').value,
                returnDate: document.getElementById('returnDate').value,
                passengersCount: document.getElementById('passengersCount').value
            }
            formdata.push(userdata);
            document.forms[0].reset(); // to clear the form for the next entries
            //document.querySelector('form').reset();

            //for display purposes only
            console.warn('added' , {formdata} );
            let pre = document.querySelector('#msg pre');
            pre.textContent = '\n' + JSON.stringify(formdata, '\t', 2);
            
            let myRequest = new Request("./flightData.json", userdata)
            //load json file
            fetch(myRequest)
            .then(response => {  
            return response.json();
            })
            .then( function(jsondata){
              // var myjsonData= JSON.stringify(jsondata);
              // console.log(myjsonData);
               if(jsondata.flightdetails[0].to === userdata.originCity){
                 console.log("mission Successful")
               }
            });

        }
        document.addEventListener('DOMContentLoaded', ()=>{
            document.getElementById('btn').addEventListener('click', userInput);
        });