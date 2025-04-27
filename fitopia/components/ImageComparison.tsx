import React from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

interface ImageComparisonProps {
  leftSource: string;
  rightSource: string;
  width?: string | number;
  height?: string | number;
}

const ImageComparison: React.FC<ImageComparisonProps> = ({
  leftSource,
  rightSource,
  width = "50%",
  height = "auto",
}) => {
  const style = {
    width: width,
    height: height,
  };

  return (
    <div
      className="max-w-[600px] border-2 border-[#171717] dark:border-white rounded-3xl overflow-hidden"
      style={style}
    >
      <ReactCompareSlider
        itemOne={
          <ReactCompareSliderImage
            src={leftSource}
            alt="Left Image"
            className="rounded-3xl object-cover"
            style={{ width: "100%", height: "100%" }}
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src={rightSource}
            alt="Right Image"
            className="rounded-3xl object-cover"
            style={{ width: "100%", height: "100%" }}
          />
        }
        position={50}
      />
    </div>
  );
};

export default ImageComparison;
