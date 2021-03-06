import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import MyDropZone from "./DropZone";
import { v4 as uuidv4 } from "uuid";

import "./styles.scss";

import styled from "styled-components";

const Button = styled.button`
  background: green;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  margin: 0;
  border-radius: 5px;
  transition: all 0.2s ease;
  &:focus {
    outline: none;
  }
  &:hover {
    background: rgb(70, 165, 70);
  }
`;
export default function App() {
  const [state, setState] = useState({
    selectedid: 0,
    offers: []
  });

  const handleIndex = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.dataset.selectedid) {
      setState({ ...state, selectedid: e.target.dataset.selectedid });
    }
  };
  const handleChange = (e) => {
    const newOffers = [...state.offers];
    newOffers[
      state.offers.findIndex((it) => it.id === state.selectedid)
    ].fields[e.target.name] = e.target.value;

    setState({
      ...state,
      offers: newOffers
    });
  };

  const addOffer = () => {
    const newid = uuidv4();
    setState({
      ...state,
      selectedid: newid,
      offers: [
        ...state.offers,
        {
          id: newid,
          fields: {
            name: `Offer ${state.offers.length + 1}`,
            description: "",
            src: ""
          }
        }
      ]
    });
  };
  return (
    <div className="App">
      <div className="container">
        <div className="col">
          <h3>Extras Offers</h3>
          <Button onClick={addOffer}>ADD NEW OFFER</Button>
          {state.offers.length > 0 && (
            <>
              <form>
                <label>Edit Details</label>
                <input
                  className="input-field"
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={
                    state.offers[
                      state.offers.findIndex((it) => it.id === state.selectedid)
                    ].fields.name
                  }
                />
                <textarea
                  className="input-field"
                  name="description"
                  onChange={handleChange}
                  value={
                    state.offers[
                      state.offers.findIndex((it) => it.id === state.selectedid)
                    ].fields.description
                  }
                />
                <MyDropZone state={state} setState={setState} />
              </form>
            </>
          )}
          <pre>{/*JSON.stringify(state, null, 2)*/}</pre>
        </div>
        <div className="col">
          <ReactSortable
            list={state.offers}
            setList={(newOffersState) => {
              setState({ ...state, offers: newOffersState });
            }}
            animation={500}
            easing="cubic-bezier(1, 0, 0, 1)"
            direction="vertical"
          >
            {state.offers.map((el, idx) => (
              <div className="item" key={el.id}>
                {
                  /*<div className="handle"></div>*/
                  console.log(state.offers.findIndex((it) => it.id === el.id))
                }
                <h3>{el.fields.name}</h3>
                <pre>
                  <code>{el.fields.description}</code>
                </pre>
                {el.fields.src && <img src={el.fields.src} alt="" />}
                <Button onClick={handleIndex} data-selectedid={el.id}>
                  EDIT
                </Button>
              </div>
            ))}
          </ReactSortable>
        </div>
      </div>
    </div>
  );
}
