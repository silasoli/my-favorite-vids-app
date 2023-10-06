const API = "https://my-favorite-vids-api.vercel.app";
import { useEffect, useState } from "react";
export const login = async (loginForm) => {
  const bodyForm = JSON.stringify(loginForm);
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: bodyForm,
  };
    const response = await fetch(`${API}/session/login`, config);
    const auth = await response.json();
  if (auth.hasOwnProperty("error")) {
    let authorization = {
      auth: false,
      message: auth.error.message,
    };
    return authorization;
  } else {
    let authorization = true;
    localStorage.setItem("user_id", auth.id);
    localStorage.setItem("token", auth.access_token);
    return authorization;
  }
};
export const getAuth = () => {
  const user = localStorage.getItem("token");

  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (user) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [user]);

  return { auth };
};

export const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
  return true;
};

export const getUser = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    };
    const result = await fetch(`${API}/user`, config);
    const data = await result.json();
    return data;
  }
}

export const updateUser = async (user) => {
  const token = localStorage.getItem("token");

  if (token) {
    const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    };
    let result = await fetch(`${API}/user`, config);
    result = await result.json();
    return result;
  }
};

export const deleteUser = async (user) => {
  const token = localStorage.getItem("token");

  if (token) {
    const config = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    };
    let result = await fetch(`${API}/user`, config);
    if(result.status === 204){
      return true;
    }
    result = await result.json();
    return result;
  };
};

export const createVideo = async (userId) => {
  const token = localStorage.getItem("token");

  if (token) {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userId),
    };
    let result = await fetch(`${API}/videos`, config);
    if(result.ok){
      return true;
    }
    result = await result.json();
    return result;
  };
};


export const getAllVideos = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    };
    const result = await fetch(`${API}/user/videos`, config);
    const data = await result.json();
    return data;
  }
}


export const deleteVideo = async (videoId) => {
  const token = localStorage.getItem("token");

  if (token) {
    const config = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let result = await fetch(`${API}/user/videos/${videoId}`, config);
    if(result.ok){
      return true;
    }
    result = await result.json();
    return result;
  };
};