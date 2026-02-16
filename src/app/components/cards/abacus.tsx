// Copyright (C) Thorsten Thormaehlen, Marburg, 2013, All rights reserved
// Contact: www.thormae.de
import { useEffect, useRef } from "react";
import { BeadColorScheme } from "@/app/types";

// This software is written for educational (non-commercial) purpose.
// There is no warranty or other guarantee of fitness for this software,
// it is provided solely "as is".

const BEAD_COLORS: Record<BeadColorScheme, { inactive: string; active: string }> = {
  default: {
    inactive: "oklch(88.2% 0.059 254.128)",
    active: "oklch(70.7% 0.165 254.624)",
  },
  standard: {
    inactive: "oklch(78% 0.08 230)",
    active: "oklch(82% 0.16 90)",
  },
};

class UIElement {
  x: number;
  y: number;
  x2: number;
  y2: number;
  width: number;
  height: number;
  type: number;
  ref: number;
  subref: number;
  slotType: number | undefined;

  constructor(x: number, y: number, width: number, height: number, type: number, ref: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.x2 = x + width;
    this.y2 = y + height;
    this.type = type; // 0 = node, 1 = slot, 2 connection
    this.subref = ref;
    this.ref = ref;
  }
}

class Bead {
  position: [number, number];
  value: number;
  active: boolean;
  uniqueID: number;

  constructor() {
    this.position = [0.0, 0.0];
    this.value = 0;
    this.active = false;
    this.uniqueID = -1;
  }
}

class AbacusCtrl {
  type: number | undefined;
  beadLines: number;
  beadPerLine: number;
  beadSep: number;
  beadHeight: number;
  beadSpacing: number;
  beadWidth: number;
  nodes: Bead[];
  value: string;

  constructor(value: string) {
    this.beadLines = value.length;
    this.beadPerLine = 5;
    this.beadSep = 3;
    this.beadHeight = 40;
    this.beadSpacing = 80;
    this.beadWidth = 60;
    this.nodes = [];
    this.value = value;
  }

  init() {
    this.nodes.length = 0;
    let id = 0;
    let w = 580;
    switch (this.beadLines) {
      case 1:
        w = 10;
        break;
      case 2:
        w = 90;
        break;
      case 3:
        w = 170;
        break;
      case 4:
        w = 250;
        break;
      case 5:
        w = 330;
        break;
      case 6:
        w = 410;
        break;
      case 7:
        w = 490;
        break;
    }
    for (let i = 0; i < this.beadLines; i++) {
      for (let j = 0; j < this.beadPerLine; j++) {
        const bead = new Bead();
        bead.position[0] = w - i * this.beadSpacing;
        bead.position[1] =
          40 + this.beadPerLine * this.beadHeight - j * this.beadHeight + 20;
        bead.value = 1;
        if (j > this.beadSep) {
          bead.position[1] =
            40 +
            this.beadPerLine * this.beadHeight -
            (j * this.beadHeight + 2 * this.beadHeight);
          bead.value = 5;
        }
        bead.uniqueID = id;
        this.nodes.push(bead);
        id++;
      }
    }
    // this.setValue("495");
    this.updateValues();
  }

  updateValues() {
    const vals = this.value.split("").reverse();
    for (let i = 0; i < vals.length; i++) {
      const v = vals[i];
      switch (v) {
        case "1":
          this.activated(this.nodes[(i + 1) * 5 - 2].uniqueID);
          break;
        case "2":
          this.activated(this.nodes[(i + 1) * 5 - 3].uniqueID);
          break;
        case "3":
          this.activated(this.nodes[(i + 1) * 5 - 4].uniqueID);
          break;
        case "4":
          this.activated(this.nodes[(i + 1) * 5 - 5].uniqueID);
          break;
        case "5":
          this.activated(this.nodes[(i + 1) * 5 - 1].uniqueID);
          break;
        case "6":
          this.activated(this.nodes[(i + 1) * 5 - 1].uniqueID);
          this.activated(this.nodes[(i + 1) * 5 - 2].uniqueID);
          break;
        case "7":
          this.activated(this.nodes[(i + 1) * 5 - 1].uniqueID);
          this.activated(this.nodes[(i + 1) * 5 - 3].uniqueID);
          break;
        case "8":
          this.activated(this.nodes[(i + 1) * 5 - 1].uniqueID);
          this.activated(this.nodes[(i + 1) * 5 - 4].uniqueID);
          break;
        case "9":
          this.activated(this.nodes[(i + 1) * 5 - 1].uniqueID);
          this.activated(this.nodes[(i + 1) * 5 - 5].uniqueID);
          break;
      }
    }
  }

  getBeadsCount() {
    return this.nodes.length;
  }

  getBeadPositionX(nodeId: number) {
    return this.nodes[nodeId].position[0];
  }

  getBeadPositionY(nodeId: number): number {
    return this.nodes[nodeId].position[1];
  }

  activated(nodeId: number) {
    const line = Math.floor(nodeId / this.beadPerLine);
    const beadInLine = nodeId - line * this.beadPerLine;

    const active = this.nodes[nodeId].active;
    this.nodes[nodeId].active = !active;

    let dir = 1;
    if (beadInLine > this.beadSep) dir = -1;

    let offset = dir * -1 * this.beadHeight;
    if (active) {
      offset = dir * this.beadHeight;
    }
    this.nodes[nodeId].position[1] += offset;

    if (beadInLine <= this.beadSep) {
      for (let j = 0; j < this.beadPerLine; j++) {
        const n = line * this.beadPerLine + j;
        if (j <= this.beadSep && j !== beadInLine) {
          if ((!active && j > beadInLine) || (active && j < beadInLine)) {
            if (this.nodes[n].active === active) {
              this.nodes[n].position[1] += offset;
              this.nodes[n].active = !this.nodes[n].active;
            }
          }
        }
      }
    } else {
      for (let j = 0; j < this.beadPerLine; j++) {
        const n = line * this.beadPerLine + j;
        if (j > this.beadSep && j !== beadInLine) {
          if ((!active && j < beadInLine) || (active && j > beadInLine)) {
            if (this.nodes[n].active === active) {
              this.nodes[n].position[1] += offset;
              this.nodes[n].active = !this.nodes[n].active;
            }
          }
        }
      }
    }
  }
}

class Abacus {
  abacusCtrl: AbacusCtrl;
  canvas: HTMLCanvasElement | null;
  divId: HTMLElement | null;
  uiElements: UIElement[];
  value: string;
  rotation: number;
  colorScheme: BeadColorScheme;

  constructor(parentDivId: HTMLElement | null, value: string, rotation: number = 0, colorScheme: BeadColorScheme = "default") {
    this.abacusCtrl = new AbacusCtrl(value);
    this.divId = parentDivId;
    this.uiElements = [];
    this.canvas = null;
    this.value = `${+value}`;
    this.rotation = rotation;
    this.colorScheme = colorScheme;
  }

  init() {
    this.abacusCtrl.init();
    this.canvas = document.createElement("canvas");
    if (!this.canvas) {
      console.error("Abacus error: can not create a canvas element");
      return;
    }
    this.canvas.id = (this.divId?.id ?? "") + "_Abacus";

    const baseWidth = this.abacusCtrl.beadLines * this.abacusCtrl.beadSpacing;
    const baseHeight =
      25 + (this.abacusCtrl.beadPerLine + 2) * this.abacusCtrl.beadHeight;

    if (this.rotation !== 0) {
      const radians = (this.rotation * Math.PI) / 180;
      const cos = Math.abs(Math.cos(radians));
      const sin = Math.abs(Math.sin(radians));
      const newWidth = Math.ceil(baseWidth * cos + baseHeight * sin);
      const newHeight = Math.ceil(baseWidth * sin + baseHeight * cos);
      this.canvas.width = newWidth;
      this.canvas.height = newHeight;
    } else {
      this.canvas.width = baseWidth;
      this.canvas.height = baseHeight;
    }

    if (this.divId) {
      this.divId.appendChild(this.canvas);
    }
    this.update();
  }

  drawBead(nodeId: number, ctx: CanvasRenderingContext2D) {
    const nodePosX = this.abacusCtrl.getBeadPositionX(nodeId);
    const nodePosY = this.abacusCtrl.getBeadPositionY(nodeId);

    const dn: UIElement = new UIElement(
      nodePosX,
      nodePosY + 2,
      this.abacusCtrl.beadWidth,
      this.abacusCtrl.beadHeight - 4,
      0,
      nodeId
    );
    const colors = BEAD_COLORS[this.colorScheme];
    ctx.fillStyle = colors.inactive;
    if (this.abacusCtrl.nodes[nodeId].active) {
      ctx.fillStyle = colors.active;
    }
    this.drawRoundRectFilled(ctx, dn.x, dn.y, dn.x2 - dn.x, dn.y2 - dn.y, 12);
    ctx.fillStyle = "rgba(255, 255, 255, 1.0)";
    this.uiElements.push(dn);
  }

  drawBeads(ctx: CanvasRenderingContext2D) {
    const count = this.abacusCtrl.getBeadsCount();
    for (let i = 0; i < count; i++) {
      this.drawBead(i, ctx);
    }
  }

  update() {
    if (!this.canvas) return;
    const ctx = this.canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas properly
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.uiElements.length = 0;

    ctx.save();

    if (this.rotation !== 0) {
      const cx = this.canvas.width / 2;
      const cy = this.canvas.height / 2;
      ctx.translate(cx, cy);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.translate(-cx, -cy);

      // Offset drawing origin so abacus is centered in the larger canvas
      const baseWidth = this.abacusCtrl.beadLines * this.abacusCtrl.beadSpacing;
      const baseHeight =
        25 + (this.abacusCtrl.beadPerLine + 2) * this.abacusCtrl.beadHeight;
      const offsetX = (this.canvas.width - baseWidth) / 2;
      const offsetY = (this.canvas.height - baseHeight) / 2;
      ctx.translate(offsetX, offsetY);
    }

    ctx.strokeStyle = "#888888";
    // draw frame
    ctx.lineWidth = 1;
    for (let i = 0; i < this.abacusCtrl.beadLines; i++) {
      const x =
        -40 +
        this.abacusCtrl.beadLines * this.abacusCtrl.beadSpacing -
        i * this.abacusCtrl.beadSpacing;
      const y =
        50 + (this.abacusCtrl.beadPerLine + 2) * this.abacusCtrl.beadHeight;
      ctx.beginPath();
      ctx.setLineDash([2, 4]);
      ctx.moveTo(x, 0);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    const ycalc =
      10 +
      (this.abacusCtrl.beadPerLine - this.abacusCtrl.beadSep) *
        this.abacusCtrl.beadHeight;
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.moveTo(0, ycalc);
    ctx.lineTo(this.abacusCtrl.beadLines * this.abacusCtrl.beadSpacing, ycalc);
    ctx.stroke();

    ctx.lineWidth = 1;

    // draws all nodes
    this.drawBeads(ctx);

    ctx.restore();
  }

  drawRoundRectFilled(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ) {
    const lineWidthBackup = ctx.lineWidth;
    const strokeStyleBackup = ctx.strokeStyle;
    ctx.strokeStyle = ctx.fillStyle;
    ctx.lineJoin = "round";
    ctx.lineWidth = radius;
    ctx.strokeRect(
      x + radius / 2,
      y + radius / 2,
      width - radius,
      height - radius
    );
    ctx.fillRect(
      x + radius / 2,
      y + radius / 2,
      width - radius,
      height - radius
    );
    ctx.lineWidth = lineWidthBackup;
    ctx.strokeStyle = strokeStyleBackup;
  }
}

interface Props {
  value: string;
  classNames?: string;
  rotation?: number;
  colorScheme?: BeadColorScheme;
}

export default function AbacusGame(props: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = "";  // clear previous canvas
      const ab = new Abacus(ref.current, props.value, props.rotation ?? 0, props.colorScheme ?? "default");
      ab.init();
    }
  }, [props.value, props.rotation, props.colorScheme]);
  return (
    <div className={props?.classNames}>
      <div ref={ref}></div>
    </div>
  );
}
