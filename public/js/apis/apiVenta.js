function init(){
var apiProducto='http://localhost/kevinmascotas/public/apiProducto';
new Vue({
	http: {
            headers: {
                'X-CSRF-TOKEN': document.querySelector('#token').getAttribute('value')
            }
        },

	el:'#apiVenta',

	data:{
		mensaje:'HOLA BIENVENIDO XD',
		sku:'',
		ventas:[],
		cantidades:[],
		cant:1,
		auxSubTotal:0,
		

	}, 
	created:function(){
		
	},
	methods:{
		buscarProducto:function(){

			if(this.sku) {
			var producto = {}
			this.$http.get(apiProducto + '/' + this.sku).then(function(j){
				producto = {
					sku:j.data.sku,
					nombre:j.data.nombre,
					precio:j.data.precio,
					cantidad:1,
					total:j.data.precio
				};
			
					this.ventas.push(producto);
					this.cantidades.push(1);
				this.sku='';
			});
		}

		},

		eliminarProducto:function(id){
			this.ventas.splice(id,1);
		}
		

	},
	computed:{
		totalProducto(){  
			return(id)=>{
				var total = 0;
				total=this.ventas[id].precio * this.cantidades[id];
				this.ventas[id].total=total; 
				this.ventas[id].cantidad=this.cantidades[id];
				return total.toFixed(1);
			}

		},

		subTotal(){
			var total=0;
			var valor=0;

			for (var i =  this.ventas.length - 1; i >= 0; i--) {
				 total=total+this.ventas[i].total;
			}
			this.auxSubTotal=total.toFixed(1);
			return total.toFixed(1);
		},

		iva(){
			var auxIva=0;
			auxIva=this.auxSubTotal*0.16;

			return auxIva.toFixed(1);
		},

		numTotal(){
			var auxTotal=0;
			auxTotal=this.auxSubTotal*1.16;
			return auxTotal.toFixed(1);
		},
		numeroArticulos(){
			var acum=0;
			for (var i = this.ventas.length - 1; i >= 0; i--) {
				acum=acum+this.ventas[i].cantidad;
			}
			return acum;
		}


	}
})

} window.onload = init;