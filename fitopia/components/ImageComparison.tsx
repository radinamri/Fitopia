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
    <div className="w-[50%] max-w-[600px] border-2 border-gray-500 rounded-4xl p-1 overflow-hidden">
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
