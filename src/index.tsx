import React, { Children, isValidElement } from "react";
import {
  Document,
  Page,
  PageProps,
  PDFViewer,
  Text,
  View,
} from "@react-pdf/renderer";
import { twj } from "tw-to-css";

function convertRemToPx(styleObj: object): object {
  const result: Record<string, string> = {};
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

// Simple Tailwind-to-style converter
const tailwindToStyle = (rawClassName: string) => {
  const className =
    rawClassName.includes("flex") && !rawClassName.includes("flex-col")
      ? `${rawClassName} flex-row`
      : rawClassName;
  const result = convertRemToPx(twj(className));
  return result;
};

// Map HTML tags to PDF components
const tagMap: Record<string, any> = {
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
  em: Text,
};

export const convertReactNodeToPdf = (
  node: React.ReactNode
): React.ReactNode => {
  if (typeof node === "string" || typeof node === "number") {
    return <Text>{node}</Text>;
  }

  if (!isValidElement(node)) return null;

  const { type, props } = node;
  const tagName = typeof type === "string" ? type : null;
  const PdfComponent = tagName && tagMap[tagName] ? tagMap[tagName] : View;

  const style = props.className ? tailwindToStyle(props.className) : undefined;

  return (
    <PdfComponent style={style}>
      {Children.map(props.children, (child) => convertReactNodeToPdf(child))}
    </PdfComponent>
  );
};

export const convertToPdfPage = (
  reactNode: React.ReactNode,
  pageProps?: PageProps
) => {
  return (
    <Page {...pageProps} size={pageProps?.size ? pageProps.size : "A4"}>
      {convertReactNodeToPdf(reactNode)}
    </Page>
  );
};

export const convertToPdfDocument = (
  reactNode: React.ReactNode,
  pageProps?: PageProps
) => {
  return <Document>{convertToPdfPage(reactNode, pageProps)}</Document>;
};

export const convertToPdfViewer = (
  reactNode: React.ReactNode,
  pageProps?: PageProps
) => {
  return (
    <PDFViewer className="h-[100vh] w-[100vw]">
      {convertToPdfDocument(reactNode, pageProps)}
    </PDFViewer>
  );
};
