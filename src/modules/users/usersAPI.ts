import {
  type RepositoryDataType,
  fetchRepositories,
} from "../repositories/repositoriesAPI";

export type UserDataType = {
  id: number;
  repositories: Array<RepositoryDataType>;
  login: string;
};

export type UserDataResponseType = {
  incomplete_results: boolean;
  items: Array<UserDataType>;
  total_count: number;
};

export const fetchUsers = async (
  username: string
): Promise<Array<UserDataType>> => {
  const response = await fetch(
    `https://api.github.com/search/users?q=${username}`
  );
  if (response.ok) {
    const { items, total_count: totalCount }: UserDataResponseType =
      await response.json();
    const total = totalCount < 5 ? totalCount : 5;
    const users: Array<UserDataType> = [];
    for (let i = 0; i < total; i++) {
      const repositories = await fetchRepositories(items[i].login);
      if (repositories) {
        users.push({ ...items[i], repositories });
      }
    }
    return users;
  } else {
    return Promise.reject({ message: "an unknown error occured" });
  }
};
