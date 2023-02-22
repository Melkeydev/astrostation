import { useUnsplashStore } from "@Root/src/store";
import "./Unsplash.scss";

export const Unsplash = () => {
  const { dailyUnsplash } = useUnsplashStore();

  return (
    <div>
      <div
        className="unsplash-container"
        style={{
          background: `url(${
            dailyUnsplash.urls ? dailyUnsplash.urls.raw + "&dpr=2&w=1699" : ""
          }) no-repeat center center fixed`,
        }}
      ></div>
    </div>
  );
};
