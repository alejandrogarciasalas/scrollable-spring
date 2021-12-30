import React, { useLayoutEffect, useCallback, useRef, useState } from "react";
import styled from "styled-components";
import Word from "./Word";
import { ScrollContext } from "../util/ScrollStore";
import { ReactComponent as UnstyledStar } from "../svg/star.svg";
import { ReactComponent as UnstyledTrustPilot } from "../svg/trustpilot.svg";
import useWindowSize from "../util/useWindowSize";
import useScroll from "../util/useScroll";

const WORDS = [
  {
    word: "Easy",
    num: "1,107",
    left: "47%",
    top: "47%",
    show: 0,
    hide: 0.5,
    size: 5
  },
  {
    word: "Simple",
    num: "908",
    left: "25%",
    top: "24%",
    show: 0.15,
    hide: 0.37,
    size: 2.5
  },
  {
    word: "Love",
    num: "991",
    left: "28%",
    top: "78%",
    show: 0.2,
    hide: 0.43,
    size: 2.5
  },
  {
    word: "Intuitive",
    num: "726",
    left: "72%",
    top: "46%",
    show: 0.25,
    hide: 0.47,
    size: 2.5
  },
  {
    word: "Exelente",
    num: "620",
    left: "24%",
    top: "52%",
    show: 0.3,
    hide: 0.53,
    size: 2
  },
  {
    word: "Amazing",
    num: "501",
    left: "47%",
    top: "69%",
    show: 0.35,
    hide: 0.57,
    size: 2
  },
  {
    word: "Perfect",
    num: "401",
    left: "62%",
    top: "26%",
    show: 0.4,
    hide: 0.63,
    size: 2
  }
];

const StickyContainer = styled.div`
  width: 100vw;
  height: 250vh;
  position: relative;
`;

const Wrapper = styled.div`
  width: calc(100vw - 5rem);
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 0;
`;

const RatingWrapper = styled.div`
  width: calc(100vw - 5rem);
  max-width: 28rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: opacity 300ms;
  will-change: opacity;
`;

const RatingNum = styled.div`
  font-size: 6rem;
  background: -webkit-linear-gradient(0deg, #ad58db 0%, #5a4cdb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-variation-settings: "wght" 700, "wdth" 150;
  position: relative;
  line-height: 110%;
`;

const Star = styled(UnstyledStar)`
  width: 3rem;
  height: auto;
  position: absolute;
  top: 0;
  left: calc(100% + 0.75rem);
`;

const LeadingText = styled.h2`
  color: #211e4f;
  line-height: 110%;
  font-size: 1rem;
  text-transform: uppercase;
  font-variation-settings: "wght" 500;
  padding-bottom: 2rem;
`;

const TrustPilot = styled(UnstyledTrustPilot)`
  width: 7rem;
  height: auto;
`;

const EasyToUse = styled.div`
  color: #211e4f;
  padding-top: 2.5rem;
  text-align: center;
  line-height: 100%;
  font-size: 2.25rem;
  font-variation-settings: "wght" 700, "wdth" 125;
`;

const EasyToUseSub = styled.div`
  color: #211e4f;
  opacity: 0.6;
  padding-top: 1rem;
  text-align: center;
  line-height: 120%;
  font-size: 1rem;
  max-width: 25rem;
`;

const WordsWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;

export function Rating() {
  const [open, setOpen] = useState(-1);
  const [dimens, setDimens] = useState({ top: 0 });
  const toggle = () => setOpen(open > WORDS.length ? -1 : open + 1);
  const windowSize = useWindowSize();
  const scroll = useScroll();

  const [el, setEl] = useState();
  const containerRef = useCallback((element) => {
    setEl(element);
  }, []);

  // We want the useEffect to run if width changes
  const stickyContHeight = el?.getBoundingClientRect().top;

  useLayoutEffect(() => {
    console.log("Yeah");
    if (el && stickyContHeight < 0) {
      setDimens({
        top: stickyContHeight,
        height: el?.getBoundingClientRect().height
      });
    }
  }, [el, stickyContHeight]);

  //scrollStore.windowSize.height
  const middleHeight = dimens.height / 1.5; // Potentially unnecessary
  const marginHeight = dimens.height / 8;
  const scrP = (dimens.top * -1 - marginHeight) / middleHeight;
  // const scrP = 0;

  return (
    <StickyContainer ref={containerRef}>
      <Wrapper onClick={toggle}>
        <RatingWrapper style={{ opacity: scrP < 0 || scrP > 0.6 ? 1 : 0.3 }}>
          <LeadingText>Our customers love us</LeadingText>
          <RatingNum>
            4.7
            <Star />
          </RatingNum>
          <TrustPilot />
          <EasyToUse>Edit videos, not your expectations</EasyToUse>
          <EasyToUseSub>
            Here’s the top descriptive words (from 2,700+ reviews) used to
            describe Clipchamp
          </EasyToUseSub>
        </RatingWrapper>
        <WordsWrapper>
          {WORDS.map((x, i) => (
            <Word
              toggle={x.show <= scrP && scrP < x.hide}
              word={x.word}
              num={x.num}
              size={x.size}
              left={x.left}
              top={x.top}
              key={i}
            />
          ))}
        </WordsWrapper>
      </Wrapper>
    </StickyContainer>
  );
}

const HoC = () => {
  return (
    <ScrollContext.Consumer>{(scroll) => <Rating />}</ScrollContext.Consumer>
  );
};

export default Rating;
