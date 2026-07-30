import pdfParse from "pdf-parse";

export interface PdfParseResult {
  text: string;
  numpages?: number;
}

export async function extractTextFromPdf(buffer: Buffer): Promise<PdfParseResult> {
  try {
    const data = await pdfParse(buffer);
    return {
      text: data.text || "",
      numpages: data.numpages,
    };
  } catch (error) {
    console.error("PDF Parsing Error:", error);
    throw new Error("Failed to parse PDF file. Please ensure it is a valid, unencrypted PDF document.");
  }
}
