const speeds = [25, 30, 22]; // Velocidades en milisegundos por pixel por cada track

function preloadImages(container, callback) {
  const images = container.querySelectorAll('img');
  let loaded = 0;
  const total = images.length;

  if (total === 0) return callback();

  images.forEach(img => {
    if (img.complete) {
      loaded++;
      if (loaded === total) callback();
    } else {
      img.onload = img.onerror = () => {
        loaded++;
        if (loaded === total) callback();
      };
    }
  });
}

document.querySelectorAll('.carousel-track').forEach((track, index) => {
  const speed = speeds[index]; // velocidad individual para este track
  const inner = track.querySelector('.carousel-inner');
  const totalHeight = (Math.round(inner.offsetHeight))/2;

  preloadImages(inner, () => {
    let start = null;

    function animateFrame(timestamp) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const pixelsPerMs = 1 / speed;
      const yOffset = (elapsed * pixelsPerMs) % totalHeight;

      inner.style.transform = `translate3d(0, -${yOffset}px, 0)`;
      requestAnimationFrame(animateFrame);
    }

    requestAnimationFrame(animateFrame);
  });
});

