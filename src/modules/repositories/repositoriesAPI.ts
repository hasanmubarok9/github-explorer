export type RepositoryDataType = {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
};

export const fetchRepositories = async (username: string) => {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`
  );
  const data: Array<RepositoryDataType> = await response.json();
  return data;
};
