import React, { createContext, useState, ReactNode } from "react";

// Define the structure for virtual try-on related images
interface VirtualTryOnImages {
  modelImage?: any; // Image of the model
  clothImage?: any; // Image of the clothing item
  resultImage?: any; // Resultant image after virtual try-on
}

// Define the context type, including virtual try-on images and a setter function
interface VirtualTryOnContextType {
  virtualTryOnImages: VirtualTryOnImages;
  setVirtualTryOnImages: React.Dispatch<
    React.SetStateAction<VirtualTryOnImages>
  >; // Function to update virtual try-on images
}

// Create the context with an initial undefined state
const VirtualTryOnContext = createContext<VirtualTryOnContextType | undefined>(
  undefined
);

// Provider component that wraps the application and provides virtual try-on image context
export const VirtualTryOnProvider = ({ children }: { children: ReactNode }) => {
  // Initialize virtual try-on images state with default values (initially null)
  const [virtualTryOnImages, setVirtualTryOnImages] =
    useState<VirtualTryOnImages>({
      modelImage: null,
      clothImage: null,
      resultImage: null,
    });

  return (
    // Provide the virtual try-on images and setter function to all child components
    <VirtualTryOnContext.Provider
      value={{ virtualTryOnImages, setVirtualTryOnImages }}
    >
      {children}
    </VirtualTryOnContext.Provider>
  );
};

// Custom hook to access the virtual try-on image context
export const useVirtualTryOn = () => {
  const context = React.useContext(VirtualTryOnContext);

  // Ensure the hook is used within a valid provider
  if (!context) {
    throw new Error(
      "useVirtualTryOn must be used within a VirtualTryOnProvider"
    );
  }

  return context;
};
