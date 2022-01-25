const profileModel = require("../models/profileSchema");
const config = require("./../Other/config.js");

module.exports = {
  name: "givebankandwallet",
  aliases: config.aliases.aliasesgivefulleco,
  cooldown: config.cooldown.cooldowngivefulleco,
  permissions: config.permissions.permissiongivefulleco,
  description: "Increase the balance of both the bank and wallet account.",
  async execute(message, args, cmd, client, discord, profileData) {
    if (!args.length) return message.channel.send(config.basemessages.messagesmembermention);
    const amount = args[1];
    const target = message.mentions.users.first();
    if (!target) return message.channel.send(config.basemessages);

    if (amount % 1 == 0 || amount < 1)
      return message.channel.send(config.basemessages.messagesgreaterone);

    try {
      const targetData = await profileModel.findOne({ userID: target.id });
      if (!targetData) return message.channel.send(config.basemessages.messagesaccountmissing);
      await profileModel.findOneAndUpdate(
        {
          userID: target.id,
        },
        {
          $inc: {
            coins: amount,
            bank: amount,
          },
        }
      );

      return message.channel.send(
        `${message.author.username}, the targeted member has been given \`${amount}\` amount of coins to their bank and wallet account.`
      );
    } catch (err) {
      console.log(err);
    }
  },
};
