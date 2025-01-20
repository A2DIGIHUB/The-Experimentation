import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Font } from '@react-pdf/renderer';
import { Publication } from '@/data/publications';
import { convert } from 'html-to-text';

Font.register({
  family: 'Inter',
  src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2',
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 40,
    fontFamily: 'Inter',
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  meta: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  content: {
    fontSize: 12,
    lineHeight: 1.6,
  },
  section: {
    marginBottom: 20,
  },
});

const ArticlePDF = ({ article }: { article: Publication }) => {
  const plainContent = convert(article.content, {
    wordwrap: 130,
    preserveNewlines: true,
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>{article.title}</Text>
          <Text style={styles.meta}>By {article.author}</Text>
          <Text style={styles.meta}>
            {new Date(article.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.content}>{article.excerpt}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.content}>{plainContent}</Text>
        </View>
      </Page>
    </Document>
  );
};

export const ArticlePDFLink = ({ article }: { article: Publication }) => (
  <PDFDownloadLink
    document={<ArticlePDF article={article} />}
    fileName={`${article.title.toLowerCase().replace(/\s+/g, '-')}.pdf`}
    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
  >
    {({ loading }) => (loading ? 'Preparing PDF...' : 'Download PDF')}
  </PDFDownloadLink>
);

export default ArticlePDF;
