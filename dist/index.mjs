// src/index.tsx
import React, { Children, isValidElement } from "react";
import {
  Document,
  Page,
  PDFViewer,
  Text,
  View
} from "@react-pdf/renderer";
import { twj } from "tw-to-css";
function convertRemToPx(styleObj) {
  const result = {};
  const remSize = 16;
  const remRegex = /([\d.]+)rem/g;
  for (const [key, value] of Object.entries(styleObj)) {
    if (typeof value === "string") {
      const converted = value.replace(remRegex, (_, remValue) => {
        const pxValue = parseFloat(remValue) * remSize;
        return `${pxValue}px`;
      });
      result[key] = converted;
    } else {
      result[key] = value;
    }
  }
  return result;
}
var tailwindToStyle = (rawClassName) => {
  const className = rawClassName.includes("flex") && !rawClassName.includes("flex-col") ? `${rawClassName} flex-row` : rawClassName;
  const result = convertRemToPx(twj(className));
  return result;
};
var tagMap = {
  div: View,
  span: Text,
  h1: Text,
  h2: Text,
  h3: Text,
  h4: Text,
  h5: Text,
  h6: Text,
  p: Text,
  strong: Text,
  em: Text
};
var convertReactNodeToPdf = (node) => {
  if (typeof node === "string" || typeof node === "number") {
    return /* @__PURE__ */ React.createElement(Text, null, node);
  }
  if (!isValidElement(node)) return null;
  const { type, props } = node;
  const tagName = typeof type === "string" ? type : null;
  const PdfComponent = tagName && tagMap[tagName] ? tagMap[tagName] : View;
  const style = props.className ? tailwindToStyle(props.className) : void 0;
  return /* @__PURE__ */ React.createElement(PdfComponent, { style }, Children.map(props.children, (child) => convertReactNodeToPdf(child)));
};
var convertToPdfPage = (reactNode, pageProps) => {
  return /* @__PURE__ */ React.createElement(Page, { ...pageProps, size: (pageProps == null ? void 0 : pageProps.size) ? pageProps.size : "A4" }, convertReactNodeToPdf(reactNode));
};
var convertToPdfDocument = (reactNode, pageProps) => {
  return /* @__PURE__ */ React.createElement(Document, null, convertToPdfPage(reactNode, pageProps));
};
var convertToPdfViewer = (reactNode, pageProps) => {
  return /* @__PURE__ */ React.createElement(PDFViewer, { className: "h-[100vh] w-[100vw]" }, convertToPdfDocument(reactNode, pageProps));
};
export {
  convertReactNodeToPdf,
  convertToPdfDocument,
  convertToPdfPage,
  convertToPdfViewer
};
