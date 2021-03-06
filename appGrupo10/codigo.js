var fila="<tr><td class='id'></td><td class='foto'></td><td class='price'></td><td class='title'></td><td class='description'></td><td class='category'></td><td class='option'></td></tr>";
	 var productos=null;
	function obtenerProductos() {
	  fetch('http://127.0.0.1:3000/muebleria')
            .then(res=>res.json())
            .then(data=>{
				productos=data;
				productos.forEach(
				function(producto){
					producto.precio=parseFloat(producto.precio)
				});
				listarProductos(data)})
			.catch(error => {
                    alert(error);
                } )
}

function guardarProductos(){
	let producto = {
		titulo:document.getElementById("nombre").value,
		precio:document.getElementById("precio").value,
		descripcion:document.getElementById("descripcion").value,
		imagen:document.getElementById("imagen").value,
		categoria:document.getElementById("categoria").value,
	}
	fetch("http://127.0.0.1:3000/muebleria",
	{ method:"POST",
	  body: JSON.stringify(producto),
	  headers: {
		 'Accept': 'application/json',
		 'Content-type': 'application/json; charset=UTF-8',
	  }
	})
	.then(response=>response.json())
	.then(data=>productos=data);
	alert("El mueble se ha registrado");
	document.getElementById("nombre").value = "";
	document.getElementById("precio").value = "";
	document.getElementById("descripcion").value = "";
	document.getElementById("imagen").value = "";

	orden=0;
	window.setTimeout(obtenerProductos, 500);
}


  function codigoCat(catstr) {
	var code="null";
	switch(catstr) {
		case "Oficina":code="c1";break;
	    case "Sala":code="c2";break;
		case "Reclinables":code="c3";break;
		case "Dormitorio":code="c4";break;
	}
	return code;
}   
	  var orden=0;
	  
	  
	function listarProductos(productos) {
	  var precio=document.getElementById("price"); 
	  precio.setAttribute("onclick", "orden*=-1;listarProductos(productos);");
	  var num=productos.length;
	  var listado=document.getElementById("listado");
	  var ids,titles,prices,descriptions,categories,fotos,accion;
	  var tbody=document.getElementById("tbody"),nfila=0;
	  tbody.innerHTML="";
	  var catcode;
	  for(i=0;i<num;i++) tbody.innerHTML+=fila;
	  var tr; 
	  ids=document.getElementsByClassName("id");
	  titles=document.getElementsByClassName("title");
	  descriptions=document.getElementsByClassName("description");
	  categories=document.getElementsByClassName("category");   
	  fotos=document.getElementsByClassName("foto");   
	  prices=document.getElementsByClassName("price");
	  accion=document.getElementsByClassName("option");   
	  if(orden===0) {orden=-1;precio.innerHTML="Precio"}
	else
	     if(orden==1) {ordenarAsc(productos,"precio");precio.innerHTML="Precio A";precio.style.color="darkgreen"}
	     else 
	       if(orden==-1) {ordenarDesc(productos,"precio");precio.innerHTML="Precio D";precio.style.color="blue"}
	
	  	listado.style.display="block";
	  	for(nfila=0;nfila<num;nfila++) {
        	ids[nfila].innerHTML=productos[nfila].id;
			titles[nfila].innerHTML=productos[nfila].titulo;
			descriptions[nfila].innerHTML=productos[nfila].descripcion;
			categories[nfila].innerHTML=productos[nfila].categoria;
			catcode=codigoCat(productos[nfila].categoria);
			tr=categories[nfila].parentElement;
			tr.setAttribute("class",catcode);
			prices[nfila].innerHTML=productos[nfila].precio;
			fotos[nfila].innerHTML="<img src='"+productos[nfila].imagen+"'>";
			fotos[nfila].firstChild.setAttribute("onclick","window.open('"+productos[nfila].imagen+"');" );
			accion[nfila].innerHTML = `<button class = "eliminar" href = "#" value = ${productos[nfila].id}>Eliminar</button><button class = modificar href = "#" value = ${productos[nfila]}>Modificar</button>`;
		}
	}

	tabla.addEventListener('click', (e) => {
		e.preventDefault();
		if(e.target.matches('.eliminar')) {
		fetch(`http://127.0.0.1:3000/muebleria/${e.target.getAttribute('value')}`, {
			method: "DELETE",
		})
		.then(response => response.json())
		.then(data => {
			orden=0;
			alert("El producto se ha eliminado");
		})
		}
		/*if(e.target.matches('.modificar')) {
			document.getElementById("nombre").value = e.target.value.titulo;
			document.getElementById("precio").value = e.target.value.precio;
			document.getElementById("descripcion").value =  e.target.value.descripcion;		
			document.getElementById("imagen").value =  e.target.value.imagen;
		}*/
	});

	const on = (element, event, selector, handler) =>{
		element.addEventListener(event, e =>{
			if(e.target.closest(selector)){
				handler(e);
			}
		})
	}

	let id;
	on(document, 'click', '.modificar', e => {
		const fila = e.target.parentNode.parentNode;
	 	id = fila.children[0].innerHTML;
		const foto = fila.children[1].children[0].getAttribute("src");
		const precio = fila.children[2].innerHTML;
		const titulo = fila.children[3].innerHTML;
		const descripcion = fila.children[4].innerHTML;
		const categoria = fila.children[5].innerHTML;
		document.getElementById("nombre").value = titulo;
		document.getElementById("precio").value = precio;
		document.getElementById("descripcion").value = descripcion;
		document.getElementById("categoria").value = categoria;
		document.getElementById("imagen").value = foto;
	});

	function modificarProductos() {
		fetch('http://127.0.0.1:3000/muebleria/'+id,{
			method : 'PUT',
			headers: {
				'Content-Type' : 'application/json'
			},
			body: JSON.stringify({
				imagen:document.getElementById("imagen").value,
				precio:document.getElementById("precio").value,
				titulo:document.getElementById("nombre").value,
				descripcion:document.getElementById("descripcion").value,
				categoria:document.getElementById("categoria").value
			})
		})
		.then( response => response.json())
		.then( response => location.reload())
	}

function ordenarDesc(p_array_json, p_key) {
   p_array_json.sort(function (a, b) {
      if(a[p_key] > b[p_key]) return -1;
if(a[p_key] < b[p_key]) return 1;
return 0;
   });
}

function ordenarAsc(p_array_json, p_key) {
   p_array_json.sort(function (a, b) {
      if(a[p_key] > b[p_key]) return 1;
if(a[p_key] < b[p_key]) return -1;
return 0;
   });
}