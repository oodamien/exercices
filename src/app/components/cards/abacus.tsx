/* eslint-disable  no-explicit-any */
// Copyright (C) Thorsten Thormaehlen, Marburg, 2013, All rights reserved
// Contact: www.thormae.de
import { useEffect, useRef, useState } from "react";

// This software is written for educational (non-commercial) purpose.
// There is no warranty or other guarantee of fitness for this software,
// it is provided solely "as is".

class UIElement {
  x: any;
  y: any;
  x2: any;
  y2: any;
  width: any;
  height: any;
  type: any;
  ref: any;
  subref: any;
  slotType: any;

  constructor(x: any, y: any, width: any, height: any, type: any, ref: any) {
    this.x = x;
    this.y = y;
    this.x2 = x + width;
    this.y2 = y + height;
    this.type = type; // 0 = node, 1 = slot, 2 connection
    this.subref = ref;
    this.ref = ref;
  }
}

class Bead {
  position: any;
  value: any;
  active: any;
  uniqueID: any;

  constructor() {
    this.position = [0.0, 0.0];
    this.value = 0;
    this.active = false;
    this.uniqueID = -1;
  }
}

class AbacusCtrl {
  type: any;
  beadLines: any;
  beadPerLine: any;
  beadSep: any;
  beadHeight: any;
  beadSpacing: any;
  beadWidth: any;
  nodes: any;
  value: string;

  constructor(value: any) {
    this.beadLines = value.length;
    this.beadPerLine = 5;
    this.beadSep = 3;
    this.beadHeight = 40;
    this.beadSpacing = 80;
    this.beadWidth = 60;
    this.nodes = new Array();
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
    for (var i = 0; i < vals.length; i++) {
      var v = vals[i];
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

  getBeadPositionX(nodeId: any) {
    return this.nodes[nodeId].position[0];
  }

  getBeadPositionY(nodeId: any): any {
    return this.nodes[nodeId].position[1];
  }

  activated(nodeId: any) {
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
      for (var j = 0; j < this.beadPerLine; j++) {
        var n = line * this.beadPerLine + j;
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
  canvas: any;
  divId: any;
  uiElements: any;
  that: any;
  value: string;

  constructor(parentDivId: any, value: string) {
    this.abacusCtrl = new AbacusCtrl(value);
    this.divId = parentDivId;
    this.uiElements = new Array();
    this.that = this;
    this.value = `${+value}`;
  }

  init() {
    this.abacusCtrl.init();
    this.canvas = document.createElement("canvas");
    const that = this;
    if (!this.canvas)
      console.log("Abacus error: can not create a canvas element");
    this.canvas.id = this.divId + "_Abacus";
    this.canvas.width = this.abacusCtrl.beadLines * this.abacusCtrl.beadSpacing;
    this.canvas.height =
      25 + (this.abacusCtrl.beadPerLine + 2) * this.abacusCtrl.beadHeight;
    if (this.divId && this.divId.children.length == 0) {
      this.divId.appendChild(this.canvas);
    } else {
    }
    this.update();
  }

  drawBead(nodeId: number, ctx: any) {
    const nodePosX = this.abacusCtrl.getBeadPositionX(nodeId);
    const nodePosY = this.abacusCtrl.getBeadPositionY(nodeId);

    let dn: UIElement = new UIElement(
      nodePosX,
      nodePosY + 2,
      this.abacusCtrl.beadWidth,
      this.abacusCtrl.beadHeight - 4,
      0,
      nodeId
    );
    ctx.fillStyle = "oklch(88.2% 0.059 254.128)";
    if (this.abacusCtrl.nodes[nodeId].active) {
      ctx.fillStyle = "oklch(70.7% 0.165 254.624)";
    }
    this.drawRoundRectFilled(ctx, dn.x, dn.y, dn.x2 - dn.x, dn.y2 - dn.y, 12);
    ctx.fillStyle = "rgba(255, 255, 255, 1.0)";
    this.uiElements.push(dn);
  }

  drawBeads(ctx: any) {
    var count = this.abacusCtrl.getBeadsCount();
    for (var i = 0; i < count; i++) {
      this.drawBead(i, ctx);
    }
  }

  update() {
    this.canvas.width = this.canvas.width;
    const ctx = this.canvas.getContext("2d");
    this.uiElements.length = 0;
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
    ctx.lineTo(640, ycalc);
    ctx.stroke();

    ctx.lineWidth = 1;

    // draws all nodes
    this.drawBeads(ctx);
  }

  drawRoundRectFilled(
    ctx: any,
    x: any,
    y: any,
    width: any,
    height: any,
    radius: any
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
}

export default function AbacusGame(props: Props) {
  const [abacus, setAbacus] = useState<any>(null);
  const ref = useRef(null);
  useEffect(() => {
    if (!abacus && ref.current) {
      const abacus = new Abacus(ref.current, props.value);
      setAbacus(abacus);
      abacus.init();
    }
  }, [abacus]);
  return (
    <div className={props?.classNames}>
      <div ref={ref}></div>
    </div>
  );
}
