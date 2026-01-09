const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const pool = require("./database");

const app = express();
app.use(cors());
app.use(express.json());

/* TESTE */
app.get("/", (req, res) => {
	res.send("API rodando");
});

/* REGISTRO */
app.post("/register", async (req, res) => {
	const { email, password } = req.body;

	try {
		const check = await pool.query(
			"SELECT id FROM users WHERE email = $1",
			[email]
		);

		if (check.rows.length > 0) {
			return res.json({ success: false, message: "Email já cadastrado" });
		}

		const hash = await bcrypt.hash(password, 10);

		await pool.query(
			"INSERT INTO users (email, password) VALUES ($1, $2)",
			[email, hash]
		);

		res.json({ success: true });
	} catch (err) {
		res.status(500).json({ success: false, message: "Erro no servidor" });
	}
});

/* LOGIN */
app.post("/login", async (req, res) => {
	const { email, password } = req.body;

	try {
		const result = await pool.query(
			"SELECT * FROM users WHERE email = $1",
			[email]
		);

		if (result.rows.length === 0) {
			return res.json({ success: false, message: "Usuário não encontrado" });
		}

		const user = result.rows[0];
		const valid = await bcrypt.compare(password, user.password);

		if (!valid) {
			return res.json({ success: false, message: "Senha incorreta" });
		}

		res.json({ success: true });
	} catch (err) {
		res.status(500).json({ success: false, message: "Erro no servidor" });
	}
});

/* START */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Servidor rodando em http://localhost:${PORT}`);
});
