@extends('layouts.master')
@section('titulo','CRUD MASCOTAS')
@section('contenido')
	
	<!--inicia vue-->
	<div id="mascota">
		

		<div class="row">
			<!--inicio de col-->
			<div class="col-md-12">
				<!--inicio de card-->
				<div class="card card-warning">
					<div class="card-header">
						<h3>CRUD DE LAS MASCOTAS
						<span class="btn btn-sm btn-primary" @click="mostrarModal()">
							<i class="fas fa-plus"></i>
						</span>
						</h3>
						<div class="col-md-6">
					<input type="text" placeholder="Escribe el nombre de la Mascota" class="form-control" v-model="buscar">
				</div>
					</div>
				
					<div class="card-body">
							<!--inicio de la tabla-->
				<table class="table table-bordered table-striped">
					<thead>
						<th hidden="">ID MASCOTA</th>
						<th>NOMBRE</th>
						<th>GENERO</th>
						<th>PESO</th>
						<th>ESPECIE</th>
						<th>ACCIONES</th>
					</thead>

					<tbody>
						
						<tr v-for="mascota in filtroMascotas">
							<td hidden="">@{{mascota.id_mascota}}</td>
							<td>@{{mascota.nombre}}</td>
							<td>@{{mascota.genero}}</td>
							<td>@{{mascota.peso}}</td>
							<td>@{{mascota.especie.especie}}</td>
							<td>
								<button class="btn btn-sm" @click="editandoMascota(mascota.id_mascota)">

									<i class="fas fa-pen"></i>
								</button>
								<button class="btn btn-sm" @click="eliminarMascota(mascota.id_mascota)"> 
									<i class="fas fa-trash-alt"></i>
								</button>
							</td>
							
						</tr>

					</tbody>

				</table>
				<!--fin de la tabla de las mascotas-->

						


					</div>

				</div>
				<!--fin de la seccion card-->

			</div>
			<!--fin del metodo asignando parametros col-->
		</div>

		<!-- ventan modal para asignar secciones de la tabla -->
<div class="modal fade" id="modalMascota" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel" v-if="agregando==true">Registro de Mascota</h5>
        <h5 class="modal-title" id="exampleModalLabel" v-if="agregando==false">Editar Mascota</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

      	<input type="text" class="form-control" placeholder="Nombre de mascota" v-model="nombre"><br>
      	
      	<select class="form-control" v-model="genero">
      		<option disabled="">Genero de Mascota</option>
      		<option value="M">Macho</option>
      		<option value="H">Hembra</option>
      		<option value="H">guy</option>
      	</select><br>

      	<select class="form-control" v-model="id_especie" @change="obtenerRazas">
      		<option v-for="especie in especies" v-bind:value="especie.id_especie">@{{especie.especie}}</option>
      	
      	 
      	</select><br>

      	<select class="form-control" v-model="id_raza">
      		<option value="" disabled="">Selecciona la raza</option>
      		<option v-for="raza in razas" v-bind:value="id_raza">@{{raza.raza}}</option>
      		
      	</select><br>
      	

      	<!--<h3>Especie disponible: @{{id_especie}}</h3> //No usar para el usuario-->
      	

      	<input type="number" class="form-control" placeholder="Peso de mascota" v-model="peso">




        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" @click="guardarMascota" v-if="agregando==true">Guardar</button>
        <button type="button" class="btn btn-warning" @click="actualizarMascota()" v-if="agregando==false">Guardar</button>
      </div>
    </div>
  </div>
</div>
<!-- finalizacion de la codificacion modal-->



	</div>
	<!--termina la seccion del vue-->
@endsection


@push('scripts')

	<script type="text/javascript" src="{{asset('js/vue-resource.js')}}"></script>
	<script type="text/javascript" src="{{asset('js/apis/apiMascota.js')}}"></script>

@endpush