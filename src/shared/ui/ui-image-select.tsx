import clsx from "clsx";
import Image, { ImageProps } from "next/image";

type ImgExtraProps = Pick<ImageProps, 'width'|'height'>;

export function UiImageSelect<T>({
  className,
  onChange,
  value,
  getSrc,
  label,
  images,
  error,
  getImgExtraProps,
}: {
  className?: string;
  label?: string;
  error?: string;
  value?: T;
  onChange?: (value: T) => void;
  images: T[];
  getSrc: (value: T) => string;
  getImgExtraProps?: (value: T) => ImgExtraProps;
}) {
  return (
    <div className={clsx("flex flex-col gap-2", className)}>
      <div className="text-md">{label}</div>
      <div className="flex gap-2">
        {images.map((image, i) => (
          <button
            className={clsx(image === value && "ring-2 ring-teal-600")}
            key={i}
            type="button"
            onClick={() => onChange?.(image)}
          >
            <Image
              className="w-12 h-12"
              alt=""
              src={getSrc(image)}
              {...(getImgExtraProps ? getImgExtraProps(image) : {}) }
            />
          </button>
        ))}
      </div>
      {error && <div className="text-rose-400 text-sm">{error}</div>}
    </div>
  );
}
