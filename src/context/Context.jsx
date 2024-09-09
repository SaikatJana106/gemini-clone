import React, { createContext, useState } from "react";
import run from "../components/config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData((prev) => prev + nextWord);
        }, 75 * index);
    };

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;

        try {
            if (prompt !== undefined) {
                response = await run(prompt);
                setRecentPrompt(prompt);
            } else {
                setPrevPrompts((prev) => [...prev, input]);
                setRecentPrompt(input);
                response = await run(input);
            }

            let newResponse = response.split("**");
            let formattedResponse = newResponse.map((part, i) =>
                i % 2 === 1 ? `<b>${part}</b>` : part
            ).join("");
            let finalResponse = formattedResponse.split("*").join("<br>");
            let responseArray = finalResponse.split(" ");

            setResultData(""); // Clear resultData before starting delay
            responseArray.forEach((word, index) => {
                delayPara(index, word + " ");
            });
        } catch (error) {
            console.error("Error running the command:", error);
            setResultData("An error occurred. Please try again.");
        } finally {
            setLoading(false);
            setInput("");
        }
    };

    const newChat = () => {
        setInput("");
        setRecentPrompt("");
        setShowResult(false);
        setResultData("");
        setPrevPrompts([]);
    };

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
