var productos = null;
function obtenerProductos() {
	fetch('http://127.0.0.1:3000/muebleria')
		.then(res => res.json())
		.then(data => {
			productos =data;
			productos.forEach(
				function (producto) {
					producto.precio = parseFloat(producto.precio)
				});
			guardar(productos);
			console.log('Si paso por aqui : tamaño '+productos.length+" la ide: "+productos[2].id);
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

	console.log('Si llego a este metodo: + tamaño: '+productos.length);
	for (i = 0; i < productos.length; i++) {
		var id = productos[i].id;
		var foto = productos[i].imagen;
		var precio = productos[i].precio.toFixed(2);
		var descripcion = productos[i].descripcion;
		var categoria = productos[i].categoria;
		var titulo = productos[i].titulo;
		let img="<a href=\""+foto+"\" target=\"_blank\"><img src=\""+foto+"\" class=\"img-thumbnail\"  width=\"100\" height=\"100\"></a>"
		var fila = "<td>" + id + "</td><td>"+img+"</td><td>$" + precio + "</td><td>" + titulo+ "</td><td>" + descripcion + "</td><td>" + categoria + "</td>";

		var btn = document.createElement("tr");
		btn.innerHTML = fila;
		let tabla=document.getElementById("tablita");
		tabla.appendChild(btn);
		console.log(fila);
	}
}


