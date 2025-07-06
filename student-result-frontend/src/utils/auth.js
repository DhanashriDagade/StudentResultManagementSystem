
export const handleLogout = (navigate) => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("firstname")
  localStorage.removeItem("lastname")
  navigate("/");
};
