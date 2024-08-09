const songDetail = [
    {
      "title": "Death Bed",
      "artist": "Powfu",
      "artwork": "https://samplesongs.netlify.app/album-arts/death-bed.jpg",
      "url": "https://samplesongs.netlify.app/Death%20Bed.mp3",
      "id": "1"
    },
    {
      "title": "Bad Liar",
      "artist": "Imagine Dragons",
      "artwork": "https://samplesongs.netlify.app/album-arts/bad-liar.jpg",
      "url": "https://samplesongs.netlify.app/Bad%20Liar.mp3",
      "id": "2"
    },
    {
      "title": "Faded",
      "artist": "Alan Walker",
      "artwork": "https://samplesongs.netlify.app/album-arts/faded.jpg",
      "url": "https://samplesongs.netlify.app/Faded.mp3",
      "id": "3"
    },
    {
      "title": "Hate Me",
      "artist": "Ellie Goulding",
      "artwork": "https://samplesongs.netlify.app/album-arts/hate-me.jpg",
      "url": "https://samplesongs.netlify.app/Hate%20Me.mp3",
      "id": "4"
    },
    {
      "title": "Solo",
      "artist": "Clean Bandit",
      "artwork": "https://samplesongs.netlify.app/album-arts/solo.jpg",
      "url": "https://samplesongs.netlify.app/Solo.mp3",
      "id": "5"
    },
    {
      "title": "Without Me",
      "artist": "Halsey",
      "artwork": "https://samplesongs.netlify.app/album-arts/without-me.jpg",
      "url": "https://samplesongs.netlify.app/Without%20Me.mp3",
      "id": "6"
    }
  ];
  
const imgtag=document.querySelector('.body--sec--img');
const forward=document.querySelector('.fa-forward');
const backward=document.querySelector('.fa-backward');
const repeat=document.querySelector('.fa-repeat');
const shuffle=document.querySelector('.fa-shuffle');

const title=document.querySelector('.body--sec--title');
const artist=document.querySelector('.body--sec--artist');

const playpausebtn=document.querySelector('.playpausebtn')
const progressbar=document.querySelector('.progresscontainer--progress')
const currtime=document.querySelector('.currentTime')
const duration=document.querySelector('.duration')
let audio =document.querySelector('.audio')
let count=0;
let shuffleBool=false;

//adding title 
forward.title='next'
backward.title='prev'
shuffle.title='shuffle'
repeat.title='repeat'
playpausebtn.title='play/pause'


repeat.addEventListener('click',(e)=>{
    console.log('repeat');
    
    if(audio.hasAttribute('loop')){
        audio.removeAttribute('loop');
        repeat.textContent='';
    }else{
        audio.setAttribute('loop', '');
        repeat.textContent='¹'
    }
     
})

forward.addEventListener('click',nxtSong);
backward.addEventListener('click',prevSong);

playpausebtn.addEventListener('click',()=>{
    
    if(audio.paused){
        imgtag.classList.add('active');
        audio.play();
        playpausebtn.classList.replace('fa-play','fa-pause')
    }else{
        imgtag.classList.remove('active');
        audio.pause();
        playpausebtn.classList.replace('fa-pause','fa-play')
    }
})
audio.addEventListener('loadedmetadata',()=>{
    progressbar.max=audio.duration;
    duration.textContent=formatTime(audio.duration);
});

audio.addEventListener('timeupdate',()=>{
    progressbar.value=audio.currentTime;
    currtime.textContent=formatTime(audio.currentTime);
})

audio.addEventListener('ended', () => {
    if(!audio.hasAttribute('loop'))
        nxtSong()
});

progressbar.addEventListener('input',()=>{
    audio.currentTime=progressbar.value;
})


shuffle.addEventListener('click',shuffleSong);

//fucntions
function nxtSong(){
    if(shuffleBool){
        count=Math.floor(Math.random()*songDetail.length);
    }
        if(count<songDetail.length-1){
            count++;
            
        }else{
            count=0;
            
        }
        audio.src=songDetail[count].url;
        imgtag.src=songDetail[count].artwork;
        title.textContent=songDetail[count].title;
        artist.textContent=songDetail[count].artist
        imgtag.classList.add('active');
        audio.play();
        playpausebtn.classList.replace('fa-play','fa-pause')
    
}

function prevSong(){
    if(shuffleBool){
            count=Math.floor(Math.random()*songDetail.length);
        }

        if(count!=0){
            count--;
            
        }else{
            count=songDetail.length-1;
            
        }
        audio.src=songDetail[count].url;
        imgtag.src=songDetail[count].artwork;
        title.textContent=songDetail[count].title;
        artist.textContent=songDetail[count].artist
        audio.play();
        imgtag.classList.add('active');
        playpausebtn.classList.replace('fa-play','fa-pause')

}

function formatTime(sec){
    const min=Math.floor(sec/60);
    const secs=Math.floor(sec%60);
    return `${min}:${secs<10?'0':''}${secs}`;
}

function shuffleSong(){
    if(shuffleBool==false){
        shuffle.textContent='•';
        shuffleBool=true;
    }else{
        shuffle.textContent=''
        shuffleBool=false;
    }
   
}


