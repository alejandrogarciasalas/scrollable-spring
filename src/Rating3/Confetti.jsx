import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as ConfettiSvg } from "../svg/confetti.svg";
import { useSpring, animated as a } from "react-spring";

const Wrapper = styled(a.div)`
  color: #ad5adb;
  position: absolute;
  will-change: transform, opacity;
`;

export function getRandomNumber(max, min = 1, withNegative = true) {
  const num = Math.floor(Math.random() * (max - min)) + min; // this will get a number between min and max;
  return !withNegative
    ? num
    : Math.floor(Math.random() * 2) === 1
    ? num * 1
    : num * -1; // this will add minus sign in 50% of cases
}

const colors = ["#AD58DB", "#468BE8", "#FCCEF5", "#FF7262"];

export default function Confetti({ spr, wordSize }) {
  const [{ size, x, y, rot, dRot, color }] = useState({
    size: getRandomNumber(wordSize / 1.5, 1, false),
    x: getRandomNumber(wordSize * 2, 1, true),
    y: getRandomNumber(wordSize * 2, 1, true),
    rot: getRandomNumber(360, 1, false),
    dRot: getRandomNumber(180, 30, true),
    color: getRandomNumber(4, 0, false)
  });
  return (
    <Wrapper
      style={{
        transform: spr.interpolate(
          (o) => `
          translate(calc(-50% + ${o * x}rem), calc(-50% + ${o * y}rem))
          rotate(${rot + o * dRot}deg)
        `
        ),
        opacity: spr.interpolate((o) => o)
      }}
    >
      <ConfettiSvg
        style={{
          color: colors[color],
          width: `${size}rem`,
          height: "auto"
        }}
      />
    </Wrapper>
  );
}
