import { useSetBackground } from "@Root/src/store";

export const CustomColor = () => {
  const { backgroundColor } = useSetBackground();
  return (
    <div className="h-screen" style={{ backgroundColor }}>
    </div>
  );
};
