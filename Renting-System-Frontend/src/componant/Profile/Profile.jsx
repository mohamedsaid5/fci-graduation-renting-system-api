import "./profile.css";
import React, { useEffect, useMemo, useState } from "react";
import centerIcon from "./images/imgCenter.png";
import ApartmentCard from "../ApartmentCard";
import useAuth from "../../hooks/useAuth";
import fetchData from "../../func/fetch";
import guest from "../../assets/icons/guest.png";
import { mediaHandle, objectToFormData } from "../../func/helpers";
import { Link } from "react-router-dom";
import { API_BASE } from "../../constants";
import { getStorageItem } from "../../func/localstorage";
import { handleError } from "../../func/handleError";

const EsraaProfile = () => {
  const { updateAuth, user, removeFav, setUser } = useAuth();
  const data = useMemo(() => user["saved_apartments"] ?? [], [user]);

  const [personal, setPersonal] = useState(true);

  const [name, setName] = useState(user?.username);
  const [avatar, setAvatar] = useState(user?.avatar);
  const [fName, setFName] = useState(user?.first_name);
  const [lName, setLName] = useState(user?.last_name);
  const [email, setEmail] = useState(user?.email);
  const [media, setMedia] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    if (!user.id) return;

    setName(user?.username);
    setFName(user?.first_name);
    setAvatar(user?.avatar);
    setLName(user?.last_name);
    setEmail(user?.email);
  }, [user.id]);

  const onRemoveFav = async (id) => {
    let result = await fetchData(
      `saved_apartments/${id}/remove/`,
      null,
      null,
      "DELETE"
    );

    if (!result.error_status) {
      removeFav(id);
    }
  };

  const updateProfile = async () => {
    let body = {
      first_name: fName,
      last_name: lName,
    };

    if (name != user?.username) body["username"] = name;
    if (email != user?.email) body["email"] = email;

    let form = objectToFormData({
      ...body,
      ...(media ? { avatar: media } : {}),
    });
    let token = getStorageItem("auth_t");

    try {
      setIsLoading(true);

      const response = await fetch(`${API_BASE}/api/profile/update/`, {
        method: "PUT",
        body: form,
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      setIsLoading(false);
      const data = await response?.json();
      if (!response?.ok)
        return setError(
          handleError(data, "Somethink Want Warn Please Try Again!")
        );

      data && setUser((user) => ({ ...user, ...(data?.data ?? data) }));
    } catch ({ message }) {
      setIsLoading(false);
      setError(message);
    }
  };

  const deleteAccount = async () => {
    let result = await fetchData(`deactivate-account/`, null, null, "DELETE");

    if (result.error_status) return;

    updateAuth(false);
  };

  const handleSetMedia = (file) => {
    setMedia(file);

    let newAvatar = file && mediaHandle(file)?.file;
    if (newAvatar) setAvatar(newAvatar);
  };

  return (
    <div className="container">
      <div className="row ms-4 mt-2">
        <hr />
        <div className="input-group mb-3 col-lg-6 col-sm-12">
          <span className="col-3 mt-2 ">My Account</span>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-4 col-sm-12">
          <div className="card bg-body-secondary" style={{ width: "15rem" }}>
            <ul className="list-group list-group-flush ">
              <li
                className="list-group-item bg-body-secondary"
                onClick={() => setPersonal(true)}
                style={{ cursor: "pointer" }}
              >
                <div className="link-secondary link-offset-2 link-underline-opacity-0 link-underline-opacity-0-hover">
                  Personal Information
                </div>
              </li>
              <li
                className="list-group-item bg-body-secondary"
                onClick={() => setPersonal(false)}
                style={{ cursor: "pointer" }}
              >
                <div className="link-secondary link-offset-2 link-underline-opacity-0 link-underline-opacity-0-hover">
                  Saved properties ({data?.length || 0})
                </div>
              </li>

              {user.user_type == "owner" && (
                <Link
                  to={"/owner/apartment"}
                  style={{ color: "#000", textDecoration: "unset" }}
                >
                  <li className="list-group-item bg-body-secondary">
                    <div className="link-secondary link-offset-2 link-underline-opacity-0 link-underline-opacity-0-hover">
                      Owner Apartments
                    </div>
                  </li>
                </Link>
              )}
            </ul>
          </div>
        </div>

        {personal && (
          <div className="col-lg-6 col-sm-12 text-center">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                paddingTop: "1rem",
              }}
            >
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.5rem",
              }}
            >
              <label>
                <div className="avatar-icon x64" style={{ cursor: "pointer" }}>
                  <img src={avatar ?? guest} alt="" />

                  {media && (
                    <div
                      className="avatar-x"
                      onClick={() => {
                        setAvatar(user.avatar);
                        setTimeout(() => setMedia(false), 50);
                      }}
                    >
                      x
                    </div>
                  )}
                </div>

                {!media && (
                  <input
                    type="file"
                    onChange={({ target }) => handleSetMedia(target.files[0])}
                    accept="image/*"
                    hidden
                  />
                )}
              </label>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="usernameInput" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="usernameInput"
                placeholder="Username"
                value={name}
                onChange={({ target }) => setName(target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="firstNameInput" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstNameInput"
                placeholder="First Name"
                value={fName}
                onChange={({ target }) => setFName(target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="lastNameInput" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastNameInput"
                placeholder="Last Name"
                value={lName}
                onChange={({ target }) => setLName(target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="emailInput" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="emailInput"
                placeholder="Email"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
              />
            </div>

            <div className="d-grid gap-2">
              <button
                disabled={isLoading}
                className="btn btn-success"
                type="button"
                style={isLoading ? { background: "#9ad9b5" } : {}}
                onClick={updateProfile}
              >
                {isLoading ? "Uploading..." : "Save"}
              </button>
            </div>
            <div className="d-grid gap-2">
              <button
                className="btn btn-outline-success ms-1 mt-4"
                type="button"
                onClick={deleteAccount}
              >
                Delete My Account
              </button>
            </div>
          </div>
        )}
      </div>

      {!personal && (
        <>
          {data.length == 0 && (
            <div className="imageE">
              <img src={centerIcon} alt="" />
              <h3>No Saved Apartments</h3>
              <p>
                Click on a heart to save a property and all your favorites will
                appear here.
              </p>
            </div>
          )}

          <div className="row" style={{ marginTop: "1rem" }}>
            {data.map((item) => {
              return (
                <ApartmentCard
                  item={item}
                  key={item.id}
                  isFav={true}
                  onRmoveFav={() => onRemoveFav(item.id)}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default EsraaProfile;
