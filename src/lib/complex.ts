import { create, all, type Complex } from "mathjs";

const math = create(all, {});

export type C = { re: number; im: number };

export const toComplex = (c: C): Complex => math.complex(c.re, c.im) as Complex;

export const formatC = (c: C): string => {
  const re = Number(c.re.toFixed(4).replace(/\.?0+$/, ""));
  const im = Number(c.im.toFixed(4).replace(/\.?0+$/, ""));
  if (im === 0) return `${re}`;
  if (re === 0) return im === 1 ? "i" : im === -1 ? "-i" : `${im}i`;
  const sign = im >= 0 ? "+" : "−";
  const absIm = Math.abs(im);
  const imStr = absIm === 1 ? "i" : `${absIm}i`;
  return `${re} ${sign} ${imStr}`;
};

export type Op = "add" | "sub" | "mul";

export const opLabel: Record<Op, string> = {
  add: "Suma",
  sub: "Resta",
  mul: "Multiplicación",
};

export const opSymbol: Record<Op, string> = {
  add: "+",
  sub: "−",
  mul: "×",
};

export const computeOp = (a: C, b: C, op: Op): C => {
  const A = toComplex(a);
  const B = toComplex(b);
  let r: Complex;
  switch (op) {
    case "add": r = math.add(A, B) as Complex; break;
    case "sub": r = math.subtract(A, B) as Complex; break;
    case "mul": r = math.multiply(A, B) as Complex; break;
  }
  return { re: r.re, im: r.im };
};

const fmtNum = (n: number) => {
  const v = Number(n.toFixed(4).replace(/\.?0+$/, ""));
  return v < 0 ? `(${v})` : `${v}`;
};

export const buildSteps = (a: C, b: C, op: Op): string[] => {
  const { re: ar, im: ai } = a;
  const { re: br, im: bi } = b;
  if (op === "add") {
    return [
      `(${formatC(a)}) + (${formatC(b)})`,
      `= (${fmtNum(ar)} + ${fmtNum(br)}) + (${fmtNum(ai)} + ${fmtNum(bi)})i`,
      `= ${fmtNum(ar + br)} + ${fmtNum(ai + bi)}i`,
      `= ${formatC({ re: ar + br, im: ai + bi })}`,
    ];
  }
  if (op === "sub") {
    return [
      `(${formatC(a)}) − (${formatC(b)})`,
      `= (${fmtNum(ar)} − ${fmtNum(br)}) + (${fmtNum(ai)} − ${fmtNum(bi)})i`,
      `= ${fmtNum(ar - br)} + ${fmtNum(ai - bi)}i`,
      `= ${formatC({ re: ar - br, im: ai - bi })}`,
    ];
  }
  return [
    `(${formatC(a)}) · (${formatC(b)})`,
    `= ${fmtNum(ar)}·${fmtNum(br)} + ${fmtNum(ar)}·${fmtNum(bi)}i + ${fmtNum(ai)}·${fmtNum(br)}i + ${fmtNum(ai)}·${fmtNum(bi)}i²`,
    `= ${fmtNum(ar * br)} + ${fmtNum(ar * bi)}i + ${fmtNum(ai * br)}i − ${fmtNum(ai * bi)}   [usando i² = −1]`,
    `= (${fmtNum(ar * br)} − ${fmtNum(ai * bi)}) + (${fmtNum(ar * bi)} + ${fmtNum(ai * br)})i`,
    `= ${fmtNum(ar * br - ai * bi)} + ${fmtNum(ar * bi + ai * br)}i`,
    `= ${formatC({ re: ar * br - ai * bi, im: ar * bi + ai * br })}`,
  ];
};
