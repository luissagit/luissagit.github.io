const progress = document.querySelector(".progress");
import about from "./about-champions.js"
function error(error) {
	console.log(`Error : ${error}`);
}

const getHome = () => {
	fetch("../../pages/home.html")
	.then(function(data) {
		const homeElem = document.getElementById("home-elem");
		progress.style.display = "none";
		homeElem.innerHTML += `
			<div data-aos="fade-in" class="custom-carousel carousel carousel-slider">
				<a class="carousel-item" href="#">
					<div class="custom-container">
						<img class="responsive-img" src="../../assets/images/for-carousel1.webp">
						<div class="top-left-text"><h4>All About Champions League</h4></div>
					</div>
				</a>
				<a class="carousel-item" href="#">
					<div class="custom-container">
						<img class="responsive-img" src="../../assets/images/for-carousel2.webp">
						<div class="top-center-text"><h4>See All Standings Info</h4></div>
					</div>
				</a>
				<a class="carousel-item" href="#"><img src="../../assets/images/for-carousel3.webp"></a>
			</div>
			
			<div class="about-cham container">
			</div>
			`;
		const aboutCham = document.querySelector(".about-cham");
		for (let i = 0; i < about.length; i++) {
			aboutCham.innerHTML += `<p>${about[i]}</p>`;
		}
	})
	.then(showSlides)
	.catch(error);
}

let slideIndex = 0;

function showSlides() {
	const elems = document.querySelectorAll('.carousel');
	const instances = M.Carousel.init(elems, {
		fullWidth: true,
		indicators: true,
	});
		
	/*
	setInterval(() => {
		instances.next();
	}, 4000);
	
	setInterval(function(){
		instances.next();
	}, 3000);
	*/
}


export default getHome;