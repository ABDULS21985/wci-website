"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfettiPiece {
    id: number;
    x: number;
    delay: number;
    duration: number;
    color: string;
    rotation: number;
    size: number;
}

const CONFETTI_COLORS = [
    "#1E4DB7", // Primary blue
    "#FFE63B", // Yellow
    "#F59A23", // Orange
    "#22C55E", // Green
    "#143A8F", // Secondary blue
];

interface ConfettiProps {
    isActive: boolean;
    duration?: number;
}

export function Confetti({ isActive, duration = 3000 }: ConfettiProps) {
    const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

    useEffect(() => {
        if (isActive) {
            const newPieces: ConfettiPiece[] = [];
            const pieceCount = 50;

            for (let i = 0; i < pieceCount; i++) {
                newPieces.push({
                    id: i,
                    x: Math.random() * 100, // percentage across width
                    delay: Math.random() * 0.5,
                    duration: 2 + Math.random() * 2,
                    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
                    rotation: Math.random() * 360,
                    size: 6 + Math.random() * 6,
                });
            }

            setPieces(newPieces);

            // Clear confetti after duration
            const timer = setTimeout(() => {
                setPieces([]);
            }, duration);

            return () => clearTimeout(timer);
        } else {
            setPieces([]);
        }
    }, [isActive, duration]);

    return (
        <AnimatePresence>
            {pieces.length > 0 && (
                <div className="fixed inset-0 pointer-events-none overflow-hidden z-50" aria-hidden="true">
                    {pieces.map((piece) => (
                        <motion.div
                            key={piece.id}
                            className="absolute"
                            initial={{
                                opacity: 1,
                                x: `${piece.x}vw`,
                                y: -20,
                                rotate: piece.rotation,
                                scale: 1,
                            }}
                            animate={{
                                y: "110vh",
                                rotate: piece.rotation + 720,
                                x: `calc(${piece.x}vw + ${(Math.random() - 0.5) * 200}px)`,
                            }}
                            exit={{ opacity: 0 }}
                            transition={{
                                duration: piece.duration,
                                delay: piece.delay,
                                ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                            style={{
                                width: piece.size,
                                height: piece.size,
                                backgroundColor: piece.color,
                                borderRadius: Math.random() > 0.5 ? "50%" : "2px",
                            }}
                        />
                    ))}
                </div>
            )}
        </AnimatePresence>
    );
}
