
const { cmd, commands } = require('../command');

cmd({
  pattern: "msgall",
  desc: "Group එකේ සියලුම සාමාජිකයින්ට Inbox වලට එකම පණිවිඩය යවයි.",
  category: "සමූහ",
  react: "📩",
  use: ".tagall [message]",
  filename: __filename
}, async (conn, mek, m, { from, q, isGroup, groupMetadata, participants, isOwner, isAdmins, groupAdmins, reply }) => {
  try {
    if (!isGroup) {
      return reply("*`මෙම විධානය Group වලදී පමණක් භාවිතා කළ හැක`*");
    }
    if (!isOwner && !isAdmins) {
      return reply("*`මෙම විධානය Bot හිමිකරුට හෝ Admin ලාට පමණයි`*");
    }
    if (!participants || participants.length === 0) {
      return reply("*`මෙම Group එකේ සාමාජිකයින් නැත`*");
    }

    // Custom Message එකක් ලබාදුන්නේ නැත්නම් Default Message එකක්
    const customMessage = q ? q : "Group එකේ සියලුම දෙනාට ආයුබෝවන්! 👋";

    // Group එකේ සියලුම සාමාජිකයින්ට Inbox වලට Message යැවීම
    let sentCount = 0;
    const totalMembers = participants.length;

    for (let participant of participants) {
      const targetJid = participant.id;
      const isAdmin = groupAdmins.includes(targetJid);
      const inboxMessage = `
*📩 Group Message: ${groupMetadata.subject}*

*Message:* _${customMessage}_


> *ᴘᴏᴡᴇʀᴅ ʙʏ  ᴋᴀᴠɪᴅᴜ ʀᴀꜱᴀɴɢᴀ : )*
`;

      try {
        await conn.sendMessage(targetJid, { text: inboxMessage }, { quoted: mek });
        sentCount++;
      } catch (e) {
        console.error(`Inbox යැවීමේ දෝෂය ${targetJid}:`, e);
      }
    }

    // තහවුරු කිරීමේ පණිවිඩය Group එකට
    await conn.sendMessage(from, {
      text: `*✅ සාර්ථකව ${sentCount}/${totalMembers} දෙනෙකුට Inbox වලට පණිවිඩය යවන ලදී!*\n\n*පණිවිඩය:* _${customMessage}_\n\n> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴄʏʙᴇʀ ᴅɪɴᴜ ɪᴅ`
    }, { quoted: mek });

  } catch (error) {
    console.error("Inbox Message යැවීමේ දෝෂය:", error);
    reply("*`දෝෂයක් ඇති විය. කරුණාකර නැවත උත්සාහ කරන්න`*");
  }
});

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    