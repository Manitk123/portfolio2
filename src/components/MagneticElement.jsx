import { cloneElement } from 'react';
import useMagnetic from '../hooks/useMagnetic';

export default function MagneticElement({ children, strength = 0.5, radius = 50 }) {
  const ref = useMagnetic(strength, radius);
  
  // Clone the child element and attach the ref
  return cloneElement(children, { ref });
}
