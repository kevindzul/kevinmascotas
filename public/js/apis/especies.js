
function init() {

var apiEspecie='http://localhost/kevinmascotas/public/apiEspecie'


new Vue ({

    http: {
            headers: {
                'X-CSRF-TOKEN': document.querySelector('#token').getAttribute('value')
            }
        },

	el:'#apiEspecies',

	data:{
        mensaje:'Hola bienvenido',
        especies:[],
	},
	created:function(){
		this.getEspecies();

	},
	methods:{
		getEspecies:function(){
			this.$http.get(apiEspecie).then(function(j){ 
				this.especies=j.data;
			})


		},


		eliminarEspecie:function(id){
			Swal.fire({
      title: 'Esta seguro de eliminar?',
      text: "No podra recuperarse los cambios!",
      icon: 'warning',
      showCancelButton: true,
    confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, elimina!'
    }).then((result) => {
      if (result.isConfirmed) {

       this.$http.delete(apiEspecie + '/' + id).then(function(j){
              this.getEspecies();
       }).catch(function(j){
             console.log(j);
       });


      Swal.fire(
        'Eliminado Exitosamente!',
        'el propietario fue eliminado.',
        'success'
        )
      }
  });
       

		},


		mostrarModal(){
			$('#modalEspecies').modal('show');
		}



	},

	computed:{

	},
})	

}window.onload = init;