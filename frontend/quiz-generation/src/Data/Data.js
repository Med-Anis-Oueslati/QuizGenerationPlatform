export const SideBarMenu = [
  {
    name: "Students",
    path: "/teacherapp/students",
    icon: "fa-solid fa-user",
  },
  {
    name: "Import learning material",
    path: "/teacherapp/ImportLearningMaterial",
    icon: "fas fa-file",
  },
  {
    name: "Join Meet",
    path: "/teacherapp/meet",
    icon: "fas fa-file",
  },
  {
    name: "Logout",
    path: "/teacherapp/logout",
    icon: "fa-solid fa-right-from-bracket",
    onClick: () => {
      // delete the token cookie
      document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      // redirect to /doctorauth
      window.location.href = "/logincard";
    },
  },
];

//admin menu

