import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

export default function LottieAnimation({ animationData, loop = true, className }) {
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !animationData) return;

    // Destroi animação anterior se existir
    if (animationRef.current) {
      animationRef.current.destroy();
    }

    // Carrega nova animação
    animationRef.current = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop: loop,
      autoplay: true,
      animationData: animationData
    });

    // Cleanup na desmontagem
    return () => {
      if (animationRef.current) {
        animationRef.current.destroy();
      }
    };
  }, [animationData, loop]);

  return <div ref={containerRef} className={className} />;
}