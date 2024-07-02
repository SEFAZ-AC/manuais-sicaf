import feather, { FeatherIcon } from "feather-icons";

const DynamicIcon = ({
  name,
  size,
}: {
  name: string;
  size?: "xs" | "sm" | "lg" | "md";
}) => {
  const iconName = name as keyof typeof feather.icons;
  const icon: FeatherIcon | undefined = feather.icons[iconName];
  return icon ? (
    <span
      className={`${
        size === "lg"
          ? "min-w-6 min-h-6 max-w-6 max-h-6"
          : size === "sm"
          ? "min-w-4 min-h-4 max-w-4 max-h-4"
          : size === "xs"
          ? "min-w-3 min-h-3 max-w-3 max-h-3"
          : "min-w-5 min-h-5 max-w-5 max-h-5"
      } flex items-center justify-center`}
    >
      <figure dangerouslySetInnerHTML={{ __html: icon.toSvg() }} />
    </span>
  ) : (
    ""
  );
};

export default DynamicIcon;
