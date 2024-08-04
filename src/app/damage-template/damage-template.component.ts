import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
  HostListener,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { FormsModule } from '@angular/forms';
import { fabric } from 'fabric';

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { ListboxModule } from 'primeng/listbox';

@Component({
  selector: 'app-damage-template',
  standalone: true,
  imports: [ButtonModule, ChipModule, ListboxModule, FormsModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './damage-template.component.html',
  styleUrls: ['./damage-template.component.css'],
})
export class DamageTemplateComponent implements OnInit, AfterViewInit {
  tipos: { value: string; label: string }[] = [
    { value: 'A', label: 'A: Abollado' },
    { value: 'F', label: 'F: Faltante' },
    { value: 'D', label: 'D: Dañado' },
    { value: 'R', label: 'R: Rayones' },
    { value: 'I', label: 'I: Inoperante' },
    { value: 'C', label: 'C: Cortado' },
    { value: 'H', label: 'H: Hoyo' },
    { value: 'Q', label: 'Q: Quebrado' },
  ];

  public canvas: fabric.Canvas | null = null;
  private deleteButtons: Map<fabric.Object, HTMLButtonElement> = new Map();
  public showButtons: boolean = false;

  @ViewChild('canvas2', { static: false })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  @ViewChild('buttonsContainer', { static: false })
  buttonsContainerRef!: ElementRef<HTMLDivElement>;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.configureCanvas();
  }
  toggleButtons() {
    this.showButtons = !this.showButtons;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.showButtons && this.buttonsContainerRef) {
      const target = event.target as HTMLElement;
      if (!this.buttonsContainerRef.nativeElement.contains(target)) {
        this.showButtons = false;
      }
    }
  }

  configureCanvas(): void {
    const canvasElement = this.canvasRef.nativeElement;
    const containerElement = canvasElement.parentElement;
    if (containerElement) {
      canvasElement.width = containerElement.clientWidth;
      canvasElement.height = containerElement.clientHeight;
    }

    if (!this.canvas) this.canvas = new fabric.Canvas(canvasElement);
    this.cdRef.detectChanges();

    const img = new Image();
    img.src = 'assets/images/intercambio.png'; 
    img.onload = () => {
      const imgInstance = new fabric.Image(img, {
        left: 0,
        top: 0,
        scaleX: canvasElement.width / img.width,
        scaleY: canvasElement.height / img.height,
        selectable: false,
      });
      this.canvas!.setWidth(canvasElement.width);
      this.canvas!.setHeight(canvasElement.height);
      this.canvas!.setBackgroundImage(
        imgInstance,
        this.canvas!.renderAll.bind(this.canvas)
      );
    };

    this.canvas.on('object:moving', (e) => {
      const obj = e.target;
      this.updateDeleteButtonPosition(obj!);
    });

    this.canvas.on('object:scaling', (e) => {
      const obj = e.target;
      this.updateDeleteButtonPosition(obj!);
    });

    this.canvas.on('object:rotating', (e) => {
      const obj = e.target;
      this.updateDeleteButtonPosition(obj!);
    });

    this.canvas.on('selection:updated', (e) => {
      const obj = e.selected![0];
      this.hideAllDeleteButtons();
      this.updateDeleteButtonPosition(obj);
    });

    this.canvas.on('selection:created', (e) => {
      const obj = e.selected![0];
      this.hideAllDeleteButtons();
      this.updateDeleteButtonPosition(obj);
    });

    this.canvas.on('selection:cleared', (e) => {
      this.hideAllDeleteButtons();
    });
  }

  addValue(value: string) {
    const text = new fabric.Text(`  ${value}  `, {
      left: 100,
      top: 100,
      fontSize: 40,
      fill: 'blue', 
      fontFamily: 'Arial',
      selectable: true,
    });

    this.canvas!.add(text);
    this.addDeleteButton(text);
  }

  addDeleteButton(text: fabric.Text) {
    const button = document.createElement('button');
    button.innerHTML = 'X';
    button.classList.add('delete-button');
    button.style.position = 'absolute';
    button.style.backgroundColor = 'red';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '50%';
    button.style.width = '20px';
    button.style.height = '20px';
    button.style.cursor = 'pointer';
    button.style.display = 'none'; 
    document.body.appendChild(button);

    button.addEventListener('click', () => {
      this.canvas!.remove(text);
      document.body.removeChild(button);
      this.deleteButtons.delete(text);
    });

    this.deleteButtons.set(text, button);
    this.updateDeleteButtonPosition(text);
  }

  updateDeleteButtonPosition(obj: fabric.Object) {
    const button = this.deleteButtons.get(obj);
    if (button) {
      button.style.display = 'block'; 
      button.style.left = `${obj.left! + obj.width! * obj.scaleX! + 5}px`;
      button.style.top = `${obj.top! + 95}px`; 
    }
  }

  hideAllDeleteButtons() {
    this.deleteButtons.forEach((button) => {
      button.style.display = 'none';
    });
  }

  deleteSelected() {
    if (this.canvas) {
      const activeObject = this.canvas.getActiveObject();
      if (activeObject) {
        const button = this.deleteButtons.get(activeObject);
        if (button) {
          document.body.removeChild(button);
          this.deleteButtons.delete(activeObject);
        }
        this.canvas.remove(activeObject);
      }
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (
      event.key === 'Delete' ||
      event.key === 'Del' ||
      event.key === 'Backspace'
    ) {
      this.deleteSelected();
    }
  }
}
