"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ParticleBackground() {
    const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; duration: number; opacityStart: number; yJitter: number; xJitter: number }[]>([]);

    useEffect(() => {
        // Generate particles client-side to avoid hydration mismatch
        const newParticles = Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 1,
            duration: Math.random() * 20 + 10,
            opacityStart: Math.random() * 0.3 + 0.1,
            yJitter: Math.random() * 20,
            xJitter: (Math.random() - 0.5) * 10,
        }));
        setTimeout(() => setParticles(newParticles), 0);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full bg-white transition-opacity"
                    initial={{
                        x: `${particle.x}vw`,
                        y: `${particle.y}vh`,
                        opacity: particle.opacityStart,
                    }}
                    animate={{
                        y: [
                            `${particle.y}vh`,
                            `${particle.y - particle.yJitter}vh`,
                            `${particle.y}vh`,
                        ],
                        x: [
                            `${particle.x}vw`,
                            `${particle.x + particle.xJitter}vw`,
                            `${particle.x}vw`,
                        ],
                        opacity: [0.1, 0.4, 0.1],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        width: particle.size,
                        height: particle.size,
                        boxShadow: `0 0 ${particle.size * 2}px ${particle.size}px rgba(0, 212, 255, 0.2)`,
                    }}
                />
            ))}
            {/* Background gradients */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#7c3aed]/10 blur-[120px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#00d4ff]/10 blur-[120px]" />
        </div>
    );
}
