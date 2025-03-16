import Config from '@common/config';
import { cache } from '@overextended/ox_lib/client';

interface Weapon {
  name: string;
}

onNet("ox_inventory:currentWeapon", (weapon: Weapon) => {
  if (weapon) {
    if (Config.Allowlist.includes(weapon.name) || Config.Allowlist.includes(weapon.name.toUpperCase())) {
      for (const holsters of Config.Holsters) {
        if (holsters.full === GetPedDrawableVariation(cache.ped, 7)) {
          SetPedComponentVariation(cache.ped, 7, holsters.empty, 0, 0);
          return;
        }
      }
    }
  } else {
    for (const holsters of Config.Holsters) {
      if (holsters.empty === GetPedDrawableVariation(cache.ped, 7)) {
        SetPedComponentVariation(cache.ped, 7, holsters.full, 0, 0);
        return;
      }
    }
  }
});
