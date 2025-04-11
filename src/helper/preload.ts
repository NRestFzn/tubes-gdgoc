import { useEffect } from 'react';

type PreloadImageProps = {
  path: string
}

export const PreloadImage: React.FC<PreloadImageProps> = ({ path }): null => {
  useEffect(() => {
    const img = new Image();
    img.src = path;
  }, [path]);

  return null;
};