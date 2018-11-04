var histogram = document.getElementById('histogram');
for(i=0;i<aggregateArray.length;i++) {
	var bar = document.createElement('div');
	bar.classList = "histogram-bar";
	histogram.appendChild(bar);
	bar.style.height = `${aggregateArray[i]}px`
}
	

