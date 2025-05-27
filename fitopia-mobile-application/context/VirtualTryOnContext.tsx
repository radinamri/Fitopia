import React, { createContext, useState, ReactNode } from "react";

// Define the structure for virtual try-on related images
interface VirtualTryOnImages {
  modelImage?: string | null; // Image of the model
  clothImage?: string | null; // Image of the clothing item
  resultImage?: string | null; // Resultant image after virtual try-on
}

// Define the gender type
type Gender = "Male" | "Female" | null;

// Define the context type, including virtual try-on images and a setter function
interface VirtualTryOnContextType {
  virtualTryOnImages: VirtualTryOnImages;
  setVirtualTryOnImages: React.Dispatch<
    React.SetStateAction<VirtualTryOnImages>
  >; // Function to update virtual try-on images
  gender: Gender;
  setGender: React.Dispatch<React.SetStateAction<Gender>>; // Function to update gender
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

  // Initialize gender state with null
  const [gender, setGender] = useState<Gender>(null);

  return (
    // Provide the virtual try-on images and setter function to all child components
    <VirtualTryOnContext.Provider
      value={{ virtualTryOnImages, setVirtualTryOnImages, gender, setGender }}
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
