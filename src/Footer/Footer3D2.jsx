import React, { useRef, useState, useEffect, useCallback } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import styled from "styled-components";
import { useSpring, a } from "@react-spring/three";
import { animated as a2 } from "react-spring";
import { ThreeDContext } from "../util/ThreeDStore";
import ThreeDControls, { SLIDER_DEFAULT_STATE } from "../util/ThreeDControls";
import { degToRad } from "../util/ThreeDHelpers";

const CanvasWrapper = styled(a2.div)`
  width: 100vw;
  max-width: 90rem;
  height: 100vh;
  max-height: 50rem;
  position: absolute;
  top: 0;
`;

const isBrowser = typeof window !== "undefined";
// const INITIAL_ZOOM = isBrowser
//   ? (window.innerWidth / window.innerHeight) * 6
//   : 6;
const INITIAL_ZOOM = 6;

export const GLOSSY = 0.2;
export const MATTE = 0.2;

const PURPLE = "#5232D0";
const BLUE = "#3B48C4";
const PINK = "#8343B2";

const RoundedShape = ({
  geometry,
  spring,
  position,
  scale,
  rotation,
  color,
  newPos,
  newRot,
  squish,
  float
}) => {
  const objectRef = useRef();

  useFrame((state) => {
    if (objectRef) {
      const time = state.clock.getElapsedTime();

      objectRef.current.position.x = position[0] + Math.sin(time * float.x);
      objectRef.current.position.y = position[1] + Math.sin(time * float.y);
      objectRef.current.position.z = position[2] + Math.sin(time * float.y);

      objectRef.current.rotation.x = degToRad(rotation.x);
      objectRef.current.rotation.y =
        degToRad(rotation.y) + Math.sin(time * float.x) / 7;
      objectRef.current.rotation.z = degToRad(rotation.z);
    }
  });

  return geometry ? (
    <group ref={objectRef} scale={scale}>
      <mesh
        renderGl
        // castShadow
        geometry={geometry.geometry}
        scale={geometry.scale}
        position={geometry.position}
      >
        <meshStandardMaterial
          attach="material"
          flatShading={false}
          color={color}
          roughness={1}
          metalness={0}
        />
      </mesh>
    </group>
  ) : null;
};

const ThreeDScene = ({ shapes, sliders }) => {
  const { forceResize } = useThree();

  useEffect(() => {
    if (forceResize) {
      forceResize();
    }
  }, [forceResize]);

  return (
    <>
      <ambientLight color={0xeef2ff} intensity={1.05} />
      <directionalLight color={0xeef2ff} intensity={0.6} />
      <pointLight intensity={0.6} position={[200, 70, 250]} color={0xeef2ff} />
      {shapes && (
        <>
          <RoundedShape
            geometry={shapes.rectSml}
            scale={[2.5, 2.5, 2.5]}
            position={[-56.5, 34.5, -100]}
            rotation={{ x: 87, y: 31, z: 53 }}
            float={{ x: 0.3, y: 0.4 }}
            color={PURPLE}
          />
          <RoundedShape
            geometry={shapes.rectMd}
            scale={[2.5, 2.5, 2.5]}
            position={[66, 26.5, 0]}
            rotation={{ x: 4, y: -52, z: 55 }}
            float={{ x: 0.3, y: 0.4 }}
            color={PINK}
          />
          <RoundedShape
            geometry={shapes.rectLrg}
            scale={[2.5, 2.5, 2.5]}
            position={[-64.5, -26, -10]}
            rotation={{ x: -115, y: 12, z: -93 }}
            float={{ x: -0.5, y: 0.8 }}
            color={BLUE}
          />
          <RoundedShape
            geometry={shapes.hook}
            scale={[2.5, 2.5, 2.5]}
            position={[13, 31, 7]}
            rotation={{ x: 71, y: 18, z: -66 }}
            float={{ x: -0.2, y: -0.7 }}
            color={PINK}
          />
          <RoundedShape
            geometry={shapes.c}
            scale={[2.5, 2.5, 2.5]}
            position={[-8, -30, 5]}
            rotation={{ x: -19, y: 40, z: 31 }}
            float={{ x: -0.8, y: 0.9 }}
            color={PURPLE}
          />
          <RoundedShape
            geometry={shapes.c}
            scale={[2.5, 2.5, 2.5]}
            position={[-63.5, 20.5, 0]}
            rotation={{ x: 35, y: 65, z: -29 }}
            float={{ x: -0.2, y: 0.8 }}
            color={BLUE}
          />
          <RoundedShape
            geometry={shapes.donut}
            scale={[2.5, 2.5, 2.5]}
            position={[58.5, -14, 15.5]}
            rotation={{ x: -21, y: -49, z: 0 }}
            float={{ x: 0.4, y: -0.6 }}
            color={BLUE}
          />
        </>
      )}
    </>
  );
};

export default ({ windowSize }) => {
  const [sliders, setSliders] = useState(SLIDER_DEFAULT_STATE);

  const handleInput = (name) => (event) => {
    event.persist();
    setSliders((state) => ({
      ...state,
      [name]: parseFloat(event.target.value)
    }));
  };
  return (
    <ThreeDContext.Consumer>
      {(shapes) => (
        <CanvasWrapper
          style={{
            willChange: "opacity"
          }}
        >
          <>
            {/* <ThreeDControls values={sliders} handleChange={handleInput} /> */}
            {isBrowser && (
              <Canvas
                style={{
                  pointerEvents: "none"
                }}
                id="canvas"
                colorManagement={false}
                gl={{ antialias: true }}
                resize={{
                  scroll: false,
                  debounce: { scroll: 50, resize: 50 }
                }}
                camera={{
                  position: [0, 0, 220],
                  near: 0.01,
                  far: 10000000000,
                  zoom: 6,
                  fov: 100
                }}
                // shadowMap
                onCreated={({ gl }) => {
                  // gl.shadowMap.enabled = true
                  // gl.shadowMap.type = THREE.PCFShadowMap
                  gl.setPixelRatio(window.devicePixelRatio);
                }}
              >
                <ThreeDScene shapes={shapes} sliders={sliders} />
              </Canvas>
            )}
          </>
        </CanvasWrapper>
      )}
    </ThreeDContext.Consumer>
  );
};
