import { useRef, useEffect } from 'react';
import { useScrollSpy } from '@/providers';

export const useRegisterSection = (id: string) => {
  const ref = useRef<HTMLElement | null>(null);
  const { register, unRegister } = useScrollSpy();

  useEffect(() => {
    if (ref.current) register(id, ref.current);
    return () => unRegister(id);
  }, [id]);

  return ref;
};
