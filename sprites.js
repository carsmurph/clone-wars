window.SPRITES = {
  drawBackground: function (ctx, width, height, time) {
    ctx.save();

    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#263a72');
    sky.addColorStop(0.48, '#f27b68');
    sky.addColorStop(0.72, '#ffc06d');
    sky.addColorStop(1, '#f8d695');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    const shimmer = Math.sin(time * 0.7) * 3;
    ctx.fillStyle = '#ffe6a0';
    ctx.beginPath();
    ctx.arc(width * 0.76, height * 0.28 + shimmer, Math.max(22, width * 0.075), 0, Math.PI * 2);
    ctx.fill();

    // Dark, simple hills evoke the San Luis Obispo foothills.
    ctx.fillStyle = '#5a4161';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.61);
    ctx.quadraticCurveTo(width * 0.18, height * 0.48, width * 0.38, height * 0.6);
    ctx.quadraticCurveTo(width * 0.57, height * 0.42, width * 0.78, height * 0.58);
    ctx.quadraticCurveTo(width * 0.91, height * 0.5, width, height * 0.57);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // A bright strip of ocean sits below the hills.
    ctx.fillStyle = '#277c91';
    ctx.fillRect(0, height * 0.67, width, height * 0.33);
    ctx.strokeStyle = 'rgba(255, 224, 151, 0.5)';
    ctx.lineWidth = 2;
    for (let row = 0; row < 4; row += 1) {
      const y = height * 0.71 + row * height * 0.055 + Math.sin(time * 0.8 + row) * 2;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.quadraticCurveTo(width * 0.25, y - 3, width * 0.5, y);
      ctx.quadraticCurveTo(width * 0.75, y + 3, width, y - 1);
      ctx.stroke();
    }

    ctx.restore();
  },

  drawGround: function (ctx, width, height, groundHeight, offset) {
    ctx.save();
    const top = height - groundHeight;
    ctx.fillStyle = '#d58b4d';
    ctx.fillRect(0, top, width, groundHeight);
    ctx.fillStyle = '#f2bf67';
    ctx.fillRect(0, top, width, 7);

    ctx.strokeStyle = '#673c3e';
    ctx.lineWidth = 2;
    const tile = 32;
    const shift = ((offset % tile) + tile) % tile;
    for (let x = -shift - tile; x < width + tile; x += tile) {
      ctx.beginPath();
      ctx.moveTo(x, top + 10);
      ctx.lineTo(x + tile * 0.48, height);
      ctx.stroke();
    }
    ctx.restore();
  },

  drawBird: function (ctx, x, y, size, velocity) {
    ctx.save();
    ctx.translate(x, y);
    const tilt = Math.max(-0.28, Math.min(0.42, velocity / 1000));
    ctx.rotate(tilt);
    const s = size / 34;
    ctx.scale(s, s);
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#263044';
    ctx.lineWidth = 2.6;

    // White-and-gray seagull body.
    ctx.fillStyle = '#f7f4e8';
    ctx.beginPath();
    ctx.ellipse(0, 0, 13, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#d6d9df';
    ctx.beginPath();
    ctx.moveTo(-11, -2);
    ctx.quadraticCurveTo(-18, -15, -3, -8);
    ctx.quadraticCurveTo(1, -6, 4, -2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#f7f4e8';
    ctx.beginPath();
    ctx.arc(9, -5, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#f3a746';
    ctx.beginPath();
    ctx.moveTo(15, -5);
    ctx.lineTo(23, -2);
    ctx.lineTo(15, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#263044';
    ctx.beginPath();
    ctx.arc(11, -7, 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },

  drawPipe: function (ctx, x, gapTop, gapBottom, pipeWidth, height) {
    ctx.save();
    const drawPalmObstacle = function (top, bottom, canopyAtBottom) {
      const span = Math.max(0, bottom - top);
      if (span <= 0) return;
      ctx.save();
      ctx.beginPath();
      ctx.rect(x, top, pipeWidth, span);
      ctx.clip();

      const sand = ctx.createLinearGradient(x, 0, x + pipeWidth, 0);
      sand.addColorStop(0, '#d97945');
      sand.addColorStop(0.5, '#efb15b');
      sand.addColorStop(1, '#bd5f45');
      ctx.fillStyle = sand;
      ctx.fillRect(x, top, pipeWidth, span);

      const trunkX = x + pipeWidth * 0.52;
      ctx.strokeStyle = '#3a2d3b';
      ctx.lineWidth = Math.max(2, pipeWidth * 0.055);
      ctx.lineCap = 'round';
      ctx.beginPath();
      if (canopyAtBottom) {
        ctx.moveTo(trunkX, top - 8);
        ctx.quadraticCurveTo(trunkX - pipeWidth * 0.1, top + span * 0.45, trunkX + pipeWidth * 0.03, bottom + 10);
      } else {
        ctx.moveTo(trunkX, bottom + 8);
        ctx.quadraticCurveTo(trunkX + pipeWidth * 0.1, top + span * 0.55, trunkX - pipeWidth * 0.03, top - 10);
      }
      ctx.stroke();

      const crownY = canopyAtBottom ? top + 10 : bottom - 10;
      ctx.strokeStyle = '#28444b';
      ctx.lineWidth = Math.max(2, pipeWidth * 0.06);
      for (let i = -2; i <= 2; i += 1) {
        ctx.beginPath();
        ctx.moveTo(trunkX, crownY);
        ctx.quadraticCurveTo(trunkX + i * pipeWidth * 0.24, crownY - (canopyAtBottom ? 8 : -8), trunkX + i * pipeWidth * 0.38, crownY - (canopyAtBottom ? 15 : -15));
        ctx.stroke();
      }
      ctx.restore();

      ctx.strokeStyle = '#3a2d3b';
      ctx.lineWidth = 3;
      ctx.strokeRect(x + 1.5, top + 1.5, pipeWidth - 3, span - 3);
    };

    drawPalmObstacle(0, gapTop, false);
    drawPalmObstacle(gapBottom, height, true);
    ctx.restore();
  }
};
