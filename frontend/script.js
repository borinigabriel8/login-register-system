const loginForm = document.querySelector("#loginForm");
const registerForm = document.querySelector("#registerForm");

/* login */
if (loginForm) {
	loginForm.addEventListener("submit", async (e) => {
		e.preventDefault();

		const email = document.querySelector("#email").value;
		const password = document.querySelector("#password").value;

		const res = await fetch("http://localhost:4000/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password })
		});

		const data = await res.json();

		showModal(
			data.success
				? "Login realizado com sucesso!"
				: data.message
		);
	});
}

/* registro */
if (registerForm) {
	registerForm.addEventListener("submit", async (e) => {
		e.preventDefault();

		const email = document.querySelector("#email").value;
		const password = document.querySelector("#password").value;

		const res = await fetch("http://localhost:4000/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password })
		});

		const data = await res.json();

		showModal(
			data.success
				? "Conta criada com sucesso!"
				: data.message
		);

		if (data.success) {
			setTimeout(() => {
				window.location.href = "login.html";
			}, 2000);
		}
	});
}

/* MODAL */
function showModal(message) {
	const modal = document.createElement("div");
	modal.style.position = "fixed";
	modal.style.inset = "0";
	modal.style.background = "rgba(0,0,0,0.4)";
	modal.style.display = "flex";
	modal.style.alignItems = "center";
	modal.style.justifyContent = "center";
	modal.style.zIndex = "9999";

	modal.innerHTML = `
		<div style="
			background: rgba(255,255,255,0.9);
			backdrop-filter: blur(10px);
			padding: 25px 35px;
			border-radius: 14px;
			font-size: 16px;
			color: #0f172a;
			box-shadow: 0 20px 40px rgba(0,0,0,0.2);
		">
			${message}
		</div>
	`;

	document.body.appendChild(modal);

	setTimeout(() => modal.remove(), 2200);
}
