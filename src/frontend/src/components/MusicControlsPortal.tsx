import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import MusicControls from './MusicControls';

/**
 * Portal wrapper that renders MusicControls in a top-level layer (document.body)
 * to ensure visibility above all transformed/parallax/overflow containers.
 */
export default function MusicControlsPortal() {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Create or reuse a dedicated overlay root for music controls
    let root = document.getElementById('music-controls-portal-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'music-controls-portal-root';
      root.style.position = 'fixed';
      root.style.inset = '0';
      root.style.pointerEvents = 'none'; // Allow clicks to pass through to content below
      root.style.zIndex = '9999'; // Ensure top-level stacking
      document.body.appendChild(root);
    }
    setPortalRoot(root);

    return () => {
      // Clean up on unmount if needed (optional, can persist across remounts)
      if (root && root.parentNode && !document.getElementById('music-controls-portal-root')?.hasChildNodes()) {
        root.parentNode.removeChild(root);
      }
    };
  }, []);

  if (!portalRoot) {
    return null;
  }

  return createPortal(<MusicControls />, portalRoot);
}
