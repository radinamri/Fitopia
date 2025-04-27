"use client";
import { useState } from "react";
import { UserDataProvider } from "@/context/UserDataContext";
import ImageComparison from "@/components/ImageComparison";
import Camera from "@/public/icons/Camera";
import PersonStanding from "@/public/icons/PersonStanding";
import Link from "next/link";
import Modal from "@/components/Modal";
import GenderSelection from "@/components/GenderSelection";
import MaleBodyShapeSelection from "@/components/MaleBodyShapeSelection";
import FemaleBodyShapeSelection from "@/components/FemaleBodyShapeSelection";
import HeightSelection from "@/components/HeightSelection";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [gender, setGender] = useState<"Male" | "Female" | null>(null);

  const handleNext = () => {
    if (step < 5) setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (step >= 1) setStep((prev) => prev - 1);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <UserDataProvider>
      <div className="flex flex-col w-full min-h-screen justify-center items-center gap-16 font-[family-name:var(--font-geist-sans)]">
        <video
          className="w-full h-full object-cover filter brightness-90 z-1"
          src="/videos/virtual-try-on.mp4"
          autoPlay
          loop
          muted
        />
        <div className="absolute top-50 left-0 right-0 flex flex-col items-center justify-center gap-4 z-20">
          <div className="flex flex-col justify-center items-center">
            <p className="font-bold text-4xl text-[#171717]">
              TRY ON The Future of Fashion
            </p>
            <p className="font-bold text-2xl text-[#171717]">
              “Your Perfect Outfit, One Click Away!”
            </p>
          </div>
          <div className="flex flex-row justify-center items-center gap-16">
            <Link
              className="flex flex-row justify-center items-center font-medium text-md bg-[#171717] text-white transition-colors duration-200 gap-1 p-4 rounded-xl shadow-2xl hover:scale-105 pl-16 pr-16"
              href={"/room"}
            >
              <Camera />
              <PersonStanding />
              TRY ON in your FITOPIA-ROOM
            </Link>
          </div>
        </div>
        <div className="flex flex-col w-[85%] h-auto justify-center items-center bg-white rounded-4xl shadow-xl p-16 gap-8">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col justify-center items-start gap-8">
              <div>
                <p className="font-bold text-4xl dark:text-[#171717]">
                  TRY ON The Future of Fashion
                </p>
                <p className="font-bold text-2xl dark:text-[#171717]">
                  “Your Perfect Outfit, One Click Away!”
                </p>
              </div>
              <div className="flex flex-row w-full justify-start items-center gap-8">
                <Link
                  className="font-medium text-md dark:text-[#171717] hover:underline hover:underline-offset-4 transition-colors duration-200"
                  href={"/about"}
                >
                  About FITOPIA-AI
                </Link>
              </div>
            </div>
            <ImageComparison
              leftSource="/before.png"
              rightSource="/after.png"
              width="50%"
              height="auto"
            />
          </div>
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {step === 0 && (
            <GenderSelection
              onNext={(selectedGender) => {
                setGender(selectedGender);
                handleNext();
              }}
              onBack={handleClose}
            />
          )}

          {step === 1 && (
            <div className="flex flex-col items-center gap-4">
              <p className="font-bold text-2xl text-[#171717] mb-4">
                Choose Your Body Shape
              </p>
              {gender === "Male" ? (
                <MaleBodyShapeSelection
                  onNext={() => handleNext()}
                  onBack={handleBack}
                />
              ) : (
                <FemaleBodyShapeSelection
                  onNext={() => handleNext()}
                  onBack={handleBack}
                />
              )}
            </div>
          )}

          {step === 2 && (
            <HeightSelection onNext={() => handleNext()} onBack={handleBack} />
          )}

          {step === 3 && (
            <div className="flex flex-col gap-4">
              <p className="font-bold text-2xl text-[#171717] mb-4">
                Enter Additional Details
              </p>
              <input
                type="text"
                placeholder="Age"
                className="border-2 border-[#171717] text-[#171717] p-2 rounded-lg w-full"
              />
              <input
                type="text"
                placeholder="Height (cm)"
                className="border-2 border-[#171717] text-[#171717] p-2 rounded-lg w-full"
              />
              <div className="flex flex-row justify-center items-center gap-4 mt-4">
                <button
                  onClick={handleBack}
                  className="border-2 border-[#171717] p-2 rounded-lg"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="border-2 border-[#171717] p-2 rounded-lg"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="flex flex-col gap-4">
              <p className="font-bold text-2xl text-[#171717] mb-4">
                Confirmation
              </p>
              <p className="text-[#171717]">All details are correct?</p>
              <div className="flex flex-row justify-center items-center gap-4 mt-4">
                <button
                  onClick={handleBack}
                  className="border-2 border-[#171717] p-2 rounded-lg"
                >
                  Back
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="border-2 border-[#171717] p-2 rounded-lg bg-[#171717] text-white"
                >
                  Finish
                </button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </UserDataProvider>
  );
}
