import { styled } from "@mui/material/styles";
import React, { ReactNode, SyntheticEvent, useState } from "react";
import { IconButton } from "@mui/material";
import { Link } from "@mui/icons-material";
import ReactMarkdown from "react-markdown";
import styles from "./MarkdownRenderer.module.css";

type MarkdownRendererProps = {
  text: string;
};

const InlineCodeDiv = styled("span")({
  background: "#39424E",
  color: "#F2FFFF",
  fontFamily: "consolas",
  borderRadius: "3px",
  padding: "2px 5px",
});
const CodeDiv = styled("div")({
  background: "#39424E",
  color: "#F2FFFF",
  fontFamily: "consolas",
  padding: "20px",
  borderRadius: "8px",
  wordBreak: "keep-all",
});
const CodeBlock = (children: { children: ReactNode; inline?: Boolean }) => {
  return children.inline ? <InlineCodeDiv>{children.children}</InlineCodeDiv> : <CodeDiv>{children.children}</CodeDiv>;
};

const Blockquote = (children: { children: ReactNode }) => {
  return <div className={styles.blockquote_div}>{children.children}</div>;
};

const ATag = (children: { children: ReactNode; href?: string }) => {
  return (
    <>
      <Link />
      <a href={children.href} className={styles.a_tag}>
        {children.children}
      </a>
    </>
  );
};

const H1Block = (children: { children: ReactNode }) => {
  return (
    <>
      <br />
      <h1>{children.children}</h1>
      <hr />
    </>
  );
};

const H3Block = (children: { children: ReactNode }) => {
  return (
    <>
      <br />
      <br />
      <h3>{children.children}</h3>
    </>
  );
};
function MarkdownRenderer({ text }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      components={{
        h1: H1Block,
        h3: H3Block,
        code: CodeBlock,
        blockquote: Blockquote,
        a: ATag,
      }}
    >
      {text}
    </ReactMarkdown>
  );
}

export default MarkdownRenderer;
