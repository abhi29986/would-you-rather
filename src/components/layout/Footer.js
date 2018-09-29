import React from "react";

// functional cmponent for Footer of the app
export default () => {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      Copyright &copy; {new Date().getFullYear()} WouldYouRather
    </footer>
  );
};
