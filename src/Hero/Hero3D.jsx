import React, { useRef, useState, useEffect, useCallback } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import styled from "styled-components";
import { useSpring, a } from "@react-spring/three";
import { animated as a2 } from "react-spring";
import { ThreeDContext } from "../util/ThreeDStore";

const CanvasWrapper = styled(a2.div)`
  width: 100vw;
  height: 100vh;
  position: absolute;
`;

const isBrowser = typeof window !== "undefined";
const INITIAL_ZOOM = isBrowser
  ? (window.innerWidth / window.innerHeight) * 6
  : 6;

export const GLOSSY = 0.2;
export const MATTE = 0.8;

const PURPLE = "#5232D0";
// const BLUE = "#3358B8";
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
  const meshRef = useRef();
  const sceneRef = useRef();

  useFrame((state) => {
    if (meshRef && sceneRef) {
      const time = state.clock.getElapsedTime();
      const dRot = {
        x: (rotation.x - newRot.x) * -1,
        y: (rotation.y - newRot.y) * -1,
        z: (rotation.z - newRot.z) * -1
      };
      const dPos = {
        x: (position[0] - newPos.x) * -1,
        y: (position[1] - newPos.y) * -1,
        z: (position[2] - 0) * -1
      };
      const sp = spring.getValue();

      const nScale = sp < 0.92 ? 1 - sp * 0.3 : 0.7 - (sp - 0.92) * 20 * 0.3;
      const scaleX = 1 - sp * 0.3;
      sceneRef.current.scale.x = squish.x ? nScale : scaleX;
      sceneRef.current.scale.y = squish.y ? nScale : scaleX;
      sceneRef.current.scale.z = squish.z ? nScale : scaleX;

      sceneRef.current.position.x =
        position[0] + sp * dPos.x + Math.sin(time * float.x) * (1 - sp);
      sceneRef.current.position.y =
        position[1] + sp * dPos.y + Math.sin(time * float.y) * (1 - sp);
      sceneRef.current.position.z = position[2] + sp * dPos.z;

      sceneRef.current.rotation.x = rotation.x + sp * dRot.x;
      sceneRef.current.rotation.y = rotation.y + sp * dRot.y;
      sceneRef.current.rotation.z = rotation.z + sp * dRot.z;
    }
  });

  return geometry ? (
    <a.scene ref={sceneRef}>
      <mesh
        ref={meshRef}
        renderGl
        // castShadow
        geometry={geometry.geometry}
        scale={scale}
      >
        <meshStandardMaterial
          attach="material"
          flatShading={false}
          color={color}
          roughness={0.8}
          metalness={0}
        />
      </mesh>
    </a.scene>
  ) : null;
};

const ThreeDScene = ({ shapes, spring, windowSize }) => {
  // const [models, setModels] = useState();
  const { forceResize } = useThree();

  useEffect(() => {
    if (forceResize) {
      forceResize();
    }
  }, [forceResize, windowSize]);

  return (
    <>
      <ambientLight color={0xeef2ff} intensity={0.92} />
      <directionalLight color={0xeef2ff} intensity={0.7} />
      <pointLight
        intensity={0.65}
        position={[0, 50, 250]}
        // castShadow
        // shadow-mapSize-width={2048}
        // shadow-mapSize-height={2048}
        // shadow-radius={7}
        // shadow-bias={0.0005}
        color={0xeef2ff}
      />
      <pointLight intensity={0.5} position={[0, 30, -200]} />
      {shapes && (
        <>
          <RoundedShape
            geometry={shapes.rectLrg}
            spring={spring}
            scale={[0.0018, 0.0016, 0.0018]}
            position={
              windowSize.width > windowSize.height ? [40, 0, 0] : [26, 34, 140]
            }
            rotation={{ x: 0, y: 0.6, z: 0.3 }}
            float={{ x: -0.7, y: 1.1 }}
            newPos={{ x: 48.5, y: -13.7 }}
            newRot={{ x: 1.57, y: 0, z: 1.57 }}
            squish={{ x: false, y: false, z: true }}
            color={PURPLE}
          />
          <RoundedShape
            geometry={shapes.rectLrg}
            spring={spring}
            scale={[0.0018, 0.0017, 0.0018]}
            position={
              windowSize.width > windowSize.height
                ? [-39, -35, 0]
                : [-24, -25, 200]
            }
            rotation={{ x: 0.9, y: 0.2, z: -1 }}
            float={{ x: 0.5, y: 1.3 }}
            newPos={{ x: -7, y: -18 }}
            newRot={{ x: 1.6, y: 0, z: -1.6 }}
            squish={{ x: false, y: false, z: true }}
            color={BLUE}
          />
          <RoundedShape
            geometry={shapes.c}
            spring={spring}
            scale={[0.0022, 0.0022, 0.0022]}
            position={
              windowSize.width > windowSize.height
                ? [-68, 0, -20]
                : [-42, 26, 140]
            }
            rotation={{ x: -0.5, y: 0.7, z: 0 }}
            float={{ x: -0.8, y: 1.3 }}
            newPos={{ x: -29.5, y: -14.5, z: 0 }}
            newRot={{ x: 1.6, y: 0, z: -1.6 }}
            squish={{ x: true, y: false, z: true }}
            color={PURPLE}
          />
          <RoundedShape
            geometry={shapes.donut}
            spring={spring}
            scale={[0.0022, 0.0022, 0.0022]}
            position={
              windowSize.width > windowSize.height
                ? [30, -26, -20]
                : [32, -30, 140]
            }
            rotation={{ x: 0.5, y: -0.4, z: 0 }}
            float={{ x: 0.4, y: -0.8 }}
            newPos={{ x: 12.2, y: -20, z: 0 }}
            newRot={{ x: 1.53, y: 0, z: 0 }}
            squish={{ x: false, y: true, z: true }}
            color={PINK}
          />
        </>
      )}
    </>
  );
};

export default ({ spring, windowSize }) => {
  return (
    <ThreeDContext.Consumer>
      {(shapes) => (
        <CanvasWrapper
          style={{
            willChange: "opacity",
            pointerEvents: "none",
            opacity: spring.interpolate((o) =>
              o < 0.97 ? 1 : 1 - (o - 0.97) * 33.33 * 1
            )
          }}
        >
          <>
            {isBrowser && (
              <Canvas
                id="canvas"
                colorManagement={false}
                gl={{ antialias: true }}
                resize={{
                  scroll: false,
                  debounce: { scroll: 50, resize: 50 }
                }}
                camera={{
                  position: [0, 0, 326],
                  near: 0.01,
                  far: 10000000000,
                  zoom: INITIAL_ZOOM,
                  fov: 100
                }}
                // shadowMap
                onCreated={({ gl }) => {
                  // gl.shadowMap.enabled = true
                  // gl.shadowMap.type = THREE.PCFShadowMap
                  gl.setPixelRatio(window.devicePixelRatio);
                }}
              >
                <ThreeDScene
                  shapes={shapes}
                  spring={spring}
                  windowSize={windowSize}
                />
              </Canvas>
            )}
          </>
        </CanvasWrapper>
      )}
    </ThreeDContext.Consumer>
  );
};
