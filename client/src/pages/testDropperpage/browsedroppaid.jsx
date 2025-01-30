import MultipleDropCards from "../../components/multiple-drop-cards";
// paid.jsx
import React from 'react';

export default function TogglePaid({typePaid}){
    return(
        <div className="togglefeature">
            {typePaid && (
                <div className="toggleCategory">
                    <span>{typePaid === "paid" ? "Paid" : "Free"} </span>
                </div>
            )}
        </div>
    );
};