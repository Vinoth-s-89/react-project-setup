import { useEffect, useRef, useState } from "react";
import { icons } from "../../constants/icons";
import "../../styles/carousel.css";

const Carousel = ({ noOfScrollItems = 3, gap = 20 }) => {
  const [noOfItems, setNoOfItems] = useState(10);
  const [items, setItems] = useState([]);
  const [disabled, setDisabled] = useState("left");
  const carouselRef = useRef(null);
  const itemRef = useRef(null);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const { scrollWidth, scrollLeft, clientWidth } = carouselRef.current;
      const scrollPos =
        itemRef.current.offsetWidth * noOfScrollItems + gap * noOfScrollItems;

      const left =
        direction === "left" ? scrollLeft - scrollPos : scrollLeft + scrollPos;

      setDisabled(
        left <= 0 ? "left" : left > scrollWidth - clientWidth ? "right" : ""
      );

      carouselRef.current.scrollTo({ left });
    }
  };

  useEffect(() => {
    setItems((prev) => [...prev, ...Array(noOfItems).fill(0)]);
  }, [noOfItems]);

  useEffect(() => {
    if (!itemRef.current) return;
    const observer = new IntersectionObserver(
      (entry) => {
        if (entry[0].isIntersecting) {
          observer.unobserve(itemRef.current);
          setNoOfItems((prev) => prev + 10);
          setDisabled("");
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(itemRef.current);

    return () => {
      if (itemRef.current) observer.unobserve(itemRef.current);
    };
  }, [items]);

  return (
    <div className="carousel-container">
      <div className="carousel" ref={carouselRef}>
        {items.map((_, index) => (
          <div
            key={index}
            className="card"
            ref={(ref) => {
              if (index + 1 === noOfItems) itemRef.current = ref;
            }}
          >
            {index + 1}
          </div>
        ))}
      </div>
      <div
        className={`icon-container left ${
          disabled === "left" ? "disabled" : ""
        }`}
        onClick={() => scroll("left")}
      >
        {icons["arrow-left"]}
      </div>
      <div
        className={`icon-container right ${
          disabled === "right" ? "disabled" : ""
        }`}
        onClick={scroll}
      >
        {icons["arrow-right"]}
      </div>
    </div>
  );
};

export default Carousel;
