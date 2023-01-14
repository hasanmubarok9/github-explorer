import { useEffect, useState, type KeyboardEventHandler } from "react";
import { type UserDataType, fetchUsers } from "./modules/users/usersAPI";
import { isErrorWithMessage } from "./modules/helper";
import Loading from "./components/atoms/Loading";
import "./App.css";
import Dropdown from "./components/molecules/Dropdown";
import RepositoryCard from "./components/organisms/RepositoryCard";
import Snackbar, { type SnackbarPropsType } from "./components/atoms/Snackbar";

function App() {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState<UserDataType[] | never[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showData, setShowData] = useState(false);
  const [snackbar, setSnackbar] = useState<
    SnackbarPropsType & { show: boolean }
  >({
    variant: "success",
    message: "",
    show: false,
  });

  const getUsers = async () => {
    setShowData(false);
    setIsLoading(true);
    const result = await fetchUsers(username);
    if (isErrorWithMessage(result)) {
      setSnackbar({
        variant: "error",
        message: result.message,
        show: true,
      });
    } else {
      setUsers(result);
      setShowData(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (snackbar.show) {
      setTimeout(() => {
        setShowData(false);
        setSnackbar({
          variant: "success",
          message: "",
          show: false,
        });
      }, 2000);
    }
  }, [snackbar.show]);

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
          {users.length > 0 ? (
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
            ))
          ) : (
            <div className="not-found">Data Not found :-(</div>
          )}
        </div>
      )}
      {snackbar.show && (
        <Snackbar variant={snackbar.variant} message={snackbar.message} />
      )}
    </div>
  );
}

export default App;
