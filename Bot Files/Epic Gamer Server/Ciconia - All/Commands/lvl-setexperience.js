const profileModel = require("../models/profileSchema");
const config = require('./../Other/config.js');

module.exports = {
  name: "setexperience",
  aliases: config.aliases.aliasessetexperience,
  cooldown: config.cooldown.cooldownsetexperience,
  permissions: config.permissions.permissionsetexperience,
  description: "Reset the amount of experience of a member.",
  async execute(message, args, cmd, client, discord, profileData) {
    if (!args.length) return message.channel.send(process.env.MSGMEMBERMENTION);
    const amount = args[1];
    const target = message.mentions.users.first();
    if (!target) return message.channel.send(process.env.MSGFINDERR);

    if (amount < -1) return message.channel.send(process.env.MSGGREATERNEGAONE);

    try {
      const targetData = await profileModel.findOne({ userID: target.id });
      if (!targetData) return message.channel.send(process.env.MSGNOACCOUNT);
      await profileModel.findOneAndUpdate(
        {
          userID: target.id,
        },
        {
          $set: {
            experience: amount,
          },
        }
      );

      return message.channel.send(
        `${message.author.username}, the targeted member's experience is now \`${amount}\`.`
      );
    } catch (err) {
      console.log(err);
    }
  },
};
