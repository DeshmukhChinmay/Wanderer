import image1 from "./images/testJourney.jpg";
import image2 from "./images/testJourney.jpg";
import image3 from "./images/testPopular.jpg";
import image4 from "./images/testTimesSquare.jpg";
import image5 from "./images/testParis.jpg";

export default function getRandomImage() {
    const images = [image1, image2, image3, image4, image5];

    const randomImageIndex = Math.floor(Math.random() * Math.floor(5));

    return images[randomImageIndex];
}
