import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import menu from "../data/menu.json";
import { MenuItem } from "../types/menu";

function Menu() {
  return (
    <div className=" ">
      {menu.data.map((menu: MenuItem) => (
        <div key={menu.url} className="m-2 p-2">
          <Link to={menu.url} className="text-med font-bold">
            {menu.title}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Menu;
