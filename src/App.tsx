import {SetStateAction, useEffect, useRef, useState} from "react";
import reactLogo from "./assets/react.svg";
import {invoke} from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
    const [html, setHtml] = useState("");
    const [markdown, setMarkdown] = useState("");
    const [refreshCheck, setRefreshCheck] = useState(false);

    async function greet() {
        setRefreshCheck(true);
    }

    useEffect(() => {

        const parseMarkdown = async () => {
            setHtml(await invoke("greet", {markdown}));
            setRefreshCheck(false);
            console.log('new markdown');
        }
        console.log('refreshed')
        if (refreshCheck) {
            parseMarkdown()
            console.log('parsing!')
        }
    }, [refreshCheck])

    const createMarkdownMarkup = () => ({
        __html: html
    })

    const handleTextArea = (e: any) => {
        setMarkdown(e.currentTarget.value)
        setRefreshCheck(true);
        console.log('need new markdown!');
    };

    return (
        <div className="page-wrapper">
            <div>
                <h1>Welcome to your Markdown Editor!</h1>

                <div className="row">
                      <textarea
                          id="greet-input"
                          onChange={handleTextArea}
                          className="textarea-input"
                      />
                        <button type="button" onClick={() => greet()}>
                            Convert to HTML
                        </button>
                </div>
                <div dangerouslySetInnerHTML={createMarkdownMarkup()}/>
            </div>
        </div>
    );
}

export default App;
