import { FaStar } from "react-icons/fa";
import styles from "./RepositoryCard.module.css";

type RepositoryCardPropsType = {
  title: string;
  description: string;
  stargazerCount: number;
};
const RepositoryCard = ({
  title,
  description,
  stargazerCount,
}: RepositoryCardPropsType) => {
  return (
    <div className={styles.repositoryCard}>
      <div className={styles.header}>
        <h5>{title}</h5>
        <div className={styles.stargazerCount}>
          <p>{stargazerCount}</p>
          <FaStar />
        </div>
      </div>
      <p>{description}</p>
    </div>
  );
};

export default RepositoryCard;
