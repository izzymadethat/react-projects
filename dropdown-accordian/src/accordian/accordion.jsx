// Returns two types of UI accordions:
// Single selection - one closes the other
// When user selects all tabs open

import { useState } from "react";
import { faqs } from ".";
import "./styles.css";

export default function Accordion() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(currentId) {
    setSelected(currentId === selected ? null : currentId);
  }

  function handleMultiSelection(id) {
    let multiCopy = [...multiple];

    const findCurrentIndexId = multiCopy.indexOf(id);

    if (findCurrentIndexId === -1) multiCopy.push(id);
    else multiCopy.splice(findCurrentIndexId, 1);

    setMultiple(multiCopy);
  }

  return (
    <div className="wrapper">
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        Enable multiple selection
      </button>
      <div className="accordion">
        {faqs && faqs.length > 0 ? (
          faqs.map((faq) => (
            <div key={faq.id} className="item">
              <div
                className="title"
                onClick={
                  enableMultiSelection
                    ? () => handleMultiSelection(faq.id)
                    : () => handleSingleSelection(faq.id)
                }
              >
                <h3>{faq.question}</h3>
                <span>+</span>
              </div>
              {enableMultiSelection
                ? multiple.indexOf(faq.id) !== -1 && (
                    <div className="content">{faq.answer}</div>
                  )
                : selected === faq.id && (
                    <div className="content">{faq.answer}</div>
                  )}
            </div>
          ))
        ) : (
          <div>No data found.</div>
        )}
      </div>
    </div>
  );
}
