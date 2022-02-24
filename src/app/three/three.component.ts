import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import * as THREE from 'three';
import { PerspectiveCamera } from 'three';

@Component({
  selector: 'app-three',
  templateUrl: './three.component.html',
  styleUrls: ['./three.component.scss']
})
export class ThreeComponent implements OnInit {

  readonly camera = new THREE.OrthographicCamera( innerWidth / - 2, innerWidth / 2, innerHeight / 2, innerHeight / - 2, 1, 1000 );
  readonly scene = new THREE.Scene();
  readonly geometry = new THREE.PlaneGeometry(100, 100);
  readonly material = new THREE.MeshNormalMaterial();
  readonly mesh = new THREE.Mesh(this.geometry, this.material);
  readonly renderer = new THREE.WebGLRenderer({antialias: true});

  constructor(private elementRef: ElementRef, private renderer2: Renderer2) {
  }

  ngOnInit(): void {
    this.camera.position.z = 1;
    this.scene.add(this.mesh);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setAnimationLoop(this.animation.bind(this));
    this.renderer2.appendChild(this.elementRef.nativeElement, this.renderer.domElement);
  }

  animation(time: number): void {
    this.renderer.render(this.scene, this.camera);
  }
}
