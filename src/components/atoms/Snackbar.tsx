import styles from "./Snackbar.module.css";

export type SnackbarPropsType = {
  variant: "success" | "error";
  message: string;
};
const Snackbar = ({ variant, message }: SnackbarPropsType) => {
  return (
    <div
      className={styles.snackbar}
      style={{ backgroundColor: variant === "error" ? "red" : "green" }}
    >
      <p>{message}</p>
    </div>
  );
};

export default Snackbar;
