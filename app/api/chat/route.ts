import { NextRequest, NextResponse } from 'next/server';
import { model } from '@/lib/gemini';
import { rateLimit } from '@/lib/security';
import { stripHtml } from '@/lib/sanitize';

const SYSTEM_PROMPT = `
நீங்கள் இளந்தூது (Ilanthoodhu) மாணவர் இலக்கிய இதழின் அதிகாரப்பூர்வ AI உதவியாளர். இந்த இதழ் 1987 ஆம் ஆண்டு திரு A.Z. ராதாகிருஷ்ணன் அவர்களால் Sacred Heart College, தமிழ்நாடு, இந்தியாவில் நிறுவப்பட்டது.

## உங்கள் பணி (Your Role)
நீங்கள் மாணவர்கள், வாசகர்கள் மற்றும் பார்வையாளர்களுக்கு இளந்தூது இதழ் பற்றிய அனைத்து தகவல்களிலும் உதவுகிறீர்கள்.

## நிறுவனர் மற்றும் வரலாறு (Founder & History)
- நிறுவப்பட்ட ஆண்டு: 1987
- நிறுவனர்: திரு A.Z. ராதாகிருஷ்ணன்
- தூண்டுதல்: Prof. K. சேங்கையன் கற்பித்த "அறிமுக இதழியல்" வகுப்பு
- ஆரம்ப பெயர்: "அமிர்தராஜகம்" (பின்னர் இளந்தூது என மாற்றப்பட்டது)
- மாதாந்திர வெளியீடு: நவம்பர் 1989 முதல் (30–35 பக்கங்கள், மாணவர் நிதியில் நடத்தப்படுகிறது)

## தற்போதைய நிலை (Current Status)
- தற்போதைய பதிப்பு: 38ஆவது (2026–2027)
- வழிகாட்டி (Co-ordinator): திரு T. Sebasthi John Baskar
- ஆசிரியர் (Editor): M. கார்த்தி
- மின்னஞ்சல்: illanthoodhu32@gmail.com

## நூலக ஆவணம் (Digital Library Archive)
கிடைக்கும் டிஜிட்டல் பதிப்புகள்: 1999, 2001-2010, 2018, 2023, 2024, 2025, 2026.

## கட்டுரை சமர்பிப்பு (How to Submit an Article)
மாணவர்கள் கட்டுரைகள், கவிதைகள், சிறுகதைகள் அல்லது கட்டுரைகளை illanthoodhu32@gmail.com க்கு அனுப்பலாம்.

## புத்தக ஆர்டர் (How to Order a Book)
illanthoodhu32@gmail.com க்கு "Book Order Inquiry" என்ற தலைப்பில் மின்னஞ்சல் அனுப்பவும். தேவையான புத்தகம், முழு பெயர், முகவரி, எண் குறிப்பிடவும்.

## நோட்டீஸ் பலகை (Notice Board — Current Notices)
- 38ஆவது பதிப்பு கட்டுரை சமர்பிக்கும் கடைசி நாள்: மார்ச் 30, 2027
- ஆண்டு இலக்கிய விழா பதிவு: ஏப்ரல் 5, 2027 வரை
- ஆசிரியர் குழு மாதாந்திர கூட்டம்: மார்ச் 28, மாலை 3:00 மணி, தமிழ் துறை

## பதில் அளிக்கும் நடைமுறை (Response Guidelines)
- பயனர் தமிழில் கேட்டால் → முழுவதும் தமிழில் பதில் அளிக்கவும்
- பயனர் ஆங்கிலத்தில் கேட்டால் → ஆங்கிலத்தில் பதில் அளிக்கவும்
- கலப்பு மொழியில் கேட்டால் → தமிழை முதன்மையாக வைத்து பதில் அளிக்கவும்
- சுருக்கமாக, தெளிவாக, அன்போடு பதில் அளிக்கவும் (2–5 வரிகள் போதுமானது)
- இளந்தூதின் 38 ஆண்டு பாரம்பரியத்தில் பெருமை கொண்டு பேசவும்
- தெரியாத கேள்விகளுக்கு illanthoodhu32@gmail.com க்கு திருப்பி விடவும்

## வலைத்தள உருவாக்குநர்கள் (Website Developers)
இந்த வலைத்தளம் கீழ்க்கண்ட மாணவர்களால் உருவாக்கப்பட்டது:
- Pugazhenthi J — B.Sc Computer Science — pugazhenthij283@gmail.com
- Nithyadharshini K — Department of Computer Science — nithya4648@gmail.com
`;

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting (Max 20 messages per minute per IP to prevent Gemini API abuse)
    const rateLimitResult = rateLimit(req, 'chat-api', 20, 60 * 1000);
    if (!rateLimitResult.success) {
      return NextResponse.json({ error: 'Chat rate limit exceeded. Please wait a moment.' }, { status: 429 });
    }

    const { messages } = await req.json();

    // 2. Input Sanitization (Clean HTML/XSS from all user messages)
    const sanitizedMessages = messages.map((msg: any) => ({
      ...msg,
      content: msg.role === 'user' ? stripHtml(msg.content) : msg.content
    }));

    // Format history incorporating system prompt correctly for chat.
    const history = [
      { role: 'user', parts: [{ text: `SYSTEM CONTEXT: ${SYSTEM_PROMPT}\n\nPlease acknowledge your role.` }] },
      { role: 'model', parts: [{ text: "புரிகிறது. இளந்தூது இலக்கிய இதழ் AI உதவியாளராக நான் தயாராக உள்ளேன். நான் உங்களுக்கு எப்படி உதவ முடியும்?" }] },
      ...sanitizedMessages.slice(0, -1)
        .filter((msg: any, idx: number) => {
          if (idx === 0 && msg.role === 'assistant') return false;
          return true;
        })
        .map((msg: any) => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        }))
    ];

    const latestMessage = sanitizedMessages[sanitizedMessages.length - 1].content;

    // Use the model we defined in lib/gemini.ts
    const chat = model.startChat({ history });
    const result = await chat.sendMessage(latestMessage);
    const text = await result.response.text();

    return NextResponse.json({ message: text });
  } catch (error: any) {
    console.error('--- Gemini API Diagnostic Error ---');
    console.error('Error Name:', error?.name);
    console.error('Error Message:', error?.message);
    console.error('Status Code:', error?.status || error?.response?.status);
    console.error('Stack Trace:', error?.stack);
    console.error('------------------------------------');
    
    // Return a descriptive error to the UI for better debugging
    let specificError = "AI மாடல் பிழை: ";
    if (error?.message?.includes('429')) specificError += "கோட்டா முடிந்துவிட்டது (Quota Exceeded).";
    else if (error?.message?.includes('fetch')) specificError += "இணையதள இணைப்பு பிழை (Network/Fetch failure).";
    else specificError += (error?.message || "Unknown error");

    return NextResponse.json(
      { error: specificError },
      { status: 500 }
    );
  }
}
