import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import hljs from "highlight.js";
import php from "highlight.js/lib/languages/php";
hljs.registerLanguage("php", php);

export default class Highlight extends Component {
  componentDidMount() {
    hljs.highlightBlock(findDOMNode(this.refs.code));
  }

  componentDidUpdate() {
    hljs.initHighlighting.called = false;
    hljs.highlightBlock(findDOMNode(this.refs.code));
  }

  render() {
    const { children, className, language, style } = this.props;

    return (
      <pre className={className} style={style}>
        <code className={language} ref="code">
          {children}
        </code>
      </pre>
    );
  }
}
