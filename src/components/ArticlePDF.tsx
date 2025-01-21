import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { Publication } from '@/data/publications';
import { convert, HtmlToTextOptions } from 'html-to-text';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

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
          <Text style={styles.metadata}>Category: {article.category}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.content}>{article.excerpt}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.content}>{plainTextContent}</Text>
        </View>
      </Page>
    </Document>
  );
};

const ArticlePDF: React.FC<ArticlePDFProps> = ({ article }) => {
  return (
    <PDFDownloadLink 
      document={<ArticlePDFDocument article={article} />}
      fileName={`${article.title.toLowerCase().replace(/\s+/g, '-')}.pdf`}
      className="article-action-button flex items-center gap-2"
    >
      <FontAwesomeIcon icon={faDownload} />
      Download PDF
    </PDFDownloadLink>
  );
};

export default ArticlePDF;
