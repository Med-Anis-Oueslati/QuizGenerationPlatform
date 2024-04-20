import React, { useState, useEffect } from "react";
import "./TypeWriter.css";
function Typewriter({ texts }) {
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const currentPhrase = texts[phraseIndex % texts.length];

  useEffect(() => {
    if (displayText.length === currentPhrase.length) return;

    const intervalId = setInterval(() => {
      const nextCharacter = currentPhrase[displayText.length];
      setDisplayText((prevText) => prevText + nextCharacter);
    }, 100);

    return () => clearInterval(intervalId);
  }, [displayText.length, currentPhrase]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDisplayText("");
      setPhraseIndex((prevIndex) => prevIndex + 1);
    }, 4000);

    return () => clearTimeout(timeoutId);
  }, [phraseIndex]);

  return <h1 className="typetext">{displayText}</h1>;
}

export default Typewriter;
