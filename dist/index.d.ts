import React from 'react';
import { PageProps } from '@react-pdf/renderer';

declare const convertReactNodeToPdf: (node: React.ReactNode) => React.ReactNode;
declare const convertToPdfPage: (reactNode: React.ReactNode, pageProps?: PageProps) => React.JSX.Element;
declare const convertToPdfDocument: (reactNode: React.ReactNode, pageProps?: PageProps) => React.JSX.Element;
declare const convertToPdfViewer: (reactNode: React.ReactNode, pageProps?: PageProps) => React.JSX.Element;

export { convertReactNodeToPdf, convertToPdfDocument, convertToPdfPage, convertToPdfViewer };
