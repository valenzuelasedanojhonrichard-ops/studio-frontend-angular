import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VentaService } from '../../core/services/venta.service';
import { ClienteService } from '../../core/services/cliente.service';
import { ProductosService } from '../../core/services/productos.service';

@Component({
  selector: 'app-ventas',
  imports: [CommonModule,FormsModule],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent {

  productos:any[] = [];
  ventas:any[] = [];

  carrito:any[] = [];

  productoSeleccionado:any;
  cantidad:number = 1;

  total:number = 0;

  vista:string = 'crear';

  ventaSeleccionada:any = null;

  clientes:any[] = [];
  clienteSeleccionado:any = null;


  constructor(
  private productosService: ProductosService,
  private ventaService: VentaService,
  private clienteService: ClienteService
  ){}


  ngOnInit(){
    this.listarProductos();
    this.listarVentas();
    this.listarClientes()
  };

   // 🔹 PRODUCTOS
  listarProductos(){
    this.productosService.listar().subscribe((data:any[])=>{
      this.productos = data;
    });
  }

  // 🔹 VENTAS
  listarVentas(){
    this.ventaService.listar().subscribe((data:any[])=>{
      this.ventas = data;
    });
  }

  listarClientes(){
  this.clienteService.listar().subscribe((data:any[])=>{
    this.clientes = data;
  });
}



  agregar(){

  if(!this.productoSeleccionado || !this.cantidad){
    alert("Seleccione producto y cantidad");
    return;
  }

  const precio = Number(this.productoSeleccionado.precio);
  const cantidad = Number(this.cantidad);
  const subtotal = precio * cantidad;

  this.carrito.push({
    producto: { id: this.productoSeleccionado.id },
    nombre: this.productoSeleccionado.nombre,
    precio: precio,
    cantidad: cantidad,
    subtotal: subtotal
  });

  this.calcularTotal();
  this.cantidad = 1;
}


  calcularTotal(){
  this.total = this.carrito
    .reduce((sum, item) => sum + Number(item.subtotal), 0);
}


  guardarVenta(){

  const venta = {
    cliente: { id: this.clienteSeleccionado.id },
    total: this.total,
    detalles: this.carrito
  };

  if(!this.clienteSeleccionado){
    alert("Seleccione cliente");
    return;
  }
  this.ventaService.crear(venta)
  .subscribe(()=>{

    alert("Venta guardada");

    this.carrito = [];
    this.total = 0;

    this.listarVentas(); // 🔥 FALTABA ESTO
  });
}

verDetalle(v:any){
  this.ventaSeleccionada = v;

}

descargarPDF(){
  window.open(`http://localhost:8080/api/ventas/reporte/pdf?inicio=2026-01-01T00:00:00&fin=2026-12-31T23:59:59`);
}

textoBuscar:string = '';

buscar(){
  this.ventaService.buscar(this.textoBuscar)
    .subscribe(data => this.ventas = data);
}


imprimir(){
  const contenido = document.getElementById('boleta')?.innerHTML;
  const ventana = window.open('', '', 'width=600,height=600');

  if(ventana){
    ventana.document.write(`
      <html>
        <head>
          <title>Boleta</title>

          <style>
            body {
              font-family: Arial;
              padding: 10px;
            }

            table {
              width: 100%;
              border-collapse: collapse;
            }

            th, td {
              border: 1px solid black;
              padding: 4px;
              font-size: 12px;
            }

            .no-print {
              display: none;
            }

          </style>

        </head>
        <body>
          ${contenido}
        </body>
      </html>
    `);

    ventana.document.close();
    ventana.print();
  }
}

}








