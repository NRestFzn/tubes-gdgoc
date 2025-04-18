type PreloadImageProps = {
  path: string
}

export const PreloadImageCSS: React.FC<PreloadImageProps> = ({ path }) => {
  return (
    <div
      style={{
        position: 'absolute',
        width: 0,
        height: 0,
        overflow: 'hidden',
        WebkitMaskImage: `url(${path})`,
        maskImage: `url(${path})`,
      }}
    />
  );
};