import React, { useCallback, useEffect, useState, useRef } from "react";
import { useSpring, animated as a } from "react-spring";
import styled from "styled-components";
import Hero3D from "./Hero3D";
import useWindowSize from "../util/useWindowSize";
import useScroll from "../util/useScroll";

const isBrowser = typeof window !== "undefined";

const Main = styled.main`
  position: relative;
  width: 100%;
  max-width: 100vw;
  height: 100%;
  text-align: justify;
  background: white;
`;

const EmptyContainer = styled.div`
  height: 200vh;
  background: #eaeafa;
  width: 100vw;
`;

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* max-width: 85rem; */
  min-height: 220vh;
  margin: 0 auto;
  position: relative;
  /* padding-bottom: 200vh; */
`;

const HeadlineContainer = styled.div`
  font-variation-settings: "wdth" 150;
  color: #2b298a;
  text-align: center;
  line-height: 100%;
  will-change: transform;

  position: absolute;
  top: 0;
  width: 100%;
  bottom: 0;

  @media (max-width: 64em) {
    font-size: 4rem;
  }

  @media (max-width: 40em) {
    font-size: 2rem;
  }
`;

const ShapesContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
`;

const DetailsContainer = styled(a.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  top: 0;
  max-width: 54rem;
`;

const ExtraDetails = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  will-change: opacity;
  transition: opacity 300ms;
  font-variation-settings: "wdth" 100;

  &.hidden {
    opacity: 0;
    pointer-events: none;
  }
`;

const Subheadline = styled.h1`
  font-size: 1.5rem;
  margin: 2rem 0 2rem 0.25rem;
  line-height: 140%;
  max-width: 34rem;
  color: #211e4f;
  text-align: center;

  @media (max-width: 64em) {
    font-size: 1.25rem;
  }

  @media (max-width: 40em) {
    font-size: 1.125rem;
    max-width: 20rem;
  }
`;

const Headline = styled.h2`
  text-align: center;
  position: relative;
  will-change: transform;
  /* font-size: 5.5rem; */
  color: #211e4f;
  font-size: calc(2rem + 2.5vw);
  line-height: 100%;
  font-weight: 700;
  font-variation-settings: "wdth" 125, "wght" 700;
  display: flex;
  flex-direction: column;
  align-items: center;

  b,
  span {
    z-index: 1;
    position: relative;
    will-change: color;
    display: block;
  }

  b {
    background: #ad58db;
    color: white;
    padding: 0.125rem 1rem 0.5rem 1rem;
    margin-top: 0.25rem;
    border-radius: 0.5rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  @media (max-width: 40em) {
    flex-direction: column;
    align-items: center;
  }
`;

const Button = styled.button`
  font-weight: 600;
  border: none;
  font-size: 1.125rem;
  height: 3rem;
  display: flex;
  align-items: center;
  cursor: pointer;

  @media (max-width: 40em) {
    margin: 0.5rem 0;
  }
`;

const PrimaryButton = styled(Button)`
  background: #211e4f;
  color: #ffffff;
  border-radius: 1rem;
  padding: 0 2.5rem;
  margin-right: 0.5rem;
  transition: background 100ms;
  :hover,
  :focus,
  :active {
    background: #5a4cdb;
  }
`;

const SecondaryButton = styled(Button)`
  color: #211e4f;
  background: none;
  padding: 0 1rem;
  transition: color 100ms;

  :hover,
  :focus,
  :active {
    color: #5a4cdb;
  }

  svg {
    margin-right: 0.5rem;
  }
`;

const AppWrapper = styled.div`
  width: 100%;
  max-width: 100vw;
  padding: 0 10vw;
  height: 100vh;
  margin: 0 auto;
  position: sticky;
  top: 0;
  margin-top: -20vh;
  overflow: hidden;
`;

const AppContainer = styled(a.div)`
  height: 100vh;
  display: flex;
  align-items: center;
  will-change: transform;
`;

const DummyApp = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  background: #0a091a;
  background: url(Editor3.png);
  background-size: contain;
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;
`;

const DummyAppVideo = styled.video`
  position: absolute;
  width: 50%;
  top: 18%;
  right: 14%;
  border-radius: 0.25rem;
`;

const HeroDetailsContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 0;
  will-change: transform;
`;

const ShapeLabelStickyContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  top: 0;
  position: sticky;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

const LabelWrapper = styled.div`
  max-width: 80vw;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  will-change: opacity;
`;

const LabelContainer = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  position: relative;
  will-change: opacity;
`;

const Track = styled(a.div)`
  position: absolute;
  width: 18.4%;
  height: 0;
  padding-bottom: 2.5%;
  display: flex;
  align-items: center;
  will-change: transform;
`;

const TrackName = styled(a.div)`
  font-weight: 600;
  color: white;
  padding: 0 5% 0 3%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.8vw;
  display: flex;
  align-items: center;

  span {
    width: calc(100% - 1.5vw);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-right: 5%;
  }

  svg {
    width: 1.25vw;
    min-width: 1.25vw;
    height: auto;
    margin-right: 0.3vw;
    opacity: 0.5;
  }
`;

const Trackground = styled(a.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 0.5vw;
  will-change: opacity;
`;

const Hero = () => {
  const [pcFromTop, setPcFromTop] = useState(0);
  const windowSize = useWindowSize();
  const scroll = useScroll();

  const [{ st }, set] = useSpring(() => ({ st: 0 }));

  const interpLabel1 = st.interpolate(
    (o) => `
  translate(${(1 - o) * -160}%, ${(1 - o) * -600}%)
  rotate(${(1 - o) * -50}deg)
  `
  );
  const interpLabel2 = st.interpolate(
    (o) => `
  translate(${(1 - o) * -100}%, ${(1 - o) * 600}%)
  rotate(${(1 - o) * -16}deg)
  `
  );
  const interpLabel3 = st.interpolate(
    (o) => `
  translate(${(1 - o) * 150}%, ${(1 - o) * -400}%)
  rotate(${(1 - o) * 30}deg)
  `
  );
  const interpLabel4 = st.interpolate(
    (o) => `
  translate(${(1 - o) * 0}%, ${(1 - o) * -1000}%)
  rotate(${(1 - o) * -60}deg)
  `
  );

  useEffect(() => {
    const localPcFromTop = scroll.scrollY / (windowSize.height * 0.8);
    if (localPcFromTop < 1) {
      set({ st: localPcFromTop });
      setPcFromTop(localPcFromTop);
    } else if (pcFromTop !== 1) {
      set({ st: 1 });
      setPcFromTop(1);
    }
  }, [scroll, windowSize]);

  return (
    <Main>
      <HeroContainer>
        <HeadlineContainer>
          <HeroDetailsContainer className={pcFromTop > 0.5 ? "background" : ""}>
            <DetailsContainer
              style={{
                transform: st.interpolate(
                  (o) =>
                    `scale(${o < 0.5 ? 1 - o * 2 * 0.2 : 0.8}) translateY(${
                      o < 0.5 ? o * 2 * 4 : 4
                    }rem)`
                ),
                opacity: st.interpolate((o) => (o < 0.5 ? 1 - o * 2 * 1 : 0))
              }}
            >
              <Headline>
                <span>Make your </span>
                <b>business</b>
                <span> one to watch</span>
              </Headline>
              <ExtraDetails>
                <Subheadline>
                  Tell stories worth sharing with Clipchamp’s free browser-based
                  video editor.
                </Subheadline>
                <ButtonContainer>
                  <PrimaryButton>Try for free</PrimaryButton>
                  <SecondaryButton>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 8L16 12L10 16V8Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Play demo
                  </SecondaryButton>
                </ButtonContainer>
              </ExtraDetails>
            </DetailsContainer>
          </HeroDetailsContainer>
        </HeadlineContainer>
        <ShapeLabelStickyContainer>
          <LabelWrapper
            style={{
              opacity: pcFromTop < 0.92 ? 0 : (pcFromTop - 0.92) * 20 * 1
            }}
          >
            <LabelContainer>
              <Track
                style={{
                  left: "24.8%",
                  top: "74.6%",
                  transform: interpLabel1
                }}
              >
                <Trackground
                  style={{
                    background: "#5a4cdb",
                    opacity: pcFromTop < 0.94 ? 0 : (pcFromTop - 0.95) * 30 * 1
                  }}
                />
                <TrackName>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 6.5V5C4 4.44772 4.44772 4 5 4H12M20 6.5V5C20 4.44772 19.5523 4 19 4H12M12 4V20M12 20H9.5M12 20H14.5"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Make your business one to watch</span>
                </TrackName>
              </Track>
              <Track
                style={{
                  left: "43.2%",
                  top: "80%",
                  transform: interpLabel2
                }}
              >
                <Trackground
                  style={{
                    background: "#468BE8",
                    opacity: pcFromTop < 0.94 ? 0 : (pcFromTop - 0.95) * 30 * 1
                  }}
                />
                <TrackName>
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <path
                        d="M9.25 16.75C13.3921 16.75 16.75 13.3921 16.75 9.25C16.75 5.10786 13.3921 1.75 9.25 1.75C5.10786 1.75 1.75 5.10786 1.75 9.25C1.75 13.3921 5.10786 16.75 9.25 16.75Z"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.75 6.25L12.25 9.25L7.75 12.25V6.25Z"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="bevel"
                      />
                    </g>
                  </svg>
                  video.mp4
                </TrackName>
              </Track>
              <Track
                style={{
                  left: "61.6%",
                  top: "85.3%",
                  transform: interpLabel3
                }}
              >
                <Trackground
                  style={{
                    background: "#A260D4",
                    opacity: pcFromTop < 0.94 ? 0 : (pcFromTop - 0.95) * 30 * 1
                  }}
                />
                <TrackName>
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <path
                        d="M9.25 16.75C13.3921 16.75 16.75 13.3921 16.75 9.25C16.75 5.10786 13.3921 1.75 9.25 1.75C5.10786 1.75 1.75 5.10786 1.75 9.25C1.75 13.3921 5.10786 16.75 9.25 16.75Z"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.75 6.25L12.25 9.25L7.75 12.25V6.25Z"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="bevel"
                      />
                    </g>
                  </svg>
                  stock_footage.mp4
                </TrackName>
              </Track>
              <Track
                style={{
                  left: "80%",
                  top: "74.6%",
                  transform: interpLabel4
                }}
              >
                <Trackground
                  style={{
                    background: "#5a4cdb",
                    opacity: pcFromTop < 0.94 ? 0 : (pcFromTop - 0.95) * 30 * 1
                  }}
                />
                <TrackName>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 6.5V5C4 4.44772 4.44772 4 5 4H12M20 6.5V5C20 4.44772 19.5523 4 19 4H12M12 4V20M12 20H9.5M12 20H14.5"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Try for free
                </TrackName>
              </Track>
            </LabelContainer>
          </LabelWrapper>
          <ShapesContainer>
            <Hero3D spring={st} windowSize={windowSize} />
          </ShapesContainer>
        </ShapeLabelStickyContainer>
        <AppWrapper>
          <AppContainer
            style={{
              transform: st.interpolate(
                (o) =>
                  `perspective(50rem) rotate3d(3, 0, 0, ${
                    o > 0.75 ? 0 : 20 - o * 20 * 1.33
                  }deg) scale(${o > 0.75 ? 1 : 1.3 - o * 0.3 * 1.33})`
              )
            }}
          >
            <DummyApp />
            <DummyAppVideo
              loop={true}
              autoPlay={true}
              muted={true}
              playsInline={true}
            >
              <source
                src="https://www.clipchamp.com/static/0ed407417048be2b907a6cc01bee0e92/Clipchamp_Homepage_Video_2.mp4"
                type="video/mp4"
              />
            </DummyAppVideo>
          </AppContainer>
        </AppWrapper>
        {/* <div
          style={{
            width: "100vw",
            background: "#EAEAFA",
            height: "65vh",
            marginTop: "15vh"
          }}
        /> */}
      </HeroContainer>
      {/* <EmptyContainer /> */}
    </Main>
  );
};

// const HoC = ({ scrollStore }) => {
//   return (
//     <ScrollContext.Consumer>
//       {(scroll) => <Hero scrollStore={scroll} />}
//     </ScrollContext.Consumer>
//   );
// };

export default Hero;
