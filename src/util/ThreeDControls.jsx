import React, { useState } from "react";

const POS_SLIDER_DEFAULT = { min: -100, max: 100, step: 0.5 };
const ROT_SLIDER_DEFAULT = { min: -180, max: 180, step: 1 };

export const SLIDER_DEFAULT_STATE = {
  x: 0,
  y: 0,
  z: 0,
  xR: 0,
  yR: 0,
  zR: 0
};

const SLIDER_DEFAULT = [
  {
    name: "x",
    settings: POS_SLIDER_DEFAULT
  },
  {
    name: "y",
    settings: POS_SLIDER_DEFAULT
  },
  {
    name: "z",
    settings: POS_SLIDER_DEFAULT
  },
  {
    name: "xR",
    settings: ROT_SLIDER_DEFAULT
  },
  {
    name: "yR",
    settings: ROT_SLIDER_DEFAULT
  },
  {
    name: "zR",
    settings: ROT_SLIDER_DEFAULT
  }
];

export default function ThreeDControls({
  sliders = SLIDER_DEFAULT,
  values,
  handleChange
}) {
  return (
    <div
      style={{
        zIndex: "100",
        position: "fixed",
        top: "5rem",
        left: 0,
        padding: "0.5rem",
        background: "#333333aa"
      }}
    >
      {sliders.map((x) => (
        <div
          style={{ display: "flex", alignItems: "center", padding: "0.5rem" }}
        >
          <label for="inputX" style={{ marginRight: "0.5rem", color: "white" }}>
            {x.name}
          </label>
          <input
            style={{ width: "200px" }}
            type="range"
            value={values[x.name]}
            id={`input-${x.name}`}
            onChange={handleChange(x.name)}
            min={x.settings.min}
            max={x.settings.max}
            step={x.settings.step}
          />
          <p style={{ marginLeft: "0.5rem", color: "white" }}>
            {values[x.name]}
          </p>
        </div>
      ))}
      <code style={{ display: "block", color: "white" }}>
        {`position={[${values.x}, ${values.y}, ${values.z}]}`}
      </code>
      <code style={{ display: "block", color: "white" }}>
        {`rotation={{ x: ${values.xR}, y: ${values.yR}, z: ${values.zR} }}`}
      </code>
    </div>
  );
}
