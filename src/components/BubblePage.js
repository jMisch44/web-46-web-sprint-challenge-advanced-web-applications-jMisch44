import React, { useEffect, useState } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import fetchColorService from '../services/fetchColorService';
import axiosWithAuth from "../helpers/axiosWithAuth";

const BubblePage = () => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchColorService()
      .then((res) => {
        setColors(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const toggleEdit = (value) => {
    setEditing(value);
  };

  const saveEdit = (editColor) => {
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${editColor.id}`, editColor)
      .then((res) => {
        // setColors(
        //   colors.filter((color) => {
        //     if (color.id !== res.data.id) {
        //       return color;
        //     } else {
        //       return res.data;
        //     }
        //   })
        // );
        const editedColor = colors.findIndex(
          (color) => color.id === res.data.id
        );
        colors[editedColor] = res.data;
        setColors([...colors]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteColor = (colorToDelete) => {
    const { id } = colorToDelete;
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${id}`)
      .then((res) => {
        setColors(colors.filter((color) => color.id !== parseInt(res.data)));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <ColorList
        colors={colors}
        editing={editing}
        toggleEdit={toggleEdit}
        saveEdit={saveEdit}
        deleteColor={deleteColor}
      />
      <Bubbles colors={colors} />
    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
//2. Complete toggleEdit, saveEdit, deleteColor and functions
