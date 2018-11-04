var histogram = document.getElementById('histogram');
console.log("THIS FILE HAS RUN");
const BLOCKWIDTH = Math.ceil(parseInt(histogram.style.clientHeight) / aggregateArray.length);
var blocks = histogram.children;
for(let i=0;i<blocks.length;i++) {
	blocks[i].style.height = `${aggregateArray[i]*15}px`;
}
