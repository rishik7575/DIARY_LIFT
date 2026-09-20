'use client';

import React, { useId, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface SparklesProps {
  id?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
}

export const SparklesCore: React.FC<SparklesProps> = ({
  id,
  background,
  minSize = 1,
  maxSize = 3,
  particleDensity = 80,
  className,
  particleColor = '#FFFFFF',
}) => {
  const generatedId = useId();
  const canvasId = id || generatedId;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 300);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 300);

    const count = Math.floor((width * height) / (10000 / (particleDensity / 10)));
    const particles = Array.from({ length: Math.min(count, 120) }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * (maxSize - minSize) + minSize,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.7 + 0.3,
      pulseSpeed: Math.random() * 0.02 + 0.005,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      if (background) {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, width, height);
      }

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity += Math.sin(Date.now() * p.pulseSpeed) * 0.01;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = particleColor;
        ctx.globalAlpha = Math.max(0.1, Math.min(0.9, p.opacity));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || 300;
      height = canvas.height = canvas.parentElement?.clientHeight || 300;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [mounted, canvasId, background, minSize, maxSize, particleDensity, particleColor]);

  return (
    <div className={cn('relative w-full h-full pointer-events-none', className)}>
      <canvas id={canvasId} className="w-full h-full block" />
    </div>
  );
};
