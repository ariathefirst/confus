var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);



function onPlayerReady(event){
	var lastTimeStamp = 0.0;
	var confusionBar = document.getElementById('confusion-bar');
	document.addEventListener('keydown', toggleConfusion);
	function intervalCheck() {
		if (player.getPlayerState() === YT.PlayerState.ENDED) {
			// stop calling this intervalCheck when the video has ended
			clearInterval(handle);
			return;
		}
		let currentTimeStamp = player.getCurrentTime();
		if (currentTimeStamp >= (lastTimeStamp + 4.9)) {
			/* if the video has progressed more than ~5 seconds since
			   the last time this function was called. */
			var element = document.createElement('div');
			element.classList = 'confusion-block';
			confusionBar.appendChild(element);
			// element.textContent = currentTimeStamp.toString();
			lastTimeStamp = currentTimeStamp;
		}
	}
	var handle = setInterval(intervalCheck, 5000); // call intervalCheck every 5 seconds
}



var player;
function onYouTubePlayerAPIReady() {
	player = new YT.Player('ytplayer', {
		height: '360',
		width: '640',
		videoId: vidId,
		events: {
			'onReady': onPlayerReady
		},
	});

}

var isConfused = false;
function toggleConfusion(event) {
	const keyName = event.key;
	// todo: if key is spacebar
	isConfused = !isConfused;	
}
