import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';

interface Image {
  name: string;
  url: string;
}

interface Folder {
  name: string;
  images: Image[];
}

interface IPlantillaDaños {
  label: string;
  value: 'OK' | 'FALTANTE' | 'DAÑADO';
}

@Component({
  selector: 'app-google-drive-screen',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, SelectButtonModule],
  templateUrl: './google-drive-screen.component.html',
  styleUrls: ['./google-drive-screen.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoogleDriveScreenComponent implements OnInit {
  folders: Folder[] = [
    {
      name: 'Áreas',
      images: [
        { name: 'Imagen 1', url: 'https://via.placeholder.com/600x400?text=Imagen+1' },
        { name: 'Imagen 2', url: 'https://via.placeholder.com/600x400?text=Imagen+2' },
        { name: 'Imagen 3', url: 'https://via.placeholder.com/600x400?text=Imagen+3' },
        { name: 'Imagen 4', url: 'https://via.placeholder.com/600x400?text=Imagen+4' },
        { name: 'Imagen 5', url: 'https://via.placeholder.com/600x400?text=Imagen+5' },
        { name: 'Imagen 6', url: 'https://via.placeholder.com/600x400?text=Imagen+6' },
        { name: 'Imagen 7', url: 'https://via.placeholder.com/600x400?text=Imagen+7' },
        { name: 'Imagen 8', url: 'https://via.placeholder.com/600x400?text=Imagen+8' },
        { name: 'Imagen 9', url: 'https://via.placeholder.com/600x400?text=Imagen+9' }
      ]
    },
    {
      name: 'Piso',
      images: [
        { name: 'Imagen 4', url: 'https://via.placeholder.com/600x400?text=Imagen+4' },
        { name: 'Imagen 5', url: 'https://via.placeholder.com/600x400?text=Imagen+5' },
        { name: 'Imagen 6', url: 'https://via.placeholder.com/600x400?text=Imagen+6' }
      ]
    },
    {
      name: 'Techo',
      images: [
        { name: 'Imagen 7', url: 'https://via.placeholder.com/600x400?text=Imagen+7' },
        { name: 'Imagen 8', url: 'https://via.placeholder.com/600x400?text=Imagen+8' },
        { name: 'Imagen 9', url: 'https://via.placeholder.com/600x400?text=Imagen+9' }
      ]
    },
    {
      name: 'Llanta',
      images: [
        { name: 'Imagen 10', url: 'https://via.placeholder.com/600x400?text=Imagen+10' },
        { name: 'Imagen 11', url: 'https://via.placeholder.com/600x400?text=Imagen+11' },
        { name: 'Imagen 12', url: 'https://via.placeholder.com/600x400?text=Imagen+12' }
      ]
    }
  ];
  
  damages = [
    { name: 'Daño 1' },
    { name: 'Daño 2' },
    { name: 'Daño 3' },
   
  ];

  selectedFolder: Folder | null = null;
  selectedImage: Image | null = null;
  filteredFolders: Folder[] = this.folders;
  damageOptions = [
    { label: 'Ok', value: 'OK' },
    { label: 'Faltante', value: 'FALTANTE' },
    { label: 'Dañado', value: 'DAÑADO' }
  ];
  
  tabla: IPlantillaDaños[][] = [[{ label: 'Izquierdo Frente ', value: 'OK' }, { label: 'Conector De Luz', value: 'OK' }, { label: 'Luz De Placa', value: 'OK' },],
  [{ label: 'Izquierdo Centro ', value: 'OK' }, { label: 'Reflejantes ', value: 'OK' }, { label: 'Porta Llanta', value: 'OK' },],
  [{ label: 'Izquierdo Trasero ', value: 'OK' }, { label: 'Caja Documental ', value: 'OK' }, { label: 'Llanta Extra', value: 'OK' },],
  [{ label: 'Trasero Izquierdo ', value: 'OK' }, { label: 'Manivela De Patines', value: 'OK' }, { label: 'Puerta Izquierda', value: 'OK' },],
  [{ label: 'Trasero Centro ', value: 'OK' }, { label: 'Patin Derecho', value: 'OK' }, { label: 'Puerta Derecha', value: 'OK' },],
  [{ label: 'Trasero Derecho ', value: 'OK' }, { label: 'Patin Izquierdo', value: 'OK' }, { label: 'Empaque De Puertas', value: 'OK' },],
  [{ label: 'Derecho Trasero ', value: 'OK' }, { label: 'Plancha De Patin Der.', value: 'OK' }, { label: 'Bisagras Puerta Izq.', value: 'OK' },],
  [{ label: 'Derecho Centro ', value: 'OK' }, { label: 'Plancha De Patin Izq.', value: 'OK' }, { label: 'Bisagras Puerta Der.', value: 'OK' },],
  [{ label: 'Derecho Frontal  ', value: 'OK' }, { label: 'Bolsas De Aire', value: 'OK' }, { label: 'Gancho Puerta Arriba', value: 'OK' },],
  [{ label: 'Manitas Para Aire', value: 'OK' }, { label: 'Zoquetera Izq.', value: 'OK' }, { label: 'Gancho Puerta Abajo', value: 'OK' },],
  [{ label: 'Líneas De Aire', value: 'OK' }, { label: 'Zoquetera Der.', value: 'OK' }, { label: 'Manivela Puerta Der.', value: 'OK' },],
  [{ label: 'Resorte Manguera', value: 'OK' }, { label: 'Defensa', value: 'OK' }, { label: 'Manivela Puerta Izq.', value: 'OK' },],
  ]

  constructor() {}

  ngOnInit(): void {}

  filterFolders(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredFolders = this.folders.filter(folder => 
      folder.name.toLowerCase().includes(query)
    );
  }

  selectFolder(folder: Folder) {
    this.selectedFolder = folder;
    this.selectedImage = folder.images[0] || null; 
  }

  selectImage(image: Image) {
    this.selectedImage = image;
  }
}
