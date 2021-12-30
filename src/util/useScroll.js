import { useEffect, useState } from "react";

export default function useScroll() {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [bodyOffset, setBodyOffset] = useState(
    document.body.getBoundingClientRect()
  );
  const [scrollY, setScrollY] = useState(bodyOffset.top);
  const [scrollX, setScrollX] = useState(bodyOffset.left);
  const [scrollDirection, setScrollDirection] = useState();

  const listener = (e) => {
    setBodyOffset(document.body.getBoundingClientRect());
    setScrollY(window.scrollY);
    setScrollX(window.scrollX);
    setScrollDirection(lastScrollTop > window.scrollY ? "down" : "up");
    setLastScrollTop(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  });

  return {
    scrollY,
    scrollX,
    scrollDirection
  };
}
