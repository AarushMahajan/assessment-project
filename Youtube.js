var text = document.getElementById('text-box')
var button = document.getElementById('btn') 

var x = localStorage.getItem("textStorage")
console.log(x);

button.addEventListener('click',fun)

function fun(){
    localStorage.setItem('textStorage',text.value)
     x = localStorage.getItem("textStorage")
    
}




var url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${x}&key=AIzaSyDuuENadGsxMfvmUMKQDt1dmxlP_t6hYAY`
var xHR = new XMLHttpRequest();
xHR.open('Get',url);

xHR.onreadystatechange = function(){
    if(this.status == 200 && this.readyState==4){
        var responseData = JSON.parse(this.responseText)
        // console.log(responseData);
        
        var comment_videoId = responseData.items[0].id.videoId;

        for(let i=0;i<5;i++){

            var body = document.getElementById('body')
            var div = document.createElement('div')
            div.setAttribute('class','div'+i)
            var ifram = document.createElement('iframe')
            ifram.setAttribute('class','frame'+i)
            ifram.setAttribute('src',`https://www.youtube.com/embed/${responseData.items[i].id.videoId}`)
            div.appendChild(ifram)
            body.appendChild(div)
            // HEADDIN TITLE SNIPPETS ETC

            var div_snippet = document.createElement('div')
            div_snippet.setAttribute('class','divS'+i)
            div_snippet.setAttribute('style','font-size:12px;')

            var title = document.createElement('h2')
            div_snippet.appendChild(title)

            title.textContent =  responseData.items[i].snippet.title
            var pub_time = document.createElement('h3')
            pub_time.textContent = 'PUBLISHED ON:- '+responseData.items[0].snippet.publishedAt
            div_snippet.appendChild(pub_time)

            var channel_title = document.createElement('h3')
            channel_title.textContent = 'CHANNEL TITLE:- '+responseData.items[0].snippet.channelTitle
            div_snippet.appendChild(channel_title)

            body.appendChild(div_snippet)
         
        }
   
    }

    // comment api

    var url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&key=AIzaSyDuuENadGsxMfvmUMKQDt1dmxlP_t6hYAY&videoId=${comment_videoId}&maxResults=20`
    var xHR1 = new XMLHttpRequest();
    xHR1.open('Get',url);
    
    xHR1.onreadystatechange = function(){

        if(this.status==200 && this.readyState==4){

            var Comhea = document.createElement('h1')
            Comhea.setAttribute('style','padding:50px;')
            document.body.append(Comhea)

            var Comhea1 = document.createElement('h1')
            
            Comhea1.textContent = "COMMENTS"
            Comhea1.setAttribute('style','margin-left:4%;')

            document.body.append(Comhea1)
            
    for(let i=0;i<15;i++){
    var responseData = JSON.parse(this.responseText)
        console.log(responseData.items[i].snippet.topLevelComment.snippet.textOriginal);
        console.log(responseData.items[i].snippet.topLevelComment.snippet.authorDisplayName);
        console.log(responseData.items[i].snippet.topLevelComment.snippet.authorProfileImageUrl);

        var div = document.createElement('div')
        div.setAttribute('style','border-bottom:1px solid;margin-top:1%;')
        div.setAttribute('style','margin-left:4%;')
       

        var authorImg = document.createElement('img')
        authorImg.setAttribute('src',responseData.items[i].snippet.topLevelComment.snippet.authorProfileImageUrl)
        authorImg.setAttribute('height',40)
        authorImg.setAttribute('width',40)
        authorImg.setAttribute('style','border-radius:50%;')        
        div.appendChild(authorImg)
        
        var nameAuthor = document.createElement('h3')
        nameAuthor.textContent = responseData.items[i].snippet.topLevelComment.snippet.authorDisplayName
        nameAuthor.setAttribute('style','margin-left:70px;margin-top:-32px;')
        div.appendChild(nameAuthor)

        var commentHeading = document.createElement('h3')
        commentHeading.setAttribute('style','padding:10px')
        commentHeading.textContent = responseData.items[i].snippet.topLevelComment.snippet.textOriginal
        div.appendChild(commentHeading)

        document.body.append(div)
        
        
    }
    
 }
}
xHR1.send();
   
     // comment api close

}

xHR.send();

