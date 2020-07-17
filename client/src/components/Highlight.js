import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/index";
import { gruvboxDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

function Highlight(props) {
  const { children, language, line } = props;

  const startLine = line > 0 ? line - 20 : 0;

  const lineStyle = (lineNumber) => {
    return (
      startLine + lineNumber === line && {
        style: {
          backgroundColor: "#795548",
          paddingTop: "4px",
          paddingRight: "4px",
          paddingBottom: "4px",
        },
      }
    );
  };

  return (
    <SyntaxHighlighter
      language={language}
      style={gruvboxDark}
      showLineNumbers={language === "php"}
      wrapLines={true}
      startingLineNumber={startLine}
      lineProps={lineStyle}
    >
      {children}
    </SyntaxHighlighter>
  );
}

export default Highlight;
