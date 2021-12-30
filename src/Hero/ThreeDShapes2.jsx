import React, { useRef, useState, useEffect, useCallback } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import styled from "styled-components";
import { useSpring, a } from "@react-spring/three";
import { animated as a2 } from "react-spring";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const CanvasWrapper = styled(a2.div)`
  width: 100vw;
  height: 100vh;
  position: absolute;
`;

const isBrowser = typeof window !== "undefined";
const INITIAL_ZOOM = isBrowser
  ? (window.innerWidth / window.innerHeight) * 6
  : 6;

// const INITIAL_ZOOM = 0.5;
export const GLOSSY = 0.2;
export const MATTE = 0.8;

const PURPLE = "#5232D0";
const BLUE = "#3358B8";
const PINK = "#8343B2";

function makeRoundedRect(ctx, x, y, width, height, radius) {
  const properX = x - width / 2;
  const properY = y - height / 2;
  ctx.moveTo(properX, properY + radius);
  ctx.lineTo(properX, properY + height - radius);
  ctx.quadraticCurveTo(
    properX,
    properY + height,
    properX + radius,
    properY + height
  );
  ctx.lineTo(properX + width - radius, properY + height);
  ctx.quadraticCurveTo(
    properX + width,
    properY + height,
    properX + width,
    properY + height - radius
  );
  ctx.lineTo(properX + width, properY + radius);
  ctx.quadraticCurveTo(
    properX + width,
    properY,
    properX + width - radius,
    properY
  );
  ctx.lineTo(properX + radius, properY);
  ctx.quadraticCurveTo(properX, properY, properX, properY + radius);
}

const roundedRect = new THREE.Shape();
makeRoundedRect(roundedRect, 0, 0, 10, 10 * 5, 1);

const extrudeSettings = {
  steps: 6,
  depth: 6,
  bevelEnabled: true,
  bevelThickness: 3,
  bevelSize: 3,
  bevelOffset: 0,
  bevelSegments: 10
};

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
        geometry={geometry}
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

const RoundedRectangle = ({
  spring,
  position,
  scale,
  rotation,
  color,
  newPos,
  newRot,
  float
}) => {
  const meshRef = useRef();
  const sceneRef = useRef();
  const geoRef = useRef();

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
      geoRef.current.computeVertexNormals();

      const nScale = sp < 0.92 ? 1 - sp * 0.3 : 0.7 - (sp - 0.92) * 12 * 0.3;
      const scaleY = 1 - sp * 0.3;
      sceneRef.current.scale.x = nScale * scale[0];
      sceneRef.current.scale.y = scaleY * scale[1];
      sceneRef.current.scale.z = nScale * scale[2];

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

  return (
    <scene ref={sceneRef}>
      <mesh
        ref={meshRef}
        renderGl
        //  castShadow
        scale={scale}
      >
        <extrudeGeometry
          attach="geometry"
          ref={geoRef}
          args={[roundedRect, extrudeSettings]}
        ></extrudeGeometry>
        <meshStandardMaterial
          attach="material"
          flatShading={false}
          color={color}
          roughness={0.8}
          metalness={0}
        />
      </mesh>
    </scene>
  );
};

const ThreeDScene = ({ spring, windowSize }) => {
  const [models, setModels] = useState();
  const sceneRef = useRef();
  const { forceResize } = useThree();

  useEffect(() => {
    if (forceResize) {
      forceResize();
    }
  }, [windowSize]);

  useEffect(() => {
    new GLTFLoader().load("/allShapesOptimisedV3.gltf", (loaded) => {
      console.log(loaded);
      // if (loaded?.scene?.children.length === 4) {
      setModels({
        hook: loaded.scene.children[0].children[0].geometry,
        rect: loaded.scene.children[1].children[0].geometry,
        donut: loaded.scene.children[2].children[0].geometry,
        c: loaded.scene.children[3].children[0].geometry
      });
      // }
    });
  }, []);

  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight color={0xeeeeff} intensity={0.75} />
      <pointLight
        intensity={0.75}
        position={[0, 50, 250]}
        // castShadow
        // shadow-mapSize-width={2048}
        // shadow-mapSize-height={2048}
        // shadow-radius={7}
        // shadow-bias={0.0005}
        color={0xeeeeff}
      />
      <pointLight intensity={0.5} position={[0, 30, -200]} />
      {models && (
        <>
          <RoundedShape
            geometry={models.rect}
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
          <RoundedRectangle
            spring={spring}
            scale={[0.7, 0.7, 0.7]}
            position={
              windowSize.width > windowSize.height
                ? [-15, -35, 0]
                : [-24, -25, 200]
            }
            rotation={{ x: 0.9, y: 0.2, z: -1 }}
            float={{ x: 0.5, y: 1.3 }}
            newPos={{ x: 2.7, y: -18 }}
            newRot={{ x: 1.6, y: 0, z: -1.6 }}
            squish={{ x: false, y: false, z: true }}
            color={BLUE}
          />
          <RoundedShape
            geometry={models.c}
            spring={spring}
            scale={[0.0018, 0.0018, 0.0018]}
            position={
              windowSize.width > windowSize.height
                ? [-68, 0, -20]
                : [-20, 50, 140]
            }
            rotation={{ x: -0.5, y: 0.7, z: 0 }}
            float={{ x: -0.8, y: 1.3 }}
            newPos={{ x: -27.5, y: -14, z: 0 }}
            newRot={{ x: 1.6, y: 0, z: -1.6 }}
            squish={{ x: true, y: false, z: true }}
            color={PURPLE}
          />
          <RoundedShape
            geometry={models.donut}
            spring={spring}
            scale={[0.0018, 0.0018, 0.0018]}
            position={
              windowSize.width > windowSize.height
                ? [30, -26, -20]
                : [32, -30, 140]
            }
            rotation={{ x: 0.5, y: -0.4, z: 0 }}
            float={{ x: 0.4, y: -0.8 }}
            newPos={{ x: 10.6, y: -20, z: 0 }}
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
            resize={{ scroll: false, debounce: { scroll: 50, resize: 50 } }}
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
            <ThreeDScene spring={spring} windowSize={windowSize} />
          </Canvas>
        )}
      </>
    </CanvasWrapper>
  );
};
