import { useRef, useState } from "react";
import Styles from "./Carousel.module.css";
import StylesFromAlbum from "../Album/album.module.css";

function Carousel({ images, index, setCarouselActive, setIsBlur }) {
  const [currentIndex, setCurrentIndex] = useState(index);

  const handleSlide = (slide) => {
    const newIndex = currentIndex + (slide === "prev" ? -1 : 1);
    setCurrentIndex(Math.max(0, Math.min(newIndex, images.length - 1)));
  };

  const handleClose = () => {
    setCarouselActive(false);
    setIsBlur(false);
  };

  return (
    <>
      <div className={`${Styles.carousel} ${Styles.blur_overlay}`}>
        <div className={Styles.carousel_layout}>
          <div>
            <button
              className={`${StylesFromAlbum} ${Styles.close_pos}`}
              onClick={handleClose}
            >
              <i class="fa-solid fa-x"></i>
            </button>
          </div>
          <div>
            <button
              className={StylesFromAlbum.btn_blue}
              onClick={() => handleSlide("prev")}
            >
              Prev
            </button>
          </div>
          <div className={Styles.carousel_image}>
            <div>
              <img
                src={images[currentIndex].imageUrl}
                className={Styles.image_css}
              />
            </div>
            <div className={StylesFromAlbum.text_bold}>
              {images[currentIndex].title}
            </div>
          </div>
          <div>
            <button
              className={StylesFromAlbum.btn_blue}
              onClick={() => handleSlide("next")}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Carousel;
