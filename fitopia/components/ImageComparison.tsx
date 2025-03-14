import React from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

interface ImageComparisonProps {
  leftSource: string;
  rightSource: string;
}

const ImageComparison: React.FC<ImageComparisonProps> = ({
  leftSource,
  rightSource,
}) => {
  return (
    <div
      style={{
        width: "50%",
        maxWidth: "600px",
        borderWidth: 4,
        borderRadius: 20,
        borderColor: "white",
        overflow: "hidden",
      }}
    >
      <ReactCompareSlider
        itemOne={<ReactCompareSliderImage src={leftSource} alt="Left Image" />}
        itemTwo={
          <ReactCompareSliderImage src={rightSource} alt="Right Image" />
        }
        position={50}
      />
    </div>
  );
};

export default ImageComparison;
