import { useState, type KeyboardEventHandler } from "react";
import { type UserDataType, fetchUsers } from "./modules/users/usersAPI";
import Loading from "./components/atoms/Loading";
import "./App.css";
import Dropdown from "./components/molecules/Dropdown";
import RepositoryCard from "./components/organisms/RepositoryCard";

function App() {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState<UserDataType[] | never[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showData, setShowData] = useState(false);

  const getUsers = async () => {
    setShowData(false);
    setIsLoading(true);
    const listUsers = await fetchUsers(username);
    setUsers(listUsers);
    setIsLoading(false);
    setShowData(true);
  };

  // handle press enter key
  const handlePress: KeyboardEventHandler<HTMLInputElement> | undefined = (
    e
  ) => {
    if (e.key === "Enter") {
      getUsers();
    }
  };

  return (
    <div className="container">
      <div
        id="search-bar"
        style={{
          position: showData ? "static" : "absolute",
          transform: showData ? "none" : "translate(-50%, 25%)",
        }}
      >
        <div className="title">
          <h1>Github Explorer</h1>
        </div>
        <input
          type="text"
          placeholder="Enter Username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handlePress}
        />
        {isLoading ? (
          <Loading />
        ) : (
          <button disabled={username === ""} onClick={getUsers}>
            Search
          </button>
        )}
      </div>
      {showData && (
        <div id="users-section">
          {users.length > 0 &&
            users.map(({ login: githubUsername, repositories, id: userId }) => (
              <Dropdown key={userId} label={githubUsername}>
                {repositories.length > 0 &&
                  repositories.map(
                    ({
                      id,
                      name: title,
                      description,
                      stargazers_count: stargazersCount,
                    }) => (
                      <RepositoryCard
                        key={id}
                        title={title}
                        description={description}
                        stargazerCount={stargazersCount}
                      />
                    )
                  )}
              </Dropdown>
            ))}
        </div>
      )}
    </div>
  );
}

export default App;
