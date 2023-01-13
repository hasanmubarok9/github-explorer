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
    <div className="repository-card">
      <h5>{title}</h5>
      <p>{description}</p>
      <p>{stargazerCount} bintang</p>
    </div>
  );
};

export default RepositoryCard;
