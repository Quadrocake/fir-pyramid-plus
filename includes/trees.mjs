const pyramidDefs = {}
pyramidDefs.fmat = [
  [['SoldierSupplies', 200], ['Cloth', 1500]],
  [['RifleLightW,RifleW', 100], ['RifleAmmo', 200], ['Bandages', 200]],
  [['ATGrenadeW,StickyBomb', 60], ['GreenAsh', 100], ['FirstAidKit', 30], ['TraumaKit', 30], ['BloodPlasma', 150], ['MedicUniformW', 30]],
  [['HEGrenade', 80], ['GasMask', 60], ['GasMaskFilter', 100], ['SMGW', 60], ['SMGAmmo', 160], ['GrenadeW', 80], ['WorkWrench', 20], ['SnowUniformW', 20]],
  [['RpgW,RPGTW', 15], ['RpgAmmo', 75], ['ATRPGW,ATRifleW', 15], ['ATRPGIndirectAmmo,ATRifleAmmo', 60], ['Tripod', 20], ['Shovel', 20], ['AmmoUniformW', 30]],
  [['MGW,MGTW', 10], ['MGAmmo', 60], ['RifleLongW', 30], ['Bayonet', 60], ['GrenadeAdapter', 20], ['Radio', 25], ['Binoculars', 20], ['ATAmmo', 60]],
  [['Mortar', 15], ['MortarAmmo', 100], ['MortarAmmoFL', 100], ['MortarAmmoSH', 50], ['ATRPGTW', 10], ['LightTankAmmo', 100], ['TankUniformW', 30]],
  [['AssaultRifleW', 30], ['AssaultRifleAmmo', 80], ['TankMine', 50], ['BarbedWireMaterials', 40], ['SandbagMaterials',  40],  ['SatchelChargeW', 40], ['SmokeGrenade', 40], ['ScoutUniformW', 15]],
];
pyramidDefs.fmatBasic = [
  [['SoldierSupplies', 100], ['Cloth', 1000]],
  [['RifleW', 60], ['RifleAmmo', 120], ['Bandages', 100]],
  [['StickyBomb', 30], ['GreenAsh', 40], ['FirstAidKit', 10], ['TraumaKit', 10], ['BloodPlasma', 50], ['MedicUniformW', 15]],
  [['HEGrenade', 40], ['GasMask', 20], ['GasMaskFilter', 40], ['SMGW', 20], ['SMGAmmo', 80], ['GrenadeW', 40], ['WorkWrench', 10]],
];
pyramidDefs.rares = [
  [['RareMetal', 1], ['FacilityMaterials9', 1]],
];
pyramidDefs.frig = [
  [['SoldierSupplies-crated', 50], ['Cloth-crated', 100]],
  [['LightArtilleryAmmo-crated', 100], ['WaterMine-crated', 50], ['DepthChargeAmmo-crated', 50], ['ATAmmo-crated', 10], ['MGAmmo-crated', 5], ['MetalBeamMaterials-crated', 100]],
  [['Radio-crated', 60], ['Binoculars-crated', 30], ['WorkWrench-crated', 20], ['GasMask-crated', 30], ['GasMaskFilter-crated', 30], ['WaterBucket-crated', 30]],
  [['TankUniformW-crated', 20], ['EngineerUniformW-crated', 20], ['AmmoUniformW-crated', 20], ['OfficerUniformW-crated', 20]],
];
pyramidDefs.frigmin = [
  [['SoldierSupplies-crated', 50], ['Cloth-crated', 80]],
  [['LightArtilleryAmmo-crated', 100], ['WaterMine-crated', 20], ['DepthChargeAmmo-crated', 20], ['ATAmmo-crated', 10], ['MetalBeamMaterials-crated', 50]],
  [['Radio-crated', 25], ['Binoculars-crated', 10], ['WorkWrench-crated', 10], ['GasMask-crated', 10], ['GasMaskFilter-crated', 20], ['WaterBucket-crated', 20]],
  [['TankUniformW-crated', 10], ['EngineerUniformW-crated', 10], ['AmmoUniformW-crated', 5], ['OfficerUniformW-crated', 3]],
];
pyramidDefs.bs = [[["SoldierSupplies-crated","60"],["Cloth-crated",150],["MetalBeamMaterials","80"]],[["LightArtilleryAmmo-crated","20"],["HeavyArtilleryAmmo-crated",100],["MiniTankAmmo-crated",15],["MGAmmo","8"]],[["Radio-crated",60],["Binoculars-crated",30],["WorkWrench-crated",20],["GasMask-crated",20],["GasMaskFilter-crated",30],["WaterBucket-crated","30"]],[["TankUniformW-crated","20"],["EngineerUniformW-crated","15"],["AmmoUniformW-crated","10"],["OfficerUniformW-crated",20]]];
pyramidDefs.bb = [
  [['SoldierSupplies', 300], ['Cloth', 3000]],
  [['RifleLightW,RifleW', 100], ['RifleAmmo', 200], ['RifleLongW', 40], ['SMGW', 60], ['SMGAmmo', 160]], //infantry
  [['Bandages', 200], ['FirstAidKit', 30], ['BloodPlasma', 150], ['TraumaKit', 30], ['MedicUniformW', 30]], //medic
  [['GrenadeW', 80], ['GreenAsh', 40], ['SmokeGrenade', 40], ['ATLaunchedGrenadeW', 40], ['GrenadeAdapter', 40]], //grenade
  [['StickyBomb', 60], ['ATGrenadeW', 60], ['ATRifleW', 20], ['ATRifleAmmo', 60], ['ATRPGW', 15], ['ATRPGIndirectAmmo', 60], ['TankMine', 50]], //AT
  [['HEGrenade', 100], ['RpgW', 30], ['RpgAmmo', 100], ['SatchelChargeW', 50], ['SatchelChargeT', 20], ['ExplosiveTripod', 20], ['AmmoUniformW', 40]], //PVE
  [['Radio', 60], ['Binoculars', 20], ['WorkWrench', 20], ['ScoutUniformW', 15]], //Utility
  [['Shovel', 20], ['BarbedWireMaterials', 40], ['SandbagMaterials',  40], ['EngineerUniformW', 15]], //Building
  [['GasMask', 60], ['GasMaskFilter', 120], ['MGAmmo', 40], ['AssaultRifleAmmo', 60], ['MiniTankAmmo', 80], ['ATAmmo', 60], ['LightTankAmmo', 80], ['TankUniformW', 30]], //Tankers
  [['RPGTW', 15], ['MGTW', 15], ['ATRPGTW', 15], ['Tripod', 30]], //Tripod
  [['Mortar', 15], ['MortarAmmo', 60], ['MortarAmmoFL', 60], ['MortarAmmoFlame', 60], ['MortarAmmoSH', 50]], //Mortar
  [['FlameTorchW', 15], ['FlameBackpackW', 30], ['PistolLightW', 40], ['Bayonet', 40], ['MaceW', 40], ['ArmourUniformW', 15]], //Larp
  [['MGW', 30],['AssaultRifleW', 40], ['AssaultRifleHeavyW', 40], ['RifleShortW', 40], ['RifleHeavyW', 40], ['RevolverAmmo', 120], ['SniperRifleW', 15]], //Infantry 2
];
pyramidDefs.stock = [
  [['SoldierSupplies-crated', 100], ['Cloth-crated', 150]],
  [['RifleLightW-crated,RifleW-crated', 40], ['RifleAmmo-crated', 40], ['RifleLongW-crated', 10], ['SMGW-crated', 20], ['SMGAmmo-crated', 20]], //infantry
  [['Bandages-crated', 20], ['FirstAidKit-crated', 10], ['BloodPlasma-crated', 10], ['TraumaKit-crated', 10], ['MedicUniformW-crated', 15]], //medic
  [['HEGrenade-crated', 50], ['StickyBomb-crated', 30], ['GrenadeW-crated', 20]],
  [['Radio-crated', 30], ['Binoculars-crated', 20], ['WorkWrench-crated', 20]],
  [['MortarAmmo-crated', 100], ['RpgAmmo-crated', 100]],
];
pyramidDefs.gunboat = [
  [['MortarAmmo-crated', 100], ['MortarAmmoFlame-crated', 100]],
  [['RPGTW-crated', 20], ['RpgAmmo-crated', 100], ['ATRPGW-crated', 10], ['ATRPGIndirectAmmo-crated', 30]], //infantry
  [['TankUniformW-crated', 20], ['AmmoUniformW-crated', 20], ['ScoutUniformW-crated', 20]], //medic
  [['GasMask-crated', 20], ['GasMaskFilter-crated', 30], ['Binoculars-crated', 20], ['Radio-crated', 30]],
];
pyramidDefs.qrf = [
  [['SoldierSupplies', 100], ['Cloth', 1000]],
  [['RifleLightW,RifleW', 60], ['RifleAmmo', 120], ['SMGW', 40], ['SMGAmmo', 80], ['Bandages', 100]],
  [['StickyBomb', 50], ['HEGrenade', 40],  ['FirstAidKit', 10], ['TraumaKit', 10], ['BloodPlasma', 50], ['MedicUniformW', 15]],
  [['Radio', 40], ['Binoculars', 30], ['WorkWrench', 20]],
];
pyramidDefs.lh = [[["SoldierSupplies","2000"],["Cloth","10000"],["MetalBeamMaterials","500"],["WaterBucket","1000"]],
[["RifleW,RifleLightW","600"],["RifleLongW","100"],["RifleAmmo","1500"],["SMGW","200"],["SMGAmmo","500"]],
[["Bandages","1000"],["FirstAidKit","100"],["BloodPlasma","500"],["TraumaKit","100"],["MedicUniformW","150"],["SnowUniformW","150"]],
[["GrenadeW","300"],["GreenAsh","200"],["SmokeGrenade","120"],["ATLaunchedGrenadeW","150"],["GrenadeAdapter","80"]],
[["StickyBomb,ATGrenadeW","300"],["ATRifleW","50"],["ATRifleAssaultW,ATRifleAutomaticW","80"],["ATRifleAmmo","400"]],
[["HEGrenade","300"],["RpgW","200"],["RpgAmmo","1500"],["SatchelChargeW","250"],["ExplosiveTripod","100"],["SatchelChargeT","100"],["AmmoUniformW","200"]],
[["Radio","200"],["Binoculars","100"],["WorkWrench","100"],["GasMask","200"],["GasMaskFilter","400"],["ListeningKit","30"],["Tripod","80"],["RadioBackpack","50"]],
[["Shovel","50"],["BarbedWireMaterials","25"],["SandbagMaterials","25"],["TankMine","100"],["Concrete","25"],["FacilityMaterials1","400"],["EngineerUniformW","100"]],
[["ATRPGW","30"],["ATRPGTW","30"],["ATRPGIndirectAmmo","150"],["MGTW","30"],["MGAmmo","150"],["RPGTW","30"]],
[["Mortar","30"],["MortarAmmo","100"],["MortarAmmoFL","50"],["MortarAmmoFlame","100"],["MortarAmmoSH","50"]],
[["MiniTankAmmo","100"],["LightTankAmmo","100"],["ATAmmo","100"],["MortarTankAmmo","50"],["FlameAmmo","20"],["TankUniformW","150"]],
[["FlameTorchW","50"],["FlameBackpackW","100"],["AssaultRifleHeavyW,AssaultRifleW","150"],["AssaultRifleAmmo","300"]],
[["Revolver","100"],["RifleHeavyW","200"],["RevolverAmmo","400"],["RifleShortW","100"],["SniperRifleW","20"],["ArmourUniformW","60"]],
[["FacilityOil1","100"],["Diesel","50"],["Petrol","50"],['WaterMine-crated', 50],['DepthChargeAmmo-crated', 50]]];
pyramidDefs.lh2 = [[["SoldierSupplies","100"],["Cloth","100"],["WaterBucket","500"],["MetalBeamMaterials","300"],["WorkWrench","20"]],[["Radio","30"],["Binoculars","30"],["GasMask","50"],["GasMaskFilter","100"]],[["HEGrenade","200"],["RpgW","80"],["RpgAmmo","500"],["SatchelChargeW","150"],["ExplosiveTripod","50"],["SatchelChargeT","50"],["AmmoUniformW","150"]],[["RifleW,RifleLightW,RifleAutomaticW","400"],["RifleAmmo","600"],["SMGW,SMGHeavyW","200"],["SMGAmmo","400"],["StickyBomb","200"]]];
pyramidDefs.lh3 = [[["SoldierSupplies","2000"],["Cloth","10000"],["MetalBeamMaterials","500"],["WaterBucket","1000"]],
[["RifleW,RifleLightW","600"],["RifleLongW","100"],["RifleAmmo","1500"],["SMGW","200"],["SMGAmmo","500"]],
[["Bandages","1000"],["FirstAidKit","100"],["BloodPlasma","500"],["TraumaKit","100"],["MedicUniformW","150"],["SnowUniformW","150"]],
[["StickyBomb,ATGrenadeW","300"], ["GrenadeW","200"],["GreenAsh","150"],["SmokeGrenade","80"]],
[["HEGrenade","300"],["RpgW","150"],["RpgAmmo","800"],["SatchelChargeW","250"],["ExplosiveTripod","100"],["SatchelChargeT","100"],["AmmoUniformW","200"]],
[["Radio","200"],["Binoculars","100"],["WorkWrench","100"],["GasMask","200"],["GasMaskFilter","400"],["ListeningKit","15"],["Tripod","30"],["RadioBackpack","30"]],
[["Shovel","50"],["EngineerUniformW","100"]],
[["ATRPGW","30"],["ATRPGIndirectAmmo","150"],["MGAmmo","150"]],
[["MiniTankAmmo","100"],["LightTankAmmo","100"],["ATAmmo","100"],["TankUniformW","150"]],
[["FacilityOil1","50"],["Diesel","50"],["Petrol","50"],['WaterMine-crated', 50]]];
pyramidDefs.bf = [[["SoldierSupplies-crated","100"],["Cloth-crated","100"],["FacilityOil1-crated","100"],["Diesel-crated","100"],["Petrol-crated","100"],["MetalBeamMaterials-crated","100"]],
[["RifleW-crated","100"],["RifleLightW-crated","100"],["RifleLongW-crated","100"],["SMGW-crated","100"],["MGW-crated","100"]],
[["RifleAmmo-crated","100"],["SMGAmmo-crated","100"],["AssaultRifleAmmo-crated","100"],["MGAmmo-crated","100"],["ATRifleAmmo-crated","100"]],
[["HEGrenade-crated","100"],["StickyBomb-crated","100"],["GrenadeW-crated","100"],["GreenAsh-crated","100"],["SmokeGrenade-crated","100"],["ATLaunchedGrenadeW-crated","100"]],
[["RpgW-crated","100"],["ATRPGW-crated","100"],["ATRPGTW-crated","100"],["MGTW-crated","100"],["RPGTW-crated","100"]],
[["RpgAmmo-crated","100"],["ATRPGIndirectAmmo-crated","100"],["MortarAmmo-crated","100"],["MortarAmmoFL-crated","100"],["MortarAmmoFlame-crated","100"]],
[["LightArtilleryAmmo-crated","100"],["LRArtilleryAmmo-crated","100"],["MortarTankAmmo-crated","100"],["FlameAmmo-crated","100"],["DepthChargeAmmo-crated","100"],["WaterMine-crated","100"]],
[["Bandages-crated","100"],["BloodPlasma-crated","100"],["FirstAidKit-crated","100"],["TraumaKit-crated","100"]],
[["Radio-crated","100"],["Binoculars-crated","100"],["WorkWrench-crated","100"],["GasMask-crated","100"],["GasMaskFilter-crated","100"],["RadioBackpack-crated","100"]],
[["WaterBucket-crated","100"],["Shovel-crated","100"],["BarbedWireMaterials-crated","100"],["SandbagMaterials-crated","100"],["Tripod-crated","100"],["ListeningKit-crated","100"]],
[["SatchelChargeW-crated","100"],["ExplosiveTripod-crated","100"],["SatchelChargeT-crated","100"],["TankMine-crated","100"],["InfantryMine-crated","100"]],
[["MedicUniformW-crated","100"],["TankUniformW-crated","100"],["AmmoUniformW-crated","100"],["EngineerUniformW-crated","100"],["SnowUniformW-crated","100"],["ScoutUniformW-crated","100"]],
[["TruckW","100"],["Barge","100"],["Construction","100"],["ConstructionUtility","100"],["Crane","100"],["FlatbedTruck","100"]],
[["MediumTank2W","100"],["MediumTank2RangeW","100"],["MediumTankW","100"],["MediumTankSiegeW","100"],["DestroyerTankW","100"],["DestroyerTankFlameW","100"]],
[["EmplacedInfantryW","100"],["EmplacedATW","100"],["EmplacedLightArtilleryW","100"],["EmplacedHeavyArtilleryW","100"],["LiquidContainer","100"],["MaterialPlatform","100"]]];
pyramidDefs.bf2 = [[["SoldierSupplies-crated","500"],["Cloth-crated","500"],["FacilityOil1-crated","100"],["Diesel-crated","200"],["Petrol-crated","200"],["MetalBeamMaterials-crated","200"]],[["RifleW-crated","100"],["RifleLightW-crated","100"],["RifleLongW-crated","40"],["SMGW-crated","100"],["MGW-crated","50"]],[["RifleAmmo-crated","150"],["SMGAmmo-crated","100"],["AssaultRifleAmmo-crated","60"],["MGAmmo-crated","60"],["ATRifleAmmo-crated","60"]],[["HEGrenade-crated","100"],["StickyBomb-crated","100"],["GrenadeW-crated","50"],["GreenAsh-crated","200"],["SmokeGrenade-crated","40"],["ATLaunchedGrenadeW-crated","40"]],[["RpgW-crated","100"],["ATRPGW-crated","40"],["ATRPGTW-crated","40"],["MGTW-crated","40"],["RPGTW-crated","20"]],[["RpgAmmo-crated","100"],["ATRPGIndirectAmmo-crated","40"],["MortarAmmo-crated","100"],["MortarAmmoFL-crated","20"],["MortarAmmoFlame-crated","60"]],[["LightArtilleryAmmo-crated","400"],["LRArtilleryAmmo-crated","400"],["MortarTankAmmo-crated","100"],["FlameAmmo-crated","40"],["DepthChargeAmmo-crated","40"],["WaterMine-crated","100"]],[["Bandages-crated","100"],["BloodPlasma-crated","60"],["FirstAidKit-crated","60"],["TraumaKit-crated","60"]],[["Radio-crated","100"],["Binoculars-crated","100"],["WorkWrench-crated","100"],["GasMask-crated","100"],["GasMaskFilter-crated","100"],["RadioBackpack-crated","40"]],[["WaterBucket-crated","40"],["Shovel-crated","50"],["BarbedWireMaterials-crated","100"],["SandbagMaterials-crated","100"],["Tripod-crated","100"],["ListeningKit-crated","20"]],[["SatchelChargeW-crated","100"],["ExplosiveTripod-crated","100"],["SatchelChargeT-crated","100"],["TankMine-crated","20"],["InfantryMine-crated","10"]],[["MedicUniformW-crated","40"],["TankUniformW-crated","40"],["AmmoUniformW-crated","40"],["EngineerUniformW-crated","20"],["SnowUniformW-crated","40"],["ScoutUniformW-crated","20"]],[["TruckW","50"],["Construction","20"],["ConstructionUtility","10"],["Crane","20"],["FlatbedTruck","40"],["TruckLiquidW","10"]],[["MediumTank2W","20"],["MediumTank2RangeW","20"],["MediumTankW","20"],["MediumTankSiegeW","30"],["DestroyerTankW","20"],["DestroyerTankFlameW","5"]],[["EmplacedInfantryW","15"],["EmplacedATW","15"],["EmplacedLightArtilleryW","6"],["EmplacedHeavyArtilleryW","6"],["LiquidContainer","10"],["MaterialPlatform","20"]]];
pyramidDefs.test2 = [
  [['SoldierSupplies-crated', 80], ['Cloth-crated', 150]],
  [['LightArtilleryAmmo-crated', 100], ['HeavyArtilleryAmmo-crated', 100], ['MiniTankAmmo-crated', 15]],
  [['Radio-crated', 60], ['Binoculars-crated', 30], ['WorkWrench-crated', 20], ['GasMask-crated', 20], ['GasMaskFilter-crated', 30], ['WaterBucket-crated', 30]],
  [['TankUniformW-crated', 30], ['EngineerUniformW-crated', 30], ['AmmoUniformW-crated', 20], ['OfficerUniformW-crated', 20]],
];

export default pyramidDefs;