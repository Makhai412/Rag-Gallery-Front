import React from "react";
import NavbarComponent from "./components/navbar/NavBarComponent";
import AppRoutes from "./routes/AppRoutes";
import UploadInterface from "./components/navbar/UploadInterface";

function App() {
  return (
    <main>
      <NavbarComponent />
      <AppRoutes />
      <UploadInterface/>
    </main>
  );
}

export default App;
