import { Vector3Utils } from "@minecraft/math";
import { system, world } from "@minecraft/server";
const MAX_DISTANCE = 25;
world.beforeEvents.itemUse.subscribe(ev => {
    const { source, itemStack } = ev;
    // 使用胡蘿蔔釣竿做為測試物品
    // Use a carrot on a stick as the test item
    if (itemStack.typeId !== 'minecraft:carrot_on_a_stick')
        return;
    // 檢測是否命中
    // Check if hit
    const isHit = shoot(ev.source);
    source.sendMessage(`is_shoot: ${isHit}`);
});
function shoot(source) {
    const dimension = world.getDimension('overworld');
    const headLocation = Vector3Utils.add(source.getHeadLocation(), { y: 0.1 });
    const viewVector = source.getViewDirection();
    // 檢測路線上是否有方塊，如果有(被遮擋)就回傳 false(未命中)
    // Check if there is a block on the path, if so (obstructed) return false (miss)
    if (checkObstacle(headLocation, viewVector)) {
        return false;
    }
    // 路線上沒有方塊遮擋，就可以獲取射擊路徑上的實體
    // If there is no block obstructing the path, get entities along the shooting path
    const entities = dimension.getEntitiesFromRay(headLocation, viewVector, { excludeNames: [source.name], maxDistance: MAX_DISTANCE });
    // 傷害或其他無法在 read-only 狀態下使用的方法，透過 system.run 執行。
    // Damage or other methods that cannot be used in a read-only state are executed via system.run.
    system.run(() => {
        entities.forEach(raycast => raycast.entity.applyDamage(1));
    });
    // 回傳路徑上是否有實體(是否命中)
    // Return whether there are entities on the path (whether hit)
    return entities.length > 0;
}
function checkObstacle(location, direction) {
    const dimension = world.getDimension('overworld');
    const raycast = dimension.getBlockFromRay(location, direction, { maxDistance: MAX_DISTANCE });
    // 檢測路徑上是否有方塊，並且該方塊不能為空氣
    // Check if there is a block on the path and that block is not air
    return raycast && !raycast.block.isAir;
}
