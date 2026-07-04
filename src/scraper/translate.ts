import translate from 'google-translate-api-x';

export async function translateToTurkish(text: string): Promise<string> {
  if (!text) return '';
  try {
    const res = await translate(text, { to: 'tr' });
    return res.text;
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Return original if failed
  }
}
