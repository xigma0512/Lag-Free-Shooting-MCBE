## Lag-Free Shooting System in MCBE
Most shooting Addons currently available for Minecraft Bedrock Edition (MCBE) typically determine hits by **detecting item usage**, then **spawning a projectile**, and finally **checking if that projectile hits an entity**.

However, MCBE has a core limitation: the system cannot instantly spawn entities at the exact moment an item is used. When the system attempts to **spawn an entity**, it actually does so on the **next game tick (a 1-tick delay)**. This tiny 1-tick delay leads to a less fluid shooting experience.

To address this issue, I've designed a simple method. By utilizing the `world.beforeEvents.itemUse` event to instantly detect item usage, and combining it with ScriptAPI's `Dimension.getEntitiesFromRay()` and `Dimension.getBlockFromRay()` for **pure vector calculation**, we can determine shot hits. This method completely avoids the 1-tick delay caused by spawning entities, achieving **instant shooting feedback**.

---
---

## MCBE 無延遲射擊系統

目前市面上大多數的 Minecraft Bedrock Edition (MCBE) 射擊類 Addon，其射擊判定機制多半是透過**檢測物品使用**後，**生成一個投擲物**，再**檢測該投擲物是否命中實體**來判斷。

然而，MCBE 存在一個核心限制：系統無法在使用物品的當下立即生成實體。當系統嘗試**生成實體**時，實際上會在**下一個遊戲刻 (1 tick 延遲)** 才生成，這微小的 1 tick 延遲會導致射擊體驗上的不流暢。

為了解決這個問題，我設計了一個簡單的方法。利用 `world.beforeEvents.itemUse` 事件來即時檢測物品的使用，並結合 ScriptAPI 提供的 `Dimension.getEntitiesFromRay()` 和 `Dimension.getBlockFromRay()` 進行**純粹的向量計算**來判斷射擊命中。這種方法完全避免了生成實體所造成的 1 tick 延遲，實現了**即時的射擊回饋**。