"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function disposeHierarchy(root: THREE.Object3D) {
  root.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.geometry.dispose();
      const mat = child.material;
      if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
      else mat.dispose();
    }
  });
}

export type Scene3DProps = {
  className?: string;
  minHeight?: number;
  floorCount?: number;
  selectedFloor?: number;
  onFloorSelect?: (floor: number) => void;
  overlayHint?: string;
};

export function Scene3D({
  className = "",
  minHeight = 360,
  floorCount = 4,
  selectedFloor = 1,
  onFloorSelect,
  overlayHint = "DRAG TO SPIN · 3D VIEW",
}: Scene3DProps) {
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglFailed, setWebglFailed] = useState(false);
  const floorsRef = useRef<THREE.Mesh[]>([]);
  const selectedRef = useRef(selectedFloor);
  const onSelectRef = useRef(onFloorSelect);

  selectedRef.current = selectedFloor;
  onSelectRef.current = onFloorSelect;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const w = mount.clientWidth;
    const h = mount.clientHeight || minHeight;
    const floors = Math.max(1, Math.min(8, floorCount));

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1e2936);
    scene.fog = new THREE.Fog(0x1e2936, 12, 35);

    const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100);
    const orbit = { theta: 0.65, phi: 0.55, radius: 9 };
    const target = new THREE.Vector3(0, floors * 0.22, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true });
    } catch {
      setWebglFailed(true);
      return;
    }
    if (!renderer.getContext()) { setWebglFailed(true); return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0x94a3b8, 0.35));
    const key = new THREE.DirectionalLight(0xfff7ed, 1.2);
    key.position.set(6, 10, 4);
    scene.add(key);
    const accent = new THREE.PointLight(0xf59e0b, 1.5, 30);
    accent.position.set(-4, 3, -3);
    scene.add(accent);

    const grid = new THREE.GridHelper(14, 28, 0xf59e0b, 0x334155);
    grid.position.y = -0.01;
    scene.add(grid);

    const building = new THREE.Group();
    scene.add(building);

    const floorMeshes: THREE.Mesh[] = [];
    const floorH = 0.45;
    const floorW = 2.2;
    const floorD = 1.6;

    for (let i = 0; i < floors; i++) {
      const y = i * floorH;
      const isSel = i + 1 === selectedRef.current;
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(floorW, floorH * 0.92, floorD),
        new THREE.MeshStandardMaterial({
          color: isSel ? 0xfbbf24 : 0x64748b,
          metalness: 0.15,
          roughness: 0.65,
        })
      );
      body.position.y = y + floorH * 0.46;
      body.userData.floor = i + 1;
      building.add(body);
      floorMeshes.push(body);

      const wire = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(floorW, floorH * 0.92, floorD)),
        new THREE.LineBasicMaterial({ color: 0xe2e8f0, transparent: true, opacity: 0.85 })
      );
      wire.position.copy(body.position);
      building.add(wire);
    }

    const roof = new THREE.Mesh(
      new THREE.BoxGeometry(floorW + 0.1, 0.08, floorD + 0.1),
      new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8 })
    );
    roof.position.y = floors * floorH + 0.04;
    building.add(roof);

    floorsRef.current = floorMeshes;

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let downX = 0;
    let downY = 0;
    let orbitVel = 0;

    const updateCamera = () => {
      const { theta, phi, radius } = orbit;
      camera.position.set(
        target.x + radius * Math.sin(phi) * Math.sin(theta),
        target.y + radius * Math.cos(phi),
        target.z + radius * Math.sin(phi) * Math.cos(theta)
      );
      camera.lookAt(target);
    };
    updateCamera();

    const highlightFloor = (floor: number) => {
      floorMeshes.forEach((mesh, idx) => {
        const mat = mesh.material as THREE.MeshStandardMaterial;
        const sel = idx + 1 === floor;
        mat.color.setHex(sel ? 0xfbbf24 : 0x64748b);
        mat.emissive.setHex(sel ? 0x78350f : 0x000000);
        mat.emissiveIntensity = sel ? 0.25 : 0;
      });
    };
    highlightFloor(selectedRef.current);

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      downX = e.clientX;
      downY = e.clientY;
      lastX = e.clientX;
      lastY = e.clientY;
      orbitVel = 0;
      mount.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      orbit.theta += dx * 0.008;
      orbit.phi = Math.max(0.25, Math.min(1.2, orbit.phi + dy * 0.006));
      orbitVel = dx * 0.002;
      updateCamera();
    };
    const onPointerUp = (e: PointerEvent) => {
      if (dragging) {
        const rect = mount.getBoundingClientRect();
        pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        const moved = Math.abs(e.clientX - downX) > 6 || Math.abs(e.clientY - downY) > 6;
        if (!moved) {
          raycaster.setFromCamera(pointer, camera);
          const hits = raycaster.intersectObjects(floorMeshes, false);
          if (hits[0]?.object.userData.floor) {
            const f = hits[0].object.userData.floor as number;
            highlightFloor(f);
            onSelectRef.current?.(f);
          }
        }
      }
      dragging = false;
      try {
        mount.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    };

    mount.addEventListener("pointerdown", onPointerDown);
    mount.addEventListener("pointermove", onPointerMove);
    mount.addEventListener("pointerup", onPointerUp);
    mount.addEventListener("pointerleave", onPointerUp);

    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      if (!dragging) {
        orbit.theta += 0.003 + orbitVel;
        orbitVel *= 0.92;
        updateCamera();
      }
      renderer.render(scene, camera);
    };
    animate();

    const ro = new ResizeObserver(() => {
      const nw = mount.clientWidth;
      const nh = mount.clientHeight || minHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    });
    ro.observe(mount);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      mount.removeEventListener("pointerdown", onPointerDown);
      mount.removeEventListener("pointermove", onPointerMove);
      mount.removeEventListener("pointerup", onPointerUp);
      mount.removeEventListener("pointerleave", onPointerUp);
      disposeHierarchy(building);
      grid.geometry.dispose();
      (grid.material as THREE.Material).dispose();
      scene.fog = null;
      renderer.dispose();
      floorsRef.current = [];
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [floorCount, minHeight]);

  useEffect(() => {
    const floor = selectedFloor;
    floorsRef.current.forEach((mesh, idx) => {
      const mat = mesh.material as THREE.MeshStandardMaterial;
      const sel = idx + 1 === floor;
      mat.color.setHex(sel ? 0xfbbf24 : 0x64748b);
      mat.emissive.setHex(sel ? 0x78350f : 0x000000);
      mat.emissiveIntensity = sel ? 0.25 : 0;
    });
  }, [selectedFloor]);

  
  if (webglFailed) {
    return (
      <div className={`relative flex items-center justify-center overflow-hidden border border-current/10 bg-black/5 ${className}`} style={{ minHeight: 320 }} role="img" aria-label="3D preview unavailable — showing static fallback">
        <div className="p-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] opacity-70">3D preview</p>
          <p className="mt-2 text-sm opacity-60">Interactive view unavailable on this device. Browse the catalog instead.</p>
        </div>
      </div>
    );
  }

return (
    <div className={`relative overflow-hidden border-4 border-brand-steel bg-brand-steel ${className}`} role="img" aria-label="Interactive 3D product viewer. Drag to spin.">
      <div ref={mountRef} className="w-full touch-none" style={{ minHeight }} />
      <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center">
        <span className="bg-brand-steel/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-brand-amber">
          {overlayHint}
        </span>
      </div>
    </div>
  );
}
