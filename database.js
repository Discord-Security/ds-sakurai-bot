const { connect, Schema, model, set } = require("mongoose");
const { ChalkAdvanced } = require("chalk-advanced");
set("strictQuery", true);
connect(process.env.DB, {})
	.then(() =>
		console.log(
			`${ChalkAdvanced.gray(">")} ${ChalkAdvanced.green(
				"✅ • Carregado com sucesso [BANCO DE DADOS]"
			)}`
		)
	)
	.catch(() =>
		console.log(
			`${ChalkAdvanced.gray(">")} ${ChalkAdvanced.red(
				"❎ • Conexão do banco de dados falhada"
			)}`
		)
	);

const guildSchema = new Schema({
	_id: { type: String, required: true },
	representative: { type: String, default: "" },
	roleId: String,
	staffs: [
		{
			_id: String,
			function: String,
		},
	],
	invite: String,
	approved: Boolean,
});

const reportSchema = new Schema({
	_id: { type: String, required: true },
	ids: String,
	PositiveVotes: Number,
	NegativeVotes: Number,
	voted: [
		{
			_id: String,
			roleId: String,
		},
	],
});

module.exports.Guilds = model("Guilds", guildSchema);
module.exports.Reports = model("Reports", reportSchema);
