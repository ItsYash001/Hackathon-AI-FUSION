export function summarizeEmail(text: string): string[] {
  if (!text.trim()) return [];

  const sentences = text
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(Boolean);

  const actionKeywords = [
    'please', 'kindly', 'required', 'must', 'should', 'need to',
    'deadline', 'submit', 'register', 'attend', 'complete', 'action',
    'urgent', 'important', 'reminder', 'notice', 'announcement'
  ];

  const datePattern = /\b\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b|\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+\d{1,2}\b/i;
  const timePattern = /\b\d{1,2}:\d{2}\s*(?:am|pm)?\b/i;

  const actionItems: string[] = [];

  sentences.forEach(sentence => {
    const lowerSentence = sentence.toLowerCase();
    const hasActionKeyword = actionKeywords.some(keyword => lowerSentence.includes(keyword));
    const hasDate = datePattern.test(sentence);
    const hasTime = timePattern.test(sentence);

    if (hasActionKeyword || hasDate || hasTime) {
      const cleaned = sentence.replace(/\s+/g, ' ').trim();
      if (cleaned.length > 20 && cleaned.length < 200) {
        actionItems.push(cleaned + '.');
      }
    }
  });

  if (actionItems.length === 0 && sentences.length > 0) {
    const firstSentences = sentences.slice(0, 3);
    firstSentences.forEach(s => {
      const cleaned = s.replace(/\s+/g, ' ').trim();
      if (cleaned.length > 20) {
        actionItems.push(cleaned + '.');
      }
    });
  }

  return actionItems.slice(0, 5);
}
