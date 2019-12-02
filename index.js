
var textVal = document.getElementById('text-box')

var btn = document.getElementById('btn')

btn.addEventListener('click',bot)

function bot(){     
    localStorage.setItem('textStorage',textVal.value)
    // console.log(textVal.value);
}



text = " "
var button = document.getElementById('btn') 

var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q="+text+"&key=AIzaSyDuuENadGsxMfvmUMKQDt1dmxlP_t6hYAY"
var xHR = new XMLHttpRequest();
xHR.open('Get',url);

xHR.onreadystatechange = function(){
    if(this.status == 200 && this.readyState==4){
        var responseData = JSON.parse(this.responseText)
        // console.log(responseData);
        
        for(let i=0;i<12;i++){

            var body = document.getElementById('body')
            var div = document.createElement('div')
            div.setAttribute('class','div'+i)
            var ifram = document.createElement('iframe')
            // ifram.setAttribute('class','frame'+i)
            ifram.setAttribute('src',"https://www.youtube.com/embed/"+responseData.items[i].id.videoId)
            div.appendChild(ifram)

            var title = document.createElement('p')
            title.textContent =  responseData.items[i].snippet.title
            div.appendChild(title)
            
            body.appendChild(div)
         
        }
   
    }
    
}

xHR.send();


