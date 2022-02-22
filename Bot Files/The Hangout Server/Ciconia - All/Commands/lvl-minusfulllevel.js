const profileModel = require("../models/profileSchema");
const config = require("./../Other/config.js");

module.exports = {
  name: "minuslevelandexperience",
  aliases: config.aliases.aliasesminusfulllevel,
  cooldown: config.cooldown.cooldownminusfulllevel,
  permissions: config.permissions.permissionminusfulllevel,
  description: "Decrease the experience and level.",
  async execute(message, args, cmd, client, discord, profileData) {
    if (args[2] === "delete") {
      message.delete();
    } else if (args[2] === "del" || args[2] === "d") {
      message.delete();
    }

   if (!args[0]) {
      return message.channel.send({ content: config.basemessages.messagesmembermention})
    };
    const amount = args[1];
    const target = message.mentions.users.first();
    if (!target) return message.channel.send({ content: config.basemessages.messagesfinderror});

    if (amount <= 0)
      return message.channel.send({ content: config.basemessages.messagesgreaterone});

    try {
      const targetData = await profileModel.findOne({ userID: target.id });
      if (!targetData) return message.channel.send({ content: config.basemessages.messagesaccountmissing});
      await profileModel.findOneAndUpdate(
        {
          userID: target.id,
        },
        {
          $inc: {
            experience: -amount,
            level: -amount,
          },
        }
      );

      return message.channel.send({ content: 
        `${message.author.username}, the targeted member has lost \`${amount}\` amount of experience and levels.`
      });
    } catch (err) {
      console.log(err);
    }
  },
};
