import React, { useState } from "react";

function LinkCard( {chosedData, resetData} ) {

  // Define the list of Prospekt links for selected brand
  const [storeList, setStoreList] = useState([]);

  // Render the cards for Prospekt links
  function card( name, shop ) {
    return (
      <div className="card col-3 p-2" onClick={stopPropagation}>
        <div className="card-body">
          <p className="card-text">{ name }</p>
          <p className="card-text">{ shop.address.split(", ")[0] }</p>
          <p className="card-text">{ shop.address.split(", ")[1] }</p>
          <a href={ shop.prospekt } 
             className="btn btn-primary" 
             target="_blank"
             onClick={ resetData }>
            Zum Prospekt
          </a>
        </div>
      </div>
    )
  }

  // Function to prevent event bubbling
  function stopPropagation(event) {
    event.stopPropagation();
  }

  // Filter the Prospekt links list based on the search content
  function filterStore(event) {
    const term = event.target.value;

    // Only filter the list if the search content has more than 3 characters;
    // If less than 3 character, set the list to empty.
    if(term.length >= 3) {
      setStoreList([...chosedData.stores.filter(store => store.address.includes(term))])
    } else {
      setStoreList([]);
    }
  }

  // Display Prospekt links results based on conditions: 
  // empty list, single element list, multiple element list.
  function showResult() {
    if(chosedData.stores.length === 0) {
      return (
        <p>There is no prospekt.</p>
      )
    } else if(chosedData.stores.length === 1) {
      return(
        card(chosedData.name, chosedData.stores[0])
      )
    } else {
      return (
        <div className="row justify-content-center gap-3">
          <div className="input-group input-group-sm m-3 col-6">
            <input 
              type="text" 
              className="form-control" 
              onChange={filterStore} 
              onClick={stopPropagation}
              placeholder="PLZ, Ort oder Straße"
            />
          </div>
          {storeList.slice(0, 9).map( shop => card(chosedData.name, shop) )}  
        </div>
      )
    }
  }

  return (
    <div className="row justify-content-center">
      { showResult() }
    </div>
  )
}

export default LinkCard;
