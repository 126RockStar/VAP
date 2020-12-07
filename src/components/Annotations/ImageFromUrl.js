import React, { useState, useEffect } from "react";
import { Image } from "react-konva";

const ImageFromUrl = ({
  imageUrl,
  setCanvasMeasures,
  onMouseDown,
  onMouseUp,
  onMouseMove,
  opacity,
}) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const imageToLoad = new window.Image();
    imageToLoad.src = imageUrl;

    imageToLoad.width = 1080;
    imageToLoad.height = 640;

    const onLoad = () => {
      setImage(imageToLoad);
      setCanvasMeasures({
        width: imageToLoad.width,
        height: imageToLoad.height,
      });
    };

    imageToLoad.addEventListener("load", onLoad);

    return () => imageToLoad.removeEventListener("load", onLoad);
  }, [imageUrl, setImage, setCanvasMeasures]);

  return (
    <Image
      image={image}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      opacity={opacity}
    />
  );
};

export default ImageFromUrl;
