import assert from "node:assert/strict";
import test from "node:test";

import { TOOLTIP_MAX_WIDTH, TOOLTIP_MARGIN, clampTooltipLeft, tooltipMaxWidth } from "../src/lib/tooltip-place.ts";

/**
 * Une infobulle ancrée à un caviardage près du bord droit sortait de l'écran :
 * le survol déclenchait alors un défilement horizontal de la page. Le recalage
 * garde l'infobulle entièrement visible, sans jamais la coller au bord.
 */

test("l'infobulle reste ancrée sur son hôte quand elle tient", () => {
  assert.equal(clampTooltipLeft(400, 300, 1280), 400);
  assert.equal(clampTooltipLeft(0, 200, 1280), TOOLTIP_MARGIN, "jamais collée au bord gauche");
});

test("une infobulle large sur un hôte proche du bord droit est ramenée dans l'écran", () => {
  const left = clampTooltipLeft(1100, 544, 1280);
  assert.equal(left, 1280 - TOOLTIP_MARGIN - 544);
  assert.ok(left + 544 <= 1280 - TOOLTIP_MARGIN, "le bord droit doit rester dans la marge");
});

test("sur téléphone, la largeur est bornée au viewport", () => {
  assert.equal(tooltipMaxWidth(390), 390 - TOOLTIP_MARGIN * 2);
  assert.equal(tooltipMaxWidth(1280), TOOLTIP_MAX_WIDTH);
  const left = clampTooltipLeft(380, tooltipMaxWidth(390), 390);
  assert.equal(left, TOOLTIP_MARGIN);
  assert.ok(left + tooltipMaxWidth(390) <= 390 - TOOLTIP_MARGIN);
});

test("le recalage ne sort jamais l'infobulle par la gauche non plus", () => {
  for (const viewport of [320, 390, 768, 1024, 1440]) {
    for (const hostLeft of [0, 12, 120, 380, 700, 1100, viewport]) {
      const width = tooltipMaxWidth(viewport);
      const left = clampTooltipLeft(hostLeft, width, viewport);
      assert.ok(left >= TOOLTIP_MARGIN, `${viewport}/${hostLeft} : bord gauche`);
      assert.ok(left + width <= viewport - TOOLTIP_MARGIN, `${viewport}/${hostLeft} : bord droit`);
    }
  }
});
