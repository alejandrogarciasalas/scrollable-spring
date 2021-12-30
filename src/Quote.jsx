import React from "react";
import styled from "styled-components";
import { ReactComponent as UnstyledSquiggle } from "./svg/squiggle.svg";

const Wrapper = styled.div`
  max-width: 100vw;
  overflow: hidden;
  position: relative;
`;

const QuoteWrapper = styled.div`
  width: 77rem;
  max-width: 100vw;
  padding: 0 2.5rem;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  @media (max-width: 50rem) {
    flex-direction: column;
    justify-content: center;
  }
`;

const Image = styled.div`
  background: url("https://pbs.twimg.com/profile_images/1104172773834862592/zct_UoUY.jpg");
  background-size: cover;
  width: 100%;
  padding-bottom: 100%;
  border-radius: 50%;
`;

const Squiggle = styled(UnstyledSquiggle)`
  position: absolute;
  height: 80%;
  width: auto;
`;

const ImageWrap = styled.div`
  width: 30rem;
  max-width: 40vw;
  position: relative;
  margin-left: 4rem;

  svg {
    position: absolute;
    height: 80%;
    width: auto;
    top: -18%;
    left: -18%;
  }

  @media (max-width: 68rem) {
    width: 25vw;
  }

  @media (max-width: 50rem) {
    margin-left: 0;
  }
`;

const Quote = styled.div`
  width: 38rem;
  max-width: calc(100vw - 5rem);
  padding-left: 3rem;
  color: #211e4f;
  font-variation-settings: "wght" 300;

  @media (max-width: 50rem) {
    padding-left: 0;
    padding-top: 2rem;
  }
`;

const QuoteText = styled.p`
  font-size: 1.5rem;
  line-height: 140%;

  b {
    font-variation-settings: "wght" 600;
  }

  @media (max-width: 32rem) {
    font-size: 1.125rem;
  }
`;

const QuoteAuthor = styled.div`
  margin-top: 2rem;
  font-size: 1.5rem;
  font-variation-settings: "wght" 600, "wdth" 125;

  @media (max-width: 32rem) {
    font-size: 1.125rem;
    padding-bottom: 0.25rem;
  }
`;

const QuoteJob = styled.div`
  font-size: 1rem;
`;

export default function FooterLinks() {
  return (
    <Wrapper>
      <QuoteWrapper>
        <Squiggle />
        <ImageWrap>
          <Image />
          <svg
            width="296"
            height="443"
            viewBox="0 0 296 443"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M148 443C66.6 443 0 376.55 0 295.333C0 132.9 133.2 0 296 0V147.667C214.6 147.667 148 214.117 148 295.333H296C296 376.55 229.4 443 148 443Z"
              fill="#AD58DB"
            />
          </svg>
        </ImageWrap>
        <Quote>
          <QuoteText>
            Clipchamp is now our go-to video creation and editing suite.
            Incredibly easy to use with excellent functionality and an{" "}
            <b>extensive stock library</b>, <b>text and colour editing suite</b>
            , Clipchamp has enabled me to add another revenue stream to our
            digital marketing agency. Outstanding support and a fantastic
            product.
          </QuoteText>
          <QuoteAuthor>Tracey</QuoteAuthor>
          <QuoteJob>Founder, Munn Digital</QuoteJob>
        </Quote>
      </QuoteWrapper>
    </Wrapper>
  );
}
