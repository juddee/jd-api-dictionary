var input = document.getElementById('input');
var btn = document.getElementById("btn");
var result = document.querySelector(".result");

// var dataResult = `<h5>OPPs!! Error. Maybe ${input.value} word not found! Try another word</h5> `;


function fetchWord () {
    
    if(!input.value ==""){
        
        searchedUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${input.value}`
        var url =searchedUrl;
        
        
        fetch(url)
        .then( function (res){
            return res.json();
        })
        
        .then(function (data) {

            if(data.message){
                console.log(data.message);
                var dataResult = `<p class="result-p"> ${data.message}</p>`;
                input.value = '';
            }else{
                var dataResult = `
                <h3>${input.value}</h3>
                <h4>Part of Speech: ${data[0].meanings[0].partOfSpeech}</h4>
                
                <p class="result-p">
                    <strong>Definition</strong>: ${data[0].meanings[0].definitions[0].definition}
                </p>
                `;
                    
                input.value = '';
            }
            
            result.innerHTML = dataResult;
        })
        .catch(function(err){
            console.log(err);
            
        });

    }
    
}
btn.addEventListener("click", function () {
    fetchWord();
    
    
} );

input.addEventListener('keyup',function (e) {
    if(e.keyCode ===13){
        fetchWord();
        
    }
} );