new Vue({
  el:"#miPagina",
  data:{
   nombre:'',
   primer_apellido:'',
   Segundo_apellido:'',
   generos:'',
   editando:0,
    indice:0,
   buscar:'',
   

   propietarios:[{nombre:'Luis',primer_apellido:'Perez',segundo_apellido:'Ojeda',genero:'M'},
                 {nombre:'Jorge',primer_apellido:'Gonzales',segundo_apellido:'Perez',genero:'M'},
                 {nombre:'Leticia',primer_apellido:'Cruz',segundo_apellido:'May',genero:'F'}
            ],



   genero:[
               {clave:1,nombre:'M'},
               {clave:2,nombre:'F'}
            ],



  },
  methods:{
 agregarPropietario:function(){
    if(this.nombre && this.primer_apellido && this.segundo_apellido && this.genero){
      var elPropietario={nombre:this.nombre,primer_apellido:this.primer_apellido,segundo_apellido:this.segundo_apellido,genero:this.generos};
      this.propietarios.push(elPropietario);
      this.limpiarHtml();
      this.$refs.nombre.focus();

      Swal.fire({
         position: 'center',
         icon: 'success',
         title: 'Se ha guardado exitosamente',
         showConfirmButton: false,
         timer: 2000
       })
   }
   else
     Swal.fire({
         position: 'top-end',
         icon: 'error',
         title: 'Debe capturar todos los datos',
         showConfirmButton: false,
         timer: 2000
       })
   },

   limpiarHtml:function(){
     this.nombre='';
     this.primer_apellido='';
     this.segundo_apellido='';
     this.generos='';
   },

   eliminarPropietario:function(pos){
    Swal.fire({
        title: '¿PREFIERE ELIMINAR?',
      text: "¡NO RECUPERARA INFORMACION!",
      icon: 'warning',
      showCancelButton: true,
    confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡ELIMINAR DE IMMEDIATO!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.propietarios.splice(pos,1);

      Swal.fire(
        'Eliminado Exitosamente!',
        'el propietario fue eliminado.',
        'success'
        )
      }
  })
    },
editarPropietario:function(pos){
      this.nombre=this.propietarios[pos].nombre;
      this.primer_apellido=this.propietarios[pos].primer_apellido;
      this.segundo_apellido=this.propietarios[pos].segundo_apellido;
      this.generos=this.propietarios[pos].genero;
      this.editando=1;
      this.indice=pos;
   },
   
   cancelar:function(){
      this.limpiarHtml();
      this.editando=0;
   }, 
   guardarEdicion:function(){
      this.propietarios[this.indice].nombre=this.nombre;
      this.propietarios[this.indice].primer_apellido=this.primer_apellido;
      this.propietarios[this.indice].segundo_apellido=this.segundo_apellido;
      this.propietarios[this.indice].genero=this.generos;
      this.limpiarHtml();
      this.editando=0;
   

      Swal.fire({
      position: 'top-end',
      icon: 'info',
      title: 'Los cambios fuero exitosos',
      showConfirmButton: false,
      timer: 2000
    })
    },

  },
  computed:{
    numeroPropietarios: function(){
      var num=0;
      num=this.propietarios.length;
      return num;
    },
    filtroPropietarios:function(){
      return this.propietarios.filter((propietario)=>{

        return propietario.nombre.toLowerCase().match(this.buscar.toLowerCase().trim()) ||

        propietario.primer_apellido.toLowerCase().match(this.buscar.toLowerCase().trim()) ||

        propietario.segundo_apellido.toLowerCase().match(this.buscar.toLowerCase().trim()) ||

        propietario.genero.toLowerCase().match(this.buscar.toLowerCase().trim())

         });
     }
  }

});