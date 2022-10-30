$('.halloween').click(function(e){
    const audio = new Audio('./sound/ghost.mp3');
    this.setAttribute('hidden','true');
    audio.play();
    e.preventDefault})

$('#bail').click(function(e){
    const audio = new Audio('./sound/spooky.mp3');
    this.setAttribute('hidden','true');
    audio.play();
    e.preventDefault
})