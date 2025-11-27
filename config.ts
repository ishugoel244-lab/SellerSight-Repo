import { openai } from "@ai-sdk/openai";
// If you actually use Fireworks elsewhere, you can re-enable this:
// import { fireworks } from "@ai-sdk/fireworks";
// import { wrapLanguageModel, extractReasoningMiddleware } from "ai";

export const MODEL = openai("gpt-4.1");

// ---------------------------------------------------------------------------
// Date & Time Helper
// ---------------------------------------------------------------------------
function getDateAndTime(): string {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });

  return `The day today is ${dateStr} and the time right now is ${timeStr}.`;
}

export const DATE_AND_TIME = getDateAndTime();

// ---------------------------------------------------------------------------
// Branding
// ---------------------------------------------------------------------------
export const AI_NAME = "SellerSight";
export const OWNER_NAME = "Manushi and Ishita (BITSoM MBA Co'26)";

export const WELCOME_MESSAGE = `
Welcome to SellerSight ⚡
An AI intelligence system built for Amazon and e-commerce sellers. I analyze real customer feedback, uncover performance drivers, and forecast the cost of inaction by evaluating sentiment trends, competitive gaps, issue severity, and trajectory shifts to surface decisive opportunities for growth.
`;

export const CLEAR_CHAT_TEXT = "New Analysis";

// ---------------------------------------------------------------------------
// Moderation Messages — ONE SET ONLY (no duplicates)
// ---------------------------------------------------------------------------

export const MODERATION_DENIAL_MESSAGE_ILLEGAL = `
I analyze Amazon product reviews, listings, and business questions only. I can’t help with illegal, unethical, or policy-violating requests (for example, fake reviews or terms-of-service evasion).
`;

export const MODERATION_DENIAL_MESSAGE_SEXUAL = `
I can't discuss explicit sexual content.
`;

export const MODERATION_DENIAL_MESSAGE_SEXUAL_MINORS = `
I can't discuss any content involving minors in a sexual context.
`;

export const MODERATION_DENIAL_MESSAGE_HARASSMENT = `
I'm here to help with product and business insights, not harassment. I can’t respond to abusive or harassing language. Let's keep this focused on your brand and growth.
`;

export const MODERATION_DENIAL_MESSAGE_HARASSMENT_THREATENING = `
I can’t engage with threatening or harassing content.
`;

export const MODERATION_DENIAL_MESSAGE_HATE = `
I can’t participate in hateful or discriminatory content. I’m designed to support all users respectfully, regardless of background.
`;

export const MODERATION_DENIAL_MESSAGE_HATE_THREATENING = `
I can't engage with threatening hate speech.
`;

export const MODERATION_DENIAL_MESSAGE_ILLICIT = `
I can't discuss illegal activities.
`;

export const MODERATION_DENIAL_MESSAGE_ILLICIT_VIOLENT = `
I can't discuss violent illegal activities.
`;

export const MODERATION_DENIAL_MESSAGE_SELF_HARM = `
I'm really sorry you're feeling this way, but I can't help with self-harm instructions. You deserve real support from a person right now.

If you are in immediate danger, please contact local emergency services.
If possible, reach out to a trusted friend, family member, or mental health professional.
`;

export const MODERATION_DENIAL_MESSAGE_SELF_HARM_INTENT = `
I can't discuss self-harm intentions.
`;

export const MODERATION_DENIAL_MESSAGE_SELF_HARM_INSTRUCTIONS = `
I can't provide instructions related to self-harm.
`;

export const MODERATION_DENIAL_MESSAGE_VIOLENCE = `
I can’t assist with violent content. If you’re feeling unsafe, please contact local emergency services or a trusted person.
`;

export const MODERATION_DENIAL_MESSAGE_VIOLENCE_GRAPHIC = `
I can't discuss graphic violent content.
`;

export const MODERATION_DENIAL_MESSAGE_DEFAULT = `
Your message violates safety guidelines, so I can’t assist with that.
`;

// ---------------------------------------------------------------------------
// Pinecone Settings
// ---------------------------------------------------------------------------
export const PINECONE_TOP_K = 8;
export const PINECONE_INDEX_NAME = "sellersight-reviews"; // MUST MATCH THE ACTUAL INDEX NAME IN PINECONE
