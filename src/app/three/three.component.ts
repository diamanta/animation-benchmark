import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-three',
  templateUrl: './three.component.html',
  styleUrls: ['./three.component.scss']
})
export class ThreeComponent implements OnInit {

  readonly camera = new THREE.OrthographicCamera(innerWidth / -2, innerWidth / 2, innerHeight / 2, innerHeight / -2, 1, 1000);
  readonly scene = new THREE.Scene();
  readonly renderer = new THREE.WebGLRenderer({antialias: true});

  constructor(private elementRef: ElementRef, private renderer2: Renderer2) {
  }

  ngOnInit(): void {
    this.camera.position.z = 1;
    for (let i = 0; i < 5; i++) {
      this.scene.add(ThreeComponent.meshBuilder(i));
    }
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setAnimationLoop(this.animation.bind(this));
    this.renderer2.appendChild(this.elementRef.nativeElement, this.renderer.domElement);
  }

  private animation(time: number): void {
    this.renderer.render(this.scene, this.camera);
  }

  private static meshBuilder(offset = 0): THREE.Mesh {
    const dim = 200;
    const geometry = new THREE.PlaneGeometry(dim, dim * 2);
    geometry.translate((dim + 50) * offset , dim, 0);
    return new THREE.Mesh(geometry);
  }
}
