function init(){ 
var apiMascota='http://localhost/kevinmascotas/public/apiMascota';
var apiEspecie='http://localhost/kevinmascotas/public/apiEspecie';
new Vue({
	http: {
            headers: {
                'X-CSRF-TOKEN': document.querySelector('#token').getAttribute('value')
            }
        },

	el:"#mascota",

	data:{
		prueba:'hola',
		mascotas:[],
		especies:[],
        razas:[],
		nombre:'',
		genero:'',
		peso:'',
		agregando:true,
		id_mascota:'',
		id_especie:'',
		id_raza:'',
		buscar:'',




	},

	created:function(){
		this.obtenerMascotas();
		this.obtenerEspecies();
	},
		methods:{
			obtenerMascotas:function(){
				this.$http.get(apiMascota).then(function(json){
					this.mascotas=json.data;
					console.log(json.data);
				}).catch(function(json){
					console.log(json);
				});
			},

			mostrarModal:function(){
				this.agregando=true;
				this.nombre='';
				this.genero='';
				this.peso='';
				this.id_especie='';
				$('#modalMascota').modal('show');
			},

			guardarMascota:function(){
				var mascota={nombre:this.nombre,
					genero:this.genero,
					peso:this.peso,
				id_especie:this.id_especie};
						this.$http.post(apiMascota,mascota).then(function(j){ //se enlazan los datos del controlador
					this.obtenerMascotas();
					this.nombre='';
					this.genero='';
					this.peso='';
					this.id_especie='';

				}).catch(function(j){
					console.log(j); 
				});
				$('#modalMascota').modal('hide');
				console.log(mascota);
			},

			eliminarMascota:function(id){
				var confir= confirm('Esta seguro de eliminar la mascota?');
				if (confir)
				{
					this.$http.delete(apiMascota + '/' + id).then(function(json){
						this.obtenerMascotas();
					}).catch(function(json){

					});
				}
			},

			editandoMascota:function(id){
				this.agregando=false;
				this.id_mascota=id;
				this.$http.get(apiMascota + '/' + id).then(function(json){
					this.nombre=json.data.nombre;
					this.genero=json.data.genero;
					this.peso=json.data.peso;
				});
				$('#modalMascota').modal('show');
			},

			actualizarMascota:function(){
				var jsonMascota = {nombre:this.nombre,
									genero:this.genero,
									peso:this.peso,
									id_especie:this.id_especie
								};
				this.$http.patch(apiMascota + '/' + this.id_mascota,jsonMascota).then(function(json){
					this.obtenerMascotas();
				});
				$('#modalMascota').modal('hide');
			},

			obtenerEspecies:function(){
			this.$http.get(apiEspecie).then(function(json){
				this.especies=json.data;
			})
		},
		obtenerRazas(e){
			var id_especie=e.target.value;
			this.$http.get(rutas + '/getRazas/' + id_especie ).then(function(j){
				this.razas=j.data;
						});

		}


		},
		
	computed:{ 
		
		filtroMascotas:function(){ //INICIO DEL FILTRO
			return this.mascotas.filter((mascota)=>{
				return mascota.nombre.toLowerCase().match(this.buscar.toLowerCase().trim())
				       mascota.especie.especie.toLowerCase().match(this.buscar.toLowerCase().trim())
			});
		}, 

	}
 
});

}window.onload = init;

