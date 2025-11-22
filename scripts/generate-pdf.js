import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  console.log('Starting PDF generation...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  // Path to the HTML file
  const htmlPath = path.join(__dirname, '../public/resume_template.html');
  const fileUrl = `file://${htmlPath}`;

  console.log(`Loading HTML from: ${fileUrl}`);
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });

  // Generate PDF
  const pdfPath = path.join(__dirname, '../public/Ethan_C_Resume.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0mm',
      right: '0mm',
      bottom: '0mm',
      left: '0mm',
    },
  });

  await browser.close();
  console.log(`PDF generated successfully at: ${pdfPath}`);
})();
