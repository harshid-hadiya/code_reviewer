import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import "./App.css";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1;
}`);
  const [review, setReview] = useState("");
  const [displayedReview, setDisplayedReview] = useState("");
  const [loader, setLoader] = useState(false);
  let interval;
  useEffect(() => {
    prism.highlightAll();
  }, []);

  useEffect(() => {
    if (!review) return;

    setDisplayedReview(""); // reset
    let currentChar = 0;

     interval = setInterval(() => {
      if (currentChar < review.length) {
        setDisplayedReview((prev) => prev + review[currentChar]);
        currentChar++;
        console.log("working");
        
      } else {
        clearInterval(interval);
        setLoader(false);
      }
    }, 10); // Typing speed per character

    return () => clearInterval(interval);
  }, [review]);

  async function reviewCode() {
    if (loader) {
     setLoader(false);
      setReview("");
      
      clearInterval(interval);
      return;
      
    }
    setLoader(true);
    try {
      const response = await axios.post("http://localhost:3000/ai/get-review", {
        code,
      });
      setDisplayedReview("");
      setReview(response.data);
    } catch (error) {
      console.error("Error fetching review:", error);
    }
    
  }


  function extractText(children) {
    if (typeof children === "string") return children;
    if (Array.isArray(children)) return children.map(extractText).join("");
    if (typeof children === "object" && children !== null && "props" in children) {
      return extractText(children.props.children);
    }
    return "";
  }
  
  // Custom code block renderer with copy button
  const components = {
    code({ inline, className, children, ...props }) {
      const [copied, setCopied] = useState(false);
  
      // Use extractText function to get text safely
      const codeText = extractText(children).trim();
  
      const handleCopy = () => {
        navigator.clipboard.writeText(codeText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      };
  
      return !inline ? (
        <div
          style={{
            position: "relative",
            background: "#0d1117",
            borderRadius: "6px",
            margin: "10px 0",
          }}
        >
          <button
            onClick={handleCopy}
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              background: copied ? "#2ea043" : "#21262d",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              padding: "4px 8px",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            {copied ? "Copied" : "Copy"}
          </button>
          <pre
            style={{
              overflowX: "auto",
              margin: 0,
              padding: "16px",
              background: "#0d1117",
              color: "#c9d1d9",
              fontSize: "14px",
            }}
          >
            <code className={className} {...props}>
              {codeText}
            </code>
          </pre>
        </div>
      ) : (
        <code className={className} {...props}>
          {codeText}
        </code>
      );
    },
  };
  
  

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                minheight: "100%",
                width: "100%",
                overflow: "auto",
              }}
            />
          </div>
          <div onClick={reviewCode} className="review">
            {!loader ? "Review" : <div className="loader"></div>}
          </div>
        </div>
        <div className="right">
          <ReactMarkdown rehypePlugins={[rehypeHighlight]} components={components}>
            {displayedReview}
          </ReactMarkdown>
        </div>
      </main>
    </>
  );
}

export default App;
