import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { Publication } from '@/data/publications';
import { convert, HtmlToTextOptions } from 'html-to-text';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

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
          <Text style={styles.metadata}>Author: {article.author}</Text>
          <Text style={styles.metadata}>Date: {new Date(article.date).toLocaleDateString()}</Text>
        </View>
        <View style={styles.content}>
          <Text>{plainTextContent}</Text>
        </View>
      </Page>
    </Document>
  );
};

const ArticlePDF: React.FC<ArticlePDFProps> = ({ article, children }) => {
  return (
    <PDFDownloadLink
      document={<ArticlePDFDocument article={article} />}
      fileName={`${article.title.toLowerCase().replace(/\s+/g, '-')}.pdf`}
    >
      {({ blob, url, loading, error }) => 
        loading ? (
          <button disabled className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-400 cursor-wait">
            <FontAwesomeIcon icon={faDownload} className="animate-pulse" />
            <span>Preparing PDF...</span>
          </button>
        ) : error ? (
          <button disabled className="inline-flex items-center gap-2 px-4 py-2 text-sm text-red-600">
            <FontAwesomeIcon icon={faDownload} />
            <span>Error generating PDF</span>
          </button>
        ) : children || (
          <button className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-blue-600 transition-colors">
            <FontAwesomeIcon icon={faDownload} />
            <span>Download PDF</span>
          </button>
        )
      }
    </PDFDownloadLink>
  );
};

export default ArticlePDF;
