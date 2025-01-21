'use client';

import { Document, Page, Text, View, StyleSheet, usePDF } from '@react-pdf/renderer';
import { Publication } from '@/data/publications';
import { convert, HtmlToTextOptions } from 'html-to-text';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect } from 'react';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 40,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  metadata: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  content: {
    fontSize: 12,
    lineHeight: 1.5,
    textAlign: 'justify',
  },
  section: {
    margin: 10,
    padding: 10,
  },
});

const htmlToTextOptions: HtmlToTextOptions = {
  wordwrap: 130,
  selectors: [
    { selector: 'img', format: 'skip' },
    { selector: 'a', options: { ignoreHref: true } },
  ],
};

interface ArticlePDFProps {
  article: Publication;
  children?: React.ReactNode;
}

const ArticlePDFDocument: React.FC<ArticlePDFProps> = ({ article }) => {
  const plainTextContent = convert(article.content, htmlToTextOptions);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>{article.title}</Text>
          <Text style={styles.metadata}>
            Author: {article.author}
          </Text>
          <Text style={styles.metadata}>
            Date: {new Date(article.date).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.content}>
          <Text>{plainTextContent}</Text>
        </View>
      </Page>
    </Document>
  );
};

const ArticlePDF: React.FC<ArticlePDFProps> = ({ article, children }) => {
  const [instance, updateInstance] = usePDF({ document: <ArticlePDFDocument article={article} /> });

  // Handle SSR
  useEffect(() => {
    if (typeof window !== 'undefined') {
      updateInstance();
    }
  }, [article, updateInstance]);

  // Initial SSR state
  if (typeof window === 'undefined') {
    return (
      <button disabled className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-400">
        <FontAwesomeIcon icon={faDownload} />
        <span>Loading PDF...</span>
      </button>
    );
  }

  if (instance.loading) {
    return (
      <button disabled className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-400 cursor-wait">
        <FontAwesomeIcon icon={faDownload} className="animate-pulse" />
        <span>Preparing PDF...</span>
      </button>
    );
  }

  if (instance.error) {
    console.error('PDF generation error:', instance.error);
    return (
      <button disabled className="inline-flex items-center gap-2 px-4 py-2 text-sm text-red-600">
        <FontAwesomeIcon icon={faDownload} />
        <span>Error generating PDF</span>
      </button>
    );
  }

  if (!instance.url) {
    return null;
  }

  return children || (
    <a
      href={instance.url}
      download={`${article.title.toLowerCase().replace(/\s+/g, '-')}.pdf`}
      className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-blue-600 transition-colors"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon icon={faDownload} />
      <span>Download PDF</span>
    </a>
  );
};

export default ArticlePDF;
