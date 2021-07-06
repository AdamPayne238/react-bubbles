import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList  = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  useEffect(() => {
    const colorToEdit = colors.find(color => {
      
    })
    console.log("ColorEdit", colorToEdit)
    if(colorToEdit){
      updateColors(colorToEdit)
    }
  })


  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
    .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(response => {
      console.log("Put List Response", response)
      //if color.id is equal to response.data.id return new response.data. if not leave the same
      updateColors(colors.map(color => {
        if(color.id === response.data.id){
          return response.data
        } else {
          return color
        }
      }))
    })
    .catch(error => {
      console.log("", error)
    })
    
    
  };

  const deleteColor = color => {
   
      axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`) 
      .then(response => {
        console.log("Delete Response", response)
        updateColors(colors.filter(color => {
          //if color id does not match response.data return response.data
          if( color.id !== response.data){
            return response.data
          }
        }))
      })
      .catch(error => {
        console.log(error.response)
      })
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
