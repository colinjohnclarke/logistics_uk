import React from "react";
import menu from "../data/menu.json";
import { MenuItem } from "../types/menu";

function Menu() {
  return (
    <div className="shadow rounded ">
      {menu.data.map((menu: MenuItem) => {
        return (
          <div className="m-2 p-2 ">
            <a className="text-med font-bold" href={menu.url}>
              {menu.title}
            </a>
          </div>
        );
      })}
    </div>
  );
}

export default Menu;
