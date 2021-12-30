import React, { useRef, useState } from "react";
import styled from "styled-components";
import Confetti from "./Confetti";
import { useSpring, useChain, config, animated as a } from "react-spring";

export function getRandomNumber(max, min = 1, withNegative = true) {
  const num = Math.floor(Math.random() * (max - min)) + min; // this will get a number between min and max;
  return !withNegative
    ? num
    : Math.floor(Math.random() * 2) === 1
    ? num * 1
    : num * -1; // this will add minus sign in 50% of cases
}

const Wrapper = styled(a.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  color: #211e4f;
  user-select: none;
  will-change: transform, opacity;
`;

const Text = styled.span`
  font-variation-settings: "wght" 700, "wdth" 125;
  line-height: 90%;
  position: relative;
`;

const Number = styled.span`
  line-height: 100%;
  position: relative;
`;

export default function Word({ toggle, word, num, left, top, size }) {
  const [{ rot, dRot }] = useState({
    rot: getRandomNumber(20),
    dRot: getRandomNumber(20, 5)
  });

  const wordRef = useRef();
  const wordSpring = useSpring({
    ref: wordRef,
    config: { mass: 1, tension: 270, friction: 17 },
    from: {
      opacity: 0,
      transform: `translate(-50%, -50%) scale(0.7) rotate(${rot}deg)`
    },
    to: {
      opacity: toggle ? 1 : 0,
      transform: toggle
        ? `translate(-50%, -50%) scale(1) rotate(${rot + dRot}deg)`
        : `translate(-50%, -50%) scale(0.7) rotate(${rot}deg)`
    }
  });

  const confettiRef = useRef();
  const { conSpr } = useSpring({
    ref: confettiRef,
    config: { mass: 0.1, tension: 400, friction: 60 },
    from: { conSpr: 0 },
    to: { conSpr: toggle ? 1 : 0 }
  });

  useChain(
    toggle ? [wordRef, confettiRef] : [confettiRef, wordRef],
    [0, 0.3],
    500
  );

  return (
    <Wrapper
      style={{
        left,
        top,
        ...wordSpring
      }}
    >
      {[...Array(Math.floor(size * 1.5))].map((x, i) => (
        <Confetti spr={conSpr} wordSize={size} key={i} />
      ))}
      <Text
        style={{
          fontSize: `${size}rem`
        }}
      >
        {word}
      </Text>
      <Number>{num}</Number>
    </Wrapper>
  );
}
