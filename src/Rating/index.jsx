import React, { useLayoutEffect, useCallback, useRef, useState } from "react";
import styled from "styled-components";
import Word from "./Word";
import { ScrollContext } from "../util/ScrollStore";
import { ReactComponent as UnstyledStar } from "../svg/star.svg";
import { ReactComponent as UnstyledTrustPilot } from "../svg/trustpilot.svg";
import { ReactComponent as UnstyledArrow } from "../svg/arrow2.svg";
import { useIntersection } from "react-use";
import useWindowSize from "../util/useWindowSize";
import useScroll from "../util/useScroll";

const WORDS = [
  {
    word: "Easy",
    num: "1,107",
    left: "49%",
    top: "6%",
    show: 0,
    hide: 0.6,
    size: 5
  },
  {
    word: "Simple",
    num: "908",
    left: "18%",
    top: "20%",
    show: 0.15,
    hide: 0.7,
    size: 2.5
  },
  {
    word: "Love",
    num: "991",
    left: "78%",
    top: "25%",
    show: 0.2,
    hide: 0.58,
    size: 2.5
  },
  {
    word: "Intuitive",
    num: "726",
    left: "28%",
    top: "38%",
    show: 0.25,
    hide: 0.61,
    size: 2.5
  },
  {
    word: "Exelente",
    num: "620",
    left: "63%",
    top: "49%",
    show: 0.3,
    hide: 0.67,
    size: 2
  },
  {
    word: "Amazing",
    num: "501",
    left: "20%",
    top: "68%",
    show: 0.35,
    hide: 0.64,
    size: 2
  },
  {
    word: "Perfect",
    num: "401",
    left: "59%",
    top: "77%",
    show: 0.4,
    hide: 0.73,
    size: 2
  }
];

const StickyContainer = styled.div`
  width: 100vw;
  /* height: 250vh; */
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  width: calc(100vw - 5rem);
  height: 90vh;
  max-height: 60rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  /* opacity: 0.6; */
  padding-top: 2rem;
  text-align: center;
  line-height: 120%;
  font-size: 1rem;
  max-width: 25rem;
  position: relative;
`;

const Arrow = styled(UnstyledArrow)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: calc(100% + 1rem);
  height: 12vh;
  width: auto;
  color: #ad58db;

  .line {
    transition: stroke-dashoffset 350ms;
    stroke-dasharray: 80;
    stroke-dashoffset: 80;
  }

  .arrow {
    transition: stroke-dashoffset 350ms 200ms;
    stroke-dasharray: 25;
    stroke-dashoffset: 25;
  }

  &.show .line,
  &.show .arrow {
    stroke-dashoffset: 0;
  }
`;

const WordsWrapper = styled.div`
  width: 100vw;
  height: 120vh;
  max-height: 100rem;
  max-width: 82.5rem;
  position: relative;
`;

export function Rating() {
  const ref = useRef();

  const intersection = useIntersection(ref, {
    root: null,
    rootMargin: "0px",
    threshold: 0
  });

  const [open, setOpen] = useState(-1);
  const [dimens, setDimens] = useState({ top: 0 });
  const toggle = () => setOpen(open > WORDS.length ? -1 : open + 1);
  const scroll = useScroll();
  const windowSize = useWindowSize();

  useLayoutEffect(() => {
    const top = ref?.current?.getBoundingClientRect().top;
    if (ref.current && top < 0 && dimens.top !== top) {
      setDimens({
        top,
        height: ref?.current?.getBoundingClientRect().height
      });
    }
  }, [ref, intersection, scroll]);

  const middleHeight = dimens.height / 1.5; // Potentially unnecessary
  const marginHeight = dimens.height / 8;
  const scrP = (dimens.top * -1 - marginHeight) / middleHeight;
  // const scrP = 0;

  return (
    <StickyContainer ref={ref}>
      <Wrapper onClick={toggle}>
        <RatingWrapper>
          {/* <LeadingText>Our customers love us</LeadingText> */}
          <RatingNum>
            4.7
            <Star />
          </RatingNum>
          <TrustPilot />
          <EasyToUse>Edit videos, not your expectations</EasyToUse>
          <EasyToUseSub>
            Here’s the top descriptive words (from 2,700+ reviews) used to
            describe Clipchamp
            <Arrow className={scrP > -0.16 ? "show" : "hide"} />
          </EasyToUseSub>
        </RatingWrapper>
      </Wrapper>
      <WordsWrapper>
        {WORDS.map((x, i) => (
          <Word
            // toggle={x.show <= scrP && scrP < x.hide}
            toggle={x.show <= scrP}
            word={x.word}
            num={x.num}
            size={x.size}
            left={x.left}
            top={x.top}
            key={i}
          />
        ))}
      </WordsWrapper>
    </StickyContainer>
  );
}

const HoC = () => {
  return (
    <ScrollContext.Consumer>{(scroll) => <Rating />}</ScrollContext.Consumer>
  );
};

export default Rating;
