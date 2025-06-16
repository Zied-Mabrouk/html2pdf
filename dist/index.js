"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var index_exports = {};
__export(index_exports, {
  convertReactNodeToPdf: () => convertReactNodeToPdf,
  convertToPdfDocument: () => convertToPdfDocument,
  convertToPdfPage: () => convertToPdfPage,
  convertToPdfViewer: () => convertToPdfViewer
});
module.exports = __toCommonJS(index_exports);
var import_react = __toESM(require("react"));
var import_renderer = require("@react-pdf/renderer");
var import_tw_to_css = require("tw-to-css");
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
  const result = convertRemToPx((0, import_tw_to_css.twj)(className));
  return result;
};
var tagMap = {
  div: import_renderer.View,
  span: import_renderer.Text,
  h1: import_renderer.Text,
  h2: import_renderer.Text,
  h3: import_renderer.Text,
  h4: import_renderer.Text,
  h5: import_renderer.Text,
  h6: import_renderer.Text,
  p: import_renderer.Text,
  strong: import_renderer.Text,
  em: import_renderer.Text
};
var convertReactNodeToPdf = (node) => {
  if (typeof node === "string" || typeof node === "number") {
    return /* @__PURE__ */ import_react.default.createElement(import_renderer.Text, null, node);
  }
  if (!(0, import_react.isValidElement)(node)) return null;
  const { type, props } = node;
  const tagName = typeof type === "string" ? type : null;
  const PdfComponent = tagName && tagMap[tagName] ? tagMap[tagName] : import_renderer.View;
  const style = props.className ? tailwindToStyle(props.className) : void 0;
  return /* @__PURE__ */ import_react.default.createElement(PdfComponent, { style }, import_react.Children.map(props.children, (child) => convertReactNodeToPdf(child)));
};
var convertToPdfPage = (reactNode, pageProps) => {
  return /* @__PURE__ */ import_react.default.createElement(import_renderer.Page, { ...pageProps, size: (pageProps == null ? void 0 : pageProps.size) ? pageProps.size : "A4" }, convertReactNodeToPdf(reactNode));
};
var convertToPdfDocument = (reactNode, pageProps) => {
  return /* @__PURE__ */ import_react.default.createElement(import_renderer.Document, null, convertToPdfPage(reactNode, pageProps));
};
var convertToPdfViewer = (reactNode, pageProps) => {
  return /* @__PURE__ */ import_react.default.createElement(import_renderer.PDFViewer, { className: "h-[100vh] w-[100vw]" }, convertToPdfDocument(reactNode, pageProps));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  convertReactNodeToPdf,
  convertToPdfDocument,
  convertToPdfPage,
  convertToPdfViewer
});
