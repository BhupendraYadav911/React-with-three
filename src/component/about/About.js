// Zoom image in/out on mouse point using wheel with transform origin center. Need help in calculation

import React, { useEffect } from "react";

export default function App() {
  useEffect(() => {
    const img = document.getElementById("image");
    let mouseX;
    let mouseY;
    let mouseTX;
    let mouseTY;
    let startX = 0;
    let startY = 0;
    let panning = false;

    const ts = {
      scale: 1,
      rotate: 0,
      translate: {
        x: 0,
        y: 0
      }
    };

    img.onwheel = function (event) {
      event.preventDefault();
      let xs = (event.clientX - ts.translate.x) / ts.scale;
      let ys = (event.clientY - ts.translate.y) / ts.scale;
      let delta = event.wheelDelta ? event.wheelDelta : -event.deltaY;
      ts.scale = delta > 0 ? ts.scale * 1.2 : ts.scale / 1.2;
      ts.translate.x = event.clientX - xs * ts.scale;
      ts.translate.y = event.clientY - ys * ts.scale;
      setTransform();
    };

    img.onmousedown = function (event) {
      event.preventDefault();
      panning = true;
      img.style.cursor = "grabbing";
      mouseX = event.clientX;
      mouseY = event.clientY;
      mouseTX = ts.translate.x;
      mouseTY = ts.translate.y;
    };

    img.onmouseup = function (event) {
      panning = false;
      img.style.cursor = "grab";
    };

    img.onmousemove = function (event) {
      event.preventDefault();
      const x = event.clientX;
      const y = event.clientY;
      let pointX = x - startX;
      let pointY = y - startY;
      if (!panning) {
        return;
      }
      ts.translate.x = mouseTX + (x - mouseX);
      ts.translate.y = mouseTY + (y - mouseY);
      setTransform();
    };

    function setTransform() {
      const steps = `translate(${ts.translate.x}px,${ts.translate.y}px) scale(${ts.scale})`;
      img.style.transform = steps;
    }
  }, []);
  return (
    <div class="container">
      <div class="stage">
        <img
          id="image"
          src="showroom.jpg"
        />
      </div>
      
    </div>
  );
}
