import React, { useState } from "react";
import Data from "./Data";
import LinkCard from "./LinkCard";
import "bootstrap/dist/css/bootstrap.css";
import { nanoid } from "nanoid";

let chosedData = {};

function App() {

  // Define the toggle for the main page
  const [showBrand, setShowBrand] = useState(true);

  // Function to select a brand
  function choseBrand(index, event) {
    event.stopPropagation(); // Prevent event bubbling
    chosedData = Data[index]; // Assign brand data
    setShowBrand(false); // Set the toggle for the main page to false
  }

  // Reset data
  function resetData() {
    chosedData = {};
    setShowBrand(true);
  }

  // Generate the main page - brand page
  function initial() {
    return (
      <div className="row justify-content-center gap-3">
        {
          Data.map( (shop, index) => {
            return (
              <div
                className="col-2 col-lg-1 align-self-center p-2"
                onClick={ (event) => choseBrand(index, event) }
              >
                <img key={nanoid()} src={shop.img} alt={shop.name} className="img-fluid" />
              </div>
            )
          } )
        }
      </div>
    )
  }

  return (
    <main className="container position-absolute top-50 start-50 translate-middle bg-light bg-gradient text-center border rounded"
          onClick={ () => resetData() }
    >
      { showBrand ? initial() : <LinkCard chosedData={chosedData} resetData={resetData} /> }
    </main>
  );
}

export default App;
