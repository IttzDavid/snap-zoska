"use client";

import { useState } from "react";
import { Box, CardMedia, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface CarouselProps {
  images: { imageUrl: string }[];
}

export default function Carousel({ images }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const nextImage = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Image container */}
      <Box sx={{ position: "relative", width: "100%", overflow: "hidden" }}>
        <Box
          sx={{
            width: "100%",
            paddingTop: "100%", // Ensures a square aspect ratio
            position: "relative",
            overflow: "hidden",
          }}
        >
          <CardMedia
            component="img"
            image={images[currentIndex]?.imageUrl}
            alt={`Image ${currentIndex + 1}`}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>

        {/* Navigation buttons */}
        {images.length > 1 && (
          <>
            {currentIndex > 0 && (
              <IconButton
                onClick={prevImage}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "10px",
                  transform: "translateY(-50%)",
                  backgroundColor: "rgba(0, 0, 0, 0.6)", // Darker background for better contrast
                  color: "white",
                  fontSize: "small",
                  borderRadius: "50%",
                  padding: "8px",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                  },
                }}
              >
                <ArrowBackIosIcon fontSize="small" />
              </IconButton>
            )}
            {currentIndex < images.length - 1 && (
              <IconButton
                onClick={nextImage}
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  backgroundColor: "rgba(0, 0, 0, 0.6)", // Darker background for better contrast
                  color: "white",
                  fontSize: "small",
                  borderRadius: "50%",
                  padding: "8px",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                  },
                }}
              >
                <ArrowForwardIosIcon fontSize="small" />
              </IconButton>
            )}
          </>
        )}
      </Box>

      {/* Indicator dots */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "5px",
          marginTop: "10px",
        }}
      >
        {images.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor:
                currentIndex === index ? "text.primary" : "text.secondary",
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
