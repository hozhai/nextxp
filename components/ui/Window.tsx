"use client";

import React, { useState, useRef, useEffect, ReactNode } from "react";
import { X, Minus, Maximize } from "lucide-react";

interface OrderedPair {
  x: number;
  y: number;
}

interface WindowProps {
  title: string;
  initialPosition: OrderedPair;
  initialSize: OrderedPair;
  children: ReactNode;
}

type ResizeDirection = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw" | null;

export default function Window({
  title,
  initialPosition,
  initialSize,
  children,
}: WindowProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [position, setPosition] = useState({
    x: initialPosition.x,
    y: initialPosition.y,
  });
  const [size, setSize] = useState({
    width: initialSize.x,
    height: initialSize.y,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeDirection, setResizeDirection] = useState<ResizeDirection>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMinimize = () => setIsMinimized(!isMinimized);
  const handleFullscreen = () => setIsFullscreen(!isFullscreen);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && windowRef.current) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      }
      if (resizeDirection && windowRef.current) {
        const rect = windowRef.current.getBoundingClientRect();
        let newWidth = size.width;
        let newHeight = size.height;
        let newX = position.x;
        let newY = position.y;

        if (resizeDirection.includes("e")) {
          newWidth = e.clientX - rect.left;
        }
        if (resizeDirection.includes("s")) {
          newHeight = e.clientY - rect.top;
        }
        if (resizeDirection.includes("w")) {
          newWidth = rect.right - e.clientX;
          newX = e.clientX;
        }
        if (resizeDirection.includes("n")) {
          newHeight = rect.bottom - e.clientY;
          newY = e.clientY;
        }

        setSize({
          width: Math.max(200, newWidth),
          height: Math.max(100, newHeight),
        });
        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setResizeDirection(null);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    isDragging,
    resizeDirection,
    size.width,
    size.height,
    position.x,
    position.y,
    dragOffset.x,
    dragOffset.y,
  ]);

  if (isMinimized) return null;

  const resizeCursors = {
    n: "cursor-n-resize",
    s: "cursor-s-resize",
    e: "cursor-e-resize",
    w: "cursor-w-resize",
    ne: "cursor-ne-resize",
    nw: "cursor-nw-resize",
    se: "cursor-se-resize",
    sw: "cursor-sw-resize",
  };

  return (
    <div
      ref={windowRef}
      className={`absolute bg-[#ECE9D8] border-2 border-[#0055EA] shadow-xl rounded-t-lg overflow-hidden
                  ${isFullscreen ? "fixed inset-0 w-screen h-screen" : ""}`}
      style={{
        width: isFullscreen ? "100%" : `${size.width}px`,
        height: isFullscreen ? "100%" : `${size.height}px`,
        left: isFullscreen ? 0 : `${position.x}px`,
        top: isFullscreen ? 0 : `${position.y}px`,
      }}
    >
      <div
        className="bg-gradient-to-r from-[#0058EE] to-[#3A93FF] p-1 flex justify-between items-center cursor-move"
        onMouseDown={handleMouseDown}
      >
        <h2 className="text-white font-bold px-2">{title}</h2>
        <div className="flex space-x-1">
          <button
            onClick={handleMinimize}
            className="bg-[#D6D2C9] p-1 rounded-sm hover:bg-[#FFF8E1]"
          >
            <Minus className="w-3 h-3 text-black" />
          </button>
          <button
            onClick={handleFullscreen}
            className="bg-[#D6D2C9] p-1 rounded-sm hover:bg-[#FFF8E1]"
          >
            <Maximize className="w-3 h-3 text-black" />
          </button>
          <button
            onClick={() => alert("close")}
            className="bg-[#D6D2C9] p-1 rounded-sm hover:bg-[#FFF8E1]"
          >
            <X className="w-3 h-3 text-black" />
          </button>
        </div>
      </div>
      <div className="p-4 bg-white h-[calc(100%-2rem)] overflow-auto">
        {children}
      </div>
      {Object.entries(resizeCursors).map(([direction, cursorClass]) => (
        <div
          key={direction}
          className={`absolute ${cursorClass}`}
          style={{
            width: ["n", "s"].includes(direction) ? "100%" : "10px",
            height: ["e", "w"].includes(direction) ? "100%" : "10px",
            top: direction.includes("n") ? 0 : "auto",
            bottom: direction.includes("s") ? 0 : "auto",
            left: direction.includes("w") ? 0 : "auto",
            right: direction.includes("e") ? 0 : "auto",
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            setResizeDirection(direction as ResizeDirection);
          }}
        />
      ))}
    </div>
  );
}
