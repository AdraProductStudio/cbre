import React, { useContext, useState } from "react";
import { Toaster } from "react-hot-toast";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";

import CommonContext from "../StateManagment/CommonContext";

const LoginPage = () => {
  const {
    inputDetails,
    setInputDetails,
    inputRef,
    getTokenAPI,
    loading,
    setLoading,
  } = useContext(CommonContext);
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false)

  const handlSubmitOnEnter = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (inputDetails.username === "" || inputDetails.password === "") {
      setError(true);
    } else {
      setLoading(true);
      setError(false);
      getTokenAPI();
    }
  };

  return (
    <section className="bg-light">
      <div className="container">
        <div className="row justify-content-center vh-100 align-items-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
            <div className="card border border-light-subtle rounded-3 shadow-sm">
              <div className="card-body p-3 p-md-4 p-xl-5">
                <div className="text-center mb-3">
                  <img
                    src={require("../Images/cbre_logo.png")}
                    alt="cbre-logo"
                    className="cbre-logo"
                  />
                </div>
                <h2 className="fs-6 fw-normal text-center text-secondary mb-5">
                  Sign in to your CBRE account
                </h2>
                <form>
                  <div className="row gy-2 overflow-hidden">
                    <div className="col-12">
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label"
                        >
                          Username <span className="text-danger">*</span>
                        </label>
                        <input
                          autoFocus
                          ref={inputRef}
                          type="username"
                          className="form-control"
                          id="username"
                          aria-describedby="username"
                          name="username"
                          value={inputDetails.username}
                          onChange={(e) =>
                            setInputDetails({
                              ...inputDetails,
                              [e.target.name]: e.target.value,
                            })
                          }
                        />
                      </div>
                      {error && inputDetails.username === "" ? (
                        <p className="text-danger mb-0 pb-2">
                          Username is required
                        </p>
                      ) : null}
                    </div>
                    <div className="col-12">
                      <div className="mb-3  password-container">
                        <label htmlFor="password" className="form-label">
                          Password <span className="text-danger">*</span>
                        </label>
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control"
                          id="password"
                          name="password"
                          value={inputDetails.password}
                          onChange={(e) =>
                            setInputDetails({
                              ...inputDetails,
                              [e.target.name]: e.target.value,
                            })
                          }
                          onKeyDown={handlSubmitOnEnter}
                        />
                        <span
                          className="eye-icon fs-5"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <PiEyeLight /> : <PiEyeSlash />}
                        </span>
                      </div>
                      {error && inputDetails.password === "" ? (
                        <p className="text-danger mb-0 pb-2">
                          Password is required
                        </p>
                      ) : null}
                    </div>

                    <div className="col-12">
                      <div className="d-grid my-3">
                        {loading ? (
                          <>
                            <button className="btn btn-primary" disabled>
                              <span
                                className="spinner-border spinner-border-sm"
                                aria-hidden="true"
                              ></span>
                              <span className="ms-3" role="status">
                                Loading...
                              </span>
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-primary mx-auto d-block  w-100"
                            onClick={handleSubmit}
                          >
                            Login
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </section>
  );
};

export default LoginPage;
