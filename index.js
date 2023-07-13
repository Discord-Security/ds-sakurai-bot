const discord = require("discord.js");
require("dotenv").config();

const client = new discord.Client({
  intents: 3276799,
  cacheWithLimits: {
    MessageManager: {
      sweepInterval: 300,
      sweepFilter: discord.Sweepers.filterByLifetime({
        lifetime: 60,
        getComparisonTimestamp: (m) => m.editedTimestamp ?? m.createdTimestamp,
      }),
    },
  },
});

client.cor = "#FB4570";
client.db = require("./database");
client.canais = {
	logs: "1120077184346902589",
	errors: "1120081583324545084",
};
client.central = '1106771396757037076';
client.msg = {
  embeds: {
    nopermmod: new discord.EmbedBuilder()
      .setAuthor({
        name: `» Para usar este comando você deverá ser da equipe de moderação.`,
        iconURL: client.err,
      })
      .setColor(client.cor),
  },
};

process.on("unhandledRejection", (error) => {
  console.log(error);
  client.channels.cache
    .get(client.canais.errors)
    .send("Erro detectado: \n" + error);
});
process.on("uncaughtException", (error) => {
  console.log(error);
  client.channels.cache
    .get(client.canais.errors)
    .send("Erro detectado: \n" + error);
});

const boilerplateComponents = async () => {
  await require("./src/util/boilerplateClient")(client);
};

boilerplateComponents();
