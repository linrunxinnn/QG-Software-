import { Outlet } from "react-router-dom";

export default function Personal() {
  return (
    <div>
      <h1>Personal Page</h1>
      {/* Additional content can be added here */}
      <Outlet />
    </div>
  );
}
