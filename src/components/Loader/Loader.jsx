import { RotatingLines } from "react-loader-spinner";

import css from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={css.loaderWrapper}>
      <RotatingLines
        type="ThreeDots"
        color="#00BFFF"
        height={200}
        width={200}
        animationDuration="0.75"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
};
