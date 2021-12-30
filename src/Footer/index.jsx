import React, { useRef } from "react";
import styled from "styled-components";
import Footer3D from "./Footer3D";
import FooterLinks from "./FooterLinks";
import { animated } from "react-spring";
import { useIntersection } from "react-use";

const FooterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  width: 100vw;
  max-width: 87.5rem;
  margin: 0 auto;
`;

const FooterCTA = styled.div`
  width: 82.5rem;
  max-width: calc(100vw - 5rem);
  height: 45rem;
  max-height: calc(100vh - 5rem);
  margin: 2.5rem auto;
  background: #2e248f;
  border-radius: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;

  @media (max-width: 50rem) {
    max-width: calc(100vw - 3rem);
    height: calc(100vh - 3rem);
    margin: 1rem auto;
  }
`;

const Button = styled(animated.button)`
  margin-top: 4rem;
  padding: 0.75rem 2rem;
  font-size: 1.125rem;
  line-height: 135%;
  font-variation-settings: "wdth" 100, "wght" 500;
  color: white;
  background: #ff5a47;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  will-change: transform;
  transition: background 200ms, font-variation-settings 200ms, transform 200ms;

  &:hover {
    /* transform: scale(1.05); */
    font-variation-settings: "wdth" 125, "wght" 700;
    background: #ff7262;
  }
`;

const CTAText = styled.h2`
  color: white;
  margin-top: 1rem;
  font-size: calc(2rem + 2.5vw);
  @media (min-width: 87.5rem) {
    font-size: calc(3.75rem);
  }

  font-variation-settings: "wdth" 125, "wght" 700;
  line-height: 110%;
  text-align: center;
  width: 80%;
  max-width: 50rem;

  b {
    -webkit-text-stroke: 3px currentColor;
    -webkit-text-fill-color: transparent;
    font-variation-settings: "wdth" 150, "wght" 650;
    position: relative;
    display: inline-block;
    span {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      color: #2e248f;
      -webkit-text-fill-color: #2e248f;
      -webkit-text-stroke: transparent;
      user-select: none;
      pointer-events: none;
    }
    svg {
      position: absolute;
      top: 100%;
      left: -2.5%;
      width: 105%;
    }
  }
`;

const FooterContent = styled.footer`
  width: 67.5rem;
  max-width: calc(100vw - 5rem);
  display: flex;
  flex-direction: column;
  min-height: 40rem;
  padding-bottom: 4rem;
  position: relative;

  @media (max-width: 50rem) {
    max-width: calc(100vw - 3rem);
  }
`;

const TopContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 4rem 0;

  .logo {
    width: 4rem;
    height: auto;

    @media (max-width: 32rem) {
      display: none;
    }
  }

  @media (max-width: 32rem) {
    padding: 2rem 0;
  }
`;

const FooterBottom = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 4rem 0;

  @media (max-width: 68rem) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    li {
      margin-right: 0;
      margin-bottom: 0.5rem;
    }
  }

  @media (max-width: 32rem) {
    padding-top: 2rem;
  }
`;

const FooterSocial = styled.ul`
  display: flex;
  flex-direction: row;
  list-style-type: none;

  li {
    padding-left: 1rem;
  }

  @media (max-width: 68rem) {
    padding-bottom: 1rem;
    li {
      padding-left: 0;
      padding-right: 1rem;
    }
  }

  @media (max-width: 32rem) {
    li {
      padding: 0 0.5rem;
    }
  }

  svg {
    color: #211e4f;
    width: 1.5rem;
    height: auto;
    transition: color 200ms, transform 200ms;

    &:hover {
      transform: scale(1.1);
      color: var(--color);
    }
  }

  @media (max-width: 32rem) {
    align-self: center;
    padding-bottom: 2rem;
  }
`;

const FooterLegal = styled.ul`
  display: flex;
  flex-direction: row;
  font-size: 0.875rem;
  list-style-type: none;
  color: #211e4f;

  li {
    margin-right: 1.5rem;
    line-height: 200%;
  }

  a {
    color: #211e4f;
    font-variation-settings: "wght" 400;

    transition: font-variation-settings 200ms, letter-spacing 200ms;

    &:hover {
      font-variation-settings: "wght" 600;
    }
  }

  @media (max-width: 62rem) {
    flex-direction: column;
    width: 100%;

    li {
      margin-right: 0;
      margin-bottom: 0.5rem;
    }
  }

  @media (max-width: 32rem) {
    font-size: 1rem;
    a {
      display: block;
      width: 100%;
    }
  }
`;

const FooterAcknowledgement = styled.div`
  color: #211e4f;
  font-size: 0.875rem;
  max-width: 28rem;
  font-variation-settings: "wght" 300;

  p {
    line-height: 150%;
    margin-bottom: 1rem;
  }

  @media (max-width: 32rem) {
    font-size: 1rem;
  }
`;

const LanguageSelectorWrapper = styled.div`
  position: relative;
  will-change: transform;
  transition: color 200ms, transform 200ms;
  color: #2e248f;
  width: 15rem;

  @media (max-width: 32rem) {
    width: 100%;
  }

  :hover {
    color: #5a4cdb;
    transform: scale(1.05);
  }

  svg {
    position: absolute;
    width: 1.5rem;
    height: auto;
    top: 0.75rem;
    pointer-events: none;

    &.chat {
      left: 0.75rem;

      @media (max-width: 32rem) {
        left: 1.25rem;
      }
    }

    &.chevron {
      width: 1.5rem;
      right: 0.75rem;

      @media (max-width: 32rem) {
        right: 1.25rem;
      }
    }
  }
`;

const LanguageSelector = styled.select`
  display: block;
  height: 3rem;
  font-size: 1.125rem;
  padding-left: 3rem;
  color: inherit;
  border: 2px solid currentColor;
  background: white;
  border-radius: 0.75rem;
  font-variation-settings: "wght" 400;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  cursor: pointer;

  @media (max-width: 32rem) {
    padding-left: 3.5rem;
  }
`;

export default function Footer() {
  const ref = React.useRef();
  const intersection = useIntersection(ref, {
    root: null,
    rootMargin: "0px",
    threshold: 0
  });

  return (
    <FooterWrapper ref={ref}>
      <FooterCTA>
        <CTAText>
          Start creating videos{" "}
          <b>
            for free<span>for free</span>
            <svg
              width="362"
              height="13"
              viewBox="0 0 362 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 10.4998C94.4998 1.99986 252.5 0.99981 360 2.99984"
                stroke="#FF7262"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </b>
        </CTAText>
        {/* <Button onMouseEnter={trigger} style={style}> */}
        <Button>Start for free</Button>
      </FooterCTA>
      {intersection && intersection.intersectionRatio > 0 && <Footer3D />}
      <FooterContent>
        <TopContent>
          <svg
            className="logo"
            width="266"
            height="266"
            viewBox="0 0 266 266"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M29.5556 0H0V93.5926H29.5556V0Z" fill="#5A4CDB" />
            <path d="M266 172.407H236.444V266H266V172.407Z" fill="#5A4CDB" />
            <path
              d="M133 187.185C118.529 187.185 104.922 181.548 94.6872 171.313C84.4523 161.078 78.8148 147.471 78.8148 133C78.8148 118.529 84.4523 104.922 94.6872 94.6872C104.922 84.4523 118.529 78.8148 133 78.8148C147.471 78.8148 161.078 84.4523 171.313 94.6872L150.416 115.584C145.764 110.932 139.579 108.37 133 108.37C126.421 108.37 120.236 110.932 115.584 115.584C110.932 120.236 108.37 126.421 108.37 133C108.37 139.579 110.932 145.764 115.584 150.416C120.236 155.068 126.421 157.63 133 157.63C139.579 157.63 145.764 155.068 150.416 150.416L171.313 171.313C161.078 181.548 147.471 187.185 133 187.185Z"
              fill="#211E4F"
            />
            <path d="M133 0H0V29.5556H133V0Z" fill="#468BE8" />
            <path d="M266 236.444H133V266H266V236.444Z" fill="#AD58DB" />
          </svg>
          <LanguageSelectorWrapper>
            <svg
              className="chat"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <svg
              className="chevron"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <LanguageSelector>
              <option>English</option>
              <option>Deutsch</option>
              <option>Español</option>
              <option>Bahasa Indonesia</option>
              <option>Português</option>
              <option>日本語</option>
              <option>Italiano</option>
              <option>русский</option>
              <option>한국어</option>
              <option>中文</option>
              <option>Nederlands</option>
              <option>Svenska</option>
              <option>Norsk</option>
              <option>Suomi</option>
              <option>Dansk</option>
              <option>Język Polski</option>
            </LanguageSelector>
          </LanguageSelectorWrapper>
        </TopContent>
        <FooterLinks />
        <FooterBottom>
          <FooterSocial>
            <li>
              <a href="">
                <svg
                  style={{
                    "--color": "#1877F2"
                  }}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20 10C20 4.47715 15.5229 0 10 0C4.47715 0 0 4.47715 0 10C0 14.9913 3.65686 19.1283 8.4375 19.8785V12.8906H5.89844V10H8.4375V7.79688C8.4375 5.29063 9.93043 3.90625 12.2146 3.90625C13.3087 3.90625 14.4531 4.10156 14.4531 4.10156V6.5625H13.1921C11.9499 6.5625 11.5625 7.33334 11.5625 8.12416V10H14.3359L13.8926 12.8906H11.5625V19.8785C16.3431 19.1283 20 14.9913 20 10Z"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a href="">
                <svg
                  style={{
                    "--color": "#B900B4"
                  }}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.99687 0C7.28187 0 6.94143 0.0115079 5.87516 0.0601587C4.81111 0.10869 4.0844 0.277698 3.44853 0.524841C2.79115 0.780278 2.23365 1.1221 1.67786 1.67786C1.1221 2.23365 0.780278 2.79115 0.524841 3.44853C0.277698 4.0844 0.10869 4.81111 0.0601587 5.87516C0.0115079 6.94143 0 7.28187 0 9.99687C0 12.7118 0.0115079 13.0523 0.0601587 14.1185C0.10869 15.1826 0.277698 15.9093 0.524841 16.5452C0.780278 17.2025 1.1221 17.76 1.67786 18.3158C2.23365 18.8716 2.79115 19.2134 3.44853 19.4689C4.0844 19.716 4.81111 19.885 5.87516 19.9335C6.94143 19.9822 7.28187 19.9937 9.99687 19.9937C12.7118 19.9937 13.0523 19.9822 14.1185 19.9335C15.1826 19.885 15.9093 19.716 16.5452 19.4689C17.2025 19.2134 17.76 18.8716 18.3158 18.3158C18.8716 17.76 19.2134 17.2025 19.4689 16.5452C19.716 15.9093 19.885 15.1826 19.9335 14.1185C19.9822 13.0523 19.9937 12.7118 19.9937 9.99687C19.9937 7.28187 19.9822 6.94143 19.9335 5.87516C19.885 4.81111 19.716 4.0844 19.4689 3.44853C19.2134 2.79115 18.8716 2.23365 18.3158 1.67786C17.76 1.1221 17.2025 0.780278 16.5452 0.524841C15.9093 0.277698 15.1826 0.10869 14.1185 0.0601587C13.0523 0.0115079 12.7118 0 9.99687 0ZM9.99687 1.80123C12.6661 1.80123 12.9823 1.81143 14.0364 1.85952C15.0111 1.90397 15.5404 2.06683 15.8927 2.20373C16.3593 2.38508 16.6923 2.60171 17.0421 2.95155C17.392 3.30135 17.6086 3.63437 17.79 4.10099C17.9269 4.45325 18.0897 4.98258 18.1342 5.95726C18.1823 7.01139 18.1925 7.32758 18.1925 9.99687C18.1925 12.6661 18.1823 12.9823 18.1342 14.0364C18.0897 15.0111 17.9269 15.5404 17.79 15.8927C17.6086 16.3593 17.392 16.6923 17.0421 17.0421C16.6923 17.392 16.3593 17.6086 15.8927 17.79C15.5404 17.9269 15.0111 18.0897 14.0364 18.1342C12.9825 18.1823 12.6663 18.1925 9.99687 18.1925C7.32738 18.1925 7.01127 18.1823 5.95726 18.1342C4.98258 18.0897 4.45325 17.9269 4.10099 17.79C3.63437 17.6086 3.30135 17.392 2.95155 17.0421C2.60175 16.6923 2.38508 16.3593 2.20373 15.8927C2.06683 15.5404 1.90397 15.0111 1.85952 14.0364C1.81143 12.9823 1.80123 12.6661 1.80123 9.99687C1.80123 7.32758 1.81143 7.01139 1.85952 5.95726C1.90397 4.98258 2.06683 4.45325 2.20373 4.10099C2.38508 3.63437 2.60171 3.30135 2.95155 2.95155C3.30135 2.60171 3.63437 2.38508 4.10099 2.20373C4.45325 2.06683 4.98258 1.90397 5.95726 1.85952C7.01139 1.81143 7.32758 1.80123 9.99687 1.80123Z"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.99681 13.3291C8.15642 13.3291 6.66451 11.8372 6.66451 9.99681C6.66451 8.15642 8.15642 6.66451 9.99681 6.66451C11.8372 6.66451 13.3291 8.15642 13.3291 9.99681C13.3291 11.8372 11.8372 13.3291 9.99681 13.3291ZM9.99681 4.86328C7.16161 4.86328 4.86328 7.16161 4.86328 9.99681C4.86328 12.832 7.16161 15.1303 9.99681 15.1303C12.832 15.1303 15.1303 12.832 15.1303 9.99681C15.1303 7.16161 12.832 4.86328 9.99681 4.86328Z"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.533 4.66058C16.533 5.32312 15.9959 5.86018 15.3334 5.86018C14.6709 5.86018 14.1338 5.32312 14.1338 4.66058C14.1338 3.99804 14.6709 3.46094 15.3334 3.46094C15.9959 3.46094 16.533 3.99804 16.533 4.66058Z"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a href="">
                <svg
                  style={{
                    "--color": "#1DA1F2"
                  }}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6.2896 18.251C13.8368 18.251 17.9648 11.9982 17.9648 6.57584C17.9648 6.39824 17.9648 6.22144 17.9528 6.04544C18.7559 5.46457 19.4491 4.74534 20 3.92144C19.2511 4.25328 18.4567 4.4709 17.6432 4.56704C18.4998 4.05423 19.1409 3.24766 19.4472 2.29744C18.6417 2.7754 17.7605 3.11225 16.8416 3.29344C16.2229 2.63559 15.4047 2.19997 14.5135 2.05401C13.6223 1.90805 12.7078 2.05987 11.9116 2.48598C11.1154 2.9121 10.4819 3.58875 10.109 4.41123C9.73605 5.23371 9.64462 6.15616 9.8488 7.03584C8.2174 6.95405 6.62144 6.5301 5.16451 5.79151C3.70759 5.05292 2.42227 4.01619 1.392 2.74864C0.867274 3.65197 0.70656 4.72133 0.942583 5.73899C1.17861 6.75665 1.79362 7.6461 2.6624 8.22624C2.00939 8.20689 1.37062 8.03073 0.8 7.71264C0.8 7.72944 0.8 7.74704 0.8 7.76464C0.800259 8.71201 1.12821 9.63014 1.72823 10.3633C2.32824 11.0964 3.16338 11.5994 4.092 11.787C3.4879 11.9518 2.85406 11.9759 2.2392 11.8574C2.50141 12.6728 3.01189 13.3858 3.69926 13.8967C4.38662 14.4076 5.21649 14.691 6.0728 14.707C4.61979 15.849 2.82485 16.4689 0.9768 16.467C0.650323 16.4664 0.324163 16.4466 0 16.4078C1.87651 17.6121 4.05993 18.2508 6.2896 18.2478" />
                </svg>
              </a>
            </li>
            <li>
              <a href="">
                <svg
                  style={{
                    "--color": "#0077b5"
                  }}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18.5205 0H1.47504C0.661129 0 0 0.645573 0 1.44226V18.5572C0 19.3539 0.661129 20.0006 1.47504 20.0006H18.5205C19.3361 20.0006 20 19.3539 20 18.5572V1.44226C20 0.645573 19.3361 0 18.5205 0ZM4.44919 2.75342C5.3981 2.75342 6.16812 3.524 6.16812 4.47347C6.16812 5.42349 5.3981 6.19407 4.44919 6.19407C3.49638 6.19407 2.72803 5.42349 2.72803 4.47347C2.72803 3.524 3.49638 2.75342 4.44919 2.75342ZM2.96359 17.0427H5.93312V7.49799H2.96359V17.0427ZM10.6369 7.4979H7.79346V17.0426H10.7563V12.3219C10.7563 11.0763 10.9919 9.87019 12.5358 9.87019C14.0581 9.87019 14.077 11.2941 14.077 12.4008V17.0426H17.0432V11.808C17.0432 9.2374 16.4881 7.26123 13.4842 7.26123C12.0414 7.26123 11.0735 8.05236 10.678 8.80294H10.6369V7.4979Z"
                    />
                  </g>
                </svg>
              </a>
            </li>
            <li>
              <a href="">
                <svg
                  style={{
                    "--color": "#fe2c55"
                  }}
                  viewBox="0 0 60 60"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M41.4614 0C42.4515 8.51482 47.204 13.5913 55.4668 14.1314V23.7083C50.6783 24.1763 46.4839 22.6102 41.6054 19.6579V37.5696C41.6054 60.3238 16.7989 67.4345 6.82589 51.1249C0.417249 40.6299 4.34164 22.2141 24.8997 21.4761V31.575C23.3336 31.8271 21.6594 32.2231 20.1293 32.7451C15.5568 34.2933 12.9645 37.1916 13.6846 42.3041C15.0708 52.097 33.0366 54.9953 31.5424 35.8594V0.0180017H41.4614V0Z"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a href="">
                <svg
                  style={{
                    "--color": "#E60023"
                  }}
                  viewBox="0 0 36 36"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 18.0003C0 25.371 4.43222 31.7031 10.7745 34.487C10.7239 33.2301 10.7655 31.7212 11.0879 30.3536C11.4339 28.8924 13.404 20.5453 13.404 20.5453C13.404 20.5453 12.8289 19.396 12.8289 17.6974C12.8289 15.0299 14.375 13.0376 16.3004 13.0376C17.9377 13.0376 18.7287 14.2674 18.7287 15.74C18.7287 17.3859 17.679 19.8478 17.1391 22.128C16.6881 24.0374 18.0965 25.5949 19.9801 25.5949C23.3906 25.5949 25.6875 21.2145 25.6875 16.0246C25.6875 12.0795 23.0304 9.1267 18.1976 9.1267C12.7374 9.1267 9.33581 13.1986 9.33581 17.747C9.33581 19.3153 9.79819 20.4211 10.5224 21.2775C10.8554 21.6709 10.9017 21.8291 10.7812 22.2808C10.6948 22.6119 10.4965 23.4093 10.4144 23.7253C10.2946 24.1812 9.92517 24.3442 9.51314 24.1758C6.9982 23.1491 5.82694 20.395 5.82694 17.299C5.82694 12.1857 10.1393 6.05447 18.6916 6.05447C25.5639 6.05447 30.0871 11.0275 30.0871 16.3658C30.0871 23.427 26.1615 28.7023 20.3747 28.7023C18.4314 28.7023 16.6035 27.6518 15.9772 26.4586C15.9772 26.4586 14.9323 30.6059 14.7109 31.4068C14.3293 32.7946 13.5823 34.1817 12.8992 35.2628C14.5181 35.7407 16.2283 36.001 18.0007 36.001C27.9406 36.001 36.0001 27.9419 36.0001 18.0003C36.0001 8.05908 27.9406 0 18.0007 0C8.05978 0 0 8.05908 0 18.0003Z" />
                </svg>
              </a>
            </li>
            <li>
              <a href="">
                <svg
                  style={{
                    "--color": "#ff0000"
                  }}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.40549 3.13325C1.61191 3.192 0.167501 4.61146 0.0937283 6.40448C0.0432252 7.63194 0 9.0086 0 10.125C0 11.1961 0.0397855 12.4669 0.0876136 13.6076C0.162575 15.3956 1.60512 16.8077 3.39366 16.8663C5.38369 16.9316 7.9572 17 10 17C12.0428 17 14.6164 16.9316 16.6064 16.8663C18.3949 16.8077 19.8375 15.3956 19.9124 13.6077C19.9602 12.4672 20 11.1966 20 10.125C20 9.00807 19.9568 7.63158 19.9063 6.4044C19.8325 4.61141 18.3881 3.19201 16.5946 3.13325C14.6064 3.06813 12.0393 3 10 3C7.96075 3 5.39365 3.06813 3.40549 3.13325ZM7.75 13.0311L13 10L7.75 6.96891L7.75 13.0311Z"
                  />
                </svg>
              </a>
            </li>
          </FooterSocial>
          <FooterLegal>
            <li>© 2021 Clipchamp</li>
            <li>
              <a href="">Terms & conditions</a>
            </li>
            <li>
              <a href="">Privacy policy</a>
            </li>
            <li>
              <a href="">Cookie notice</a>
            </li>
            <li>
              <a href="">Childrens policy</a>
            </li>
          </FooterLegal>
        </FooterBottom>
        <FooterAcknowledgement>
          <p>
            Clipchamp is created worldwide, but we're headquartered in Brisbane
            Australia, on the traditional lands of the Yuggera Nation.
          </p>

          <p>
            We acknowledge the traditional custodians of country, and pay our
            respects to Elders past, present and emerging.
          </p>
        </FooterAcknowledgement>
      </FooterContent>
    </FooterWrapper>
  );
}
