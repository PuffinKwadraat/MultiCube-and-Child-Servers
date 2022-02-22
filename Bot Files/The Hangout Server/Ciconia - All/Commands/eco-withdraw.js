const profileModel = require("../models/profileSchema");
const config = require("./../Other/config.js");

module.exports = {
  name: "withdraw",
  aliases: config.aliases.aliaseswithdraw,
  cooldown: config.cooldown.cooldownwithdraw,
  permissions: config.permissions.permissionwithdraw,
  description: "Bank to Wallet",
  async execute(message, args, cmd, client, discord, profileData) {
    const amount = args[0];
    if (amount <= 0)
      return message.channel.send({ content: config.basemessages.messagesgreaterone});

    try {
      if (amount > profileData.bank)
        return message.channel.send({ content: config.basemessages.messagescoinsmissing});

      await profileModel.findOneAndUpdate(
        {
          userID: message.author.id,
        },
        {
          $inc: {
            coins: amount,
            bank: -amount,
          },
        }
      );

      return message.channel.send({ content: 
        `You withdrew \`${amount}\` coins into your wallet.`
      });
    } catch (err) {
      console.log(err);
    }
  },
};
