const config = require("../Other/config.js");
const profileModel = require("../models/profileSchema");
const editJsonFile = require("edit-json-file");

module.exports = {
    name: "tradingbalance",
    aliases: config.aliases.aliasestradingbalance,
    cooldown: config.cooldown.cooldowntradingbalance,
    permissions: config.permissions.permissiontradingbalance,
    description: "Display your current shard balance.",
    async execute(message, args, cmd, client, Discord, profileData) {
    },
};
