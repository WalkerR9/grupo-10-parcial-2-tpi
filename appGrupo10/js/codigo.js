var productos = null;
function obtenerProductos() {
	fetch('http://127.0.0.1:3000/muebleria')
		.then(res => res.json())
		.then(data => {
			productos = data;
			productos.forEach(
				function (producto) {
					producto.precio = parseFloat(producto.precio)
				});
			guardar(productos);
			console.log('Si paso por aqui : tamaño ' + productos.length + " la ide: " + productos[2].id);
			$(document).ready(function () {
				$('#tabla').DataTable({
					language: {
						search: "Buscar:",
						lengthMenu: "Desplegar _MENU_ elementos",
						info: "Mostrando del elemento _START_ al _END_ , de _TOTAL_ elementos en total",
						infoEmpty: "No hay elementos por mostrar",
						infoFiltered: "(se filtraron _MAX_ elementos en total)",
						infoPostFix: "",
						loadingRecords: "Cargando...",
						zeroRecords: "No se encuentran registros",
						emptyTable: "No hay datos disponible en la tabla",
						paginate: {
							first: "Primera",
							previous: "Anterior",
							next: "Siguiente",
							last: "Ultima"
						},
						aria: {
							sortAscending: ": ordenar de forma ascendente",
							sortDescending: ": ordenar de forma descendente"
						}
					}
				});
			});


		})
		.catch(error => {
			alert(error);
		});
}

function guardar(productos) {

	console.log('Si llego a este metodo: + tamaño: ' + productos.length);
	for (i = 0; i < productos.length; i++) {
		var id = productos[i].id;
		var foto = productos[i].imagen;
		var precio = productos[i].precio.toFixed(2);
		var descripcion = productos[i].descripcion;
		var categoria = productos[i].categoria;
		var titulo = productos[i].titulo;

		let boton = "<form action=\"ver.html\" method=\"get\"><input type=\"hidden\" name=\"id\" value=\"" + productos[i].id + " \"><button type=\"submit\" class=\"btn btn-primary\">Ver >></button></form>";

		let img = "<a href=\"" + foto + "\" target=\"_blank\"><img src=\"" + foto + "\" class=\"img-thumbnail\"  width=\"100\" height=\"100\"></a>";

		var fila = "<td>" + id + "</td><td>" + img + "</td><td>$" + precio + "</td><td>" + titulo + "</td><td>" + descripcion + "</td><td>" + categoria + "</td> <td>" + boton + "</td>";

		var btn = document.createElement("tr");
		btn.innerHTML = fila;
		let tabla = document.getElementById("tablita");
		tabla.appendChild(btn);
		console.log(fila);
	}
}

function obtenerProductos2() {
	fetch('http://127.0.0.1:3000/muebleria')
		.then(res => res.json())
		.then(data => {
			productos = data;
			productos.forEach(
				function (producto) {
					producto.precio = parseFloat(producto.precio)
				});
			guardar2(productos);
			console.log('Si paso por aqui : tamaño ' + productos.length + " la ide: " + productos[2].id);
			$(document).ready(function () {
				$('#tabla').DataTable({
					language: {
						search: "Buscar:",
						lengthMenu: "Desplegar _MENU_ elementos",
						info: "Mostrando del elemento _START_ al _END_ , de _TOTAL_ elementos en total",
						infoEmpty: "No hay elementos por mostrar",
						infoFiltered: "(se filtraron _MAX_ elementos en total)",
						infoPostFix: "",
						loadingRecords: "Cargando...",
						zeroRecords: "No se encuentran registros",
						emptyTable: "No hay datos disponible en la tabla",
						paginate: {
							first: "Primera",
							previous: "Anterior",
							next: "Siguiente",
							last: "Ultima"
						},
						aria: {
							sortAscending: ": ordenar de forma ascendente",
							sortDescending: ": ordenar de forma descendente"
						}
					}
				});
			});


		})
		.catch(error => {
			alert(error);
		});
}

function guardar2(productos) {

	for (i = 0; i < productos.length; i++) {
		var id = productos[i].id;
		var precio = productos[i].precio.toFixed(2);
		var categoria = productos[i].categoria;
		var titulo = productos[i].titulo;
		let btnActualizar = "	<form action=\"actualizar.html\" method=\"get\"><input type=\"hidden\" name=\"id\" value=\"" + productos[i].id + "\"><button type=\"submit\" class=\"btn btn-primary\">Actualizar</button></form>";
		var fila = "<td>" + id + "</td><td>$" + precio + "</td><td>" + titulo + "</td><td>" + categoria + "</td> <td>" + btnActualizar + "  <a class=\"btn btn-danger\" onclick=\"borrarMueble(" + productos[i].id + ")\">Eliminar</a></td>";

		var btn = document.createElement("tr");
		btn.innerHTML = fila;
		let tabla = document.getElementById("tablita");
		tabla.appendChild(btn);
	}
}


function addMueble() {
	let producto = {
		titulo: document.getElementById("titulo").value,
		precio: document.getElementById("precio").value,
		descripcion: document.getElementById("descripcion").value,
		categoria: document.getElementById("categoria").value,
	}
	let data = JSON.stringify(producto);

	fetch('http://localhost:3000/muebleria', {
		method: 'POST', // or 'PUT'
		body: data, // data can be `string` or {object}!
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(res => {
		res.json();
		window.location.href = "/admin.html";
	}).catch(error =>
			console.error('Error:', error)
	);


}


function borrarMueble(id) {
	fetch('http://localhost:3000/muebleria' + '/' + id, {
		method: 'delete'
	})
		.then(response => {
			response.json();
			location.reload();
		});
}

function getMueble() {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	var product = urlParams.get('id');
	console.log("este es el producto: " + product);

	fetch('http://127.0.0.1:3000/muebleria/' + product)
		.then(res => res.json())
		.then(data => {
			setProducto(data);
		})
		.catch(error => {
			alert(error);
		});

	function setProducto(data) {
		document.getElementById('id').value = data.id;
		document.getElementById('titulo').value = data.titulo;
		document.getElementById('precio').value = data.precio;
		document.getElementById('descripcion').value = data.descripcion;
		document.getElementById('categoria').value = data.categoria;
	}
}


