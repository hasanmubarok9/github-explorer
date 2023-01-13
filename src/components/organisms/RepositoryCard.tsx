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
        <p>{stargazerCount} bintang</p>
      </div>
      <p>{description}</p>
    </div>
  );
};

export default RepositoryCard;
