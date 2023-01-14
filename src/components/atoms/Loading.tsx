import style from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={style.loading} role="progressbar">
      <div></div>
    </div>
  );
};

export default Loading;
