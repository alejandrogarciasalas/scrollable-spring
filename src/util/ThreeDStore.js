import React, { createContext, useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ThreeDStore = ({ children }) => {
  const [models, setModels] = useState(null);

  useEffect(() => {
    new GLTFLoader().load("/allShapesOptimisedV5.gltf", (loaded) => {
      console.log("Loaded", loaded);

      setModels({
        rectSml: loaded.scene.children[0].children[0],
        rectMd: loaded.scene.children[2].children[0],
        rectLrg: loaded.scene.children[3].children[0],
        arc: loaded.scene.children[1].children[0],
        c: loaded.scene.children[4].children[0],
        donut: loaded.scene.children[5].children[0],
        hook: loaded.scene.children[6].children[0]
      });
    });
  }, []);

  return (
    <ThreeDContext.Provider value={models}>{children}</ThreeDContext.Provider>
  );
};

export const ThreeDContext = createContext(null);
export default ThreeDStore;
