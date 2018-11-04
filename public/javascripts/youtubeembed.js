var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

const DELTA = 5; // Length of an interval

function onPlayerReady(event){
	while (player.getDuration() === 0); // avoid dividing by zero while waiting for metadata to load
	var numIntervals = Math.trunc(player.getDuration() / DELTA);
	confusionArray = Array(numIntervals); // intentionally global
	var currentInterval = 0;
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
		if (currentTimeStamp >= (lastTimeStamp + 0.5)) {
			/* if the video has progressed more than ~5 seconds since
			   the last time this function was called. */
			var element = document.createElement('div');
			element.classList = 'confusion-block';
			confusionBar.appendChild(element);
			confusionArray[currentInterval] = isConfused ? 1 : 0;
			currentInterval += 1;
			if (isConfused) {
				element.style.background = "#66a5ad";
			} else {
				element.style.background = "#c4dfe6";
			}
			element.style.width = 5 / player.getDuration() * 100 + "%";
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
	if (keyName === "i" || keyName === "I") {
		isConfused = !isConfused;	
	}
}
