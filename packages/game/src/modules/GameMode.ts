import { Test } from "custom_game_shared";
import { reloadable } from "../utils/tstl-utils";

@reloadable
export class GameMode {

    constructor() {
        if (!IsDedicatedServer() && !IsInToolsMode()) {
            GameRules.MakeTeamLose(DotaTeam.GOODGUYS);
            return;
        }

        this.configureGameRules();
        this.configureGameMode();
        this.registerConsoleCommands();

        // Register event listeners for dota engine events
        ListenToGameEvent('game_rules_state_change', () => this.OnStateChange(), undefined);
        ListenToGameEvent('npc_spawned', event => this.OnNpcSpawned(event), undefined);
    }

    private registerConsoleCommands(): void {
    }

    private configureGameRules(): void {
        SendToServerConsole('dota_max_physical_items_purchase_limit 9999'); // 用来解决物品数量限制问题

        GameRules.SetCustomGameSetupAutoLaunchDelay(0); // 游戏设置时间（默认的游戏设置是最开始的队伍分配）
        GameRules.SetCustomGameSetupRemainingTime(0); // 游戏设置剩余时间
        GameRules.SetCustomGameSetupTimeout(1); // 游戏设置阶段超时
        GameRules.SetHeroSelectionTime(0); // 选择英雄阶段的持续时间
        GameRules.SetHeroSelectPenaltyTime(0);
        GameRules.SetShowcaseTime(0); // 选完英雄的展示时间
        GameRules.SetStrategyTime(0);
        GameRules.SetPreGameTime(0); // 进入游戏后号角吹响前的准备时间
        GameRules.SetPostGameTime(30); // 游戏结束后时长
        GameRules.SetSameHeroSelectionEnabled(true); // 是否允许选择相同英雄
        GameRules.SetStartingGold(0); // 设置初始金钱
        GameRules.SetGoldTickTime(0); // 设置工资发放间隔
        GameRules.SetGoldPerTick(0); // 设置工资发放数额
        GameRules.SetHeroRespawnEnabled(false); // 是否允许英雄重生
        GameRules.SetCustomGameAllowMusicAtGameStart(false); // 是否允许游戏开始时的音乐
        GameRules.SetCustomGameAllowHeroPickMusic(false); // 是否允许英雄选择阶段的音乐
        GameRules.SetCustomGameAllowBattleMusic(false); // 是否允许战斗阶段音乐
        GameRules.SetUseUniversalShopMode(false); // 是否启用全地图商店模式（在基地也可以购买神秘商店的物品）* 不是在任何地方都可以购买商店物品的
        GameRules.SetHideKillMessageHeaders(true); // 是否隐藏顶部的英雄击杀信息
    }

    private configureGameMode() {
        const gamemode = GameRules.GetGameModeEntity();

        gamemode.SetRemoveIllusionsOnDeath(true); // 是否在英雄死亡的时候移除幻象
        gamemode.SetSelectionGoldPenaltyEnabled(false); // 是否启用选择英雄时的金钱惩罚（超时每秒扣钱）
        gamemode.SetLoseGoldOnDeath(false); // 是否在英雄死亡时扣除金钱
        gamemode.SetBuybackEnabled(false); // 是否允许买活
        gamemode.SetDaynightCycleDisabled(true); // 是否禁用白天黑夜循环
        gamemode.SetForceRightClickAttackDisabled(true); // 是否禁用右键攻击
        gamemode.SetHudCombatEventsDisabled(true); // 是否禁用战斗事件（左下角的战斗消息）
        gamemode.SetCustomGameForceHero(`npc_dota_hero_dragon_knight`); // 设置强制英雄（会直接跳过英雄选择阶段并直接为所有玩家选择这个英雄）
        gamemode.SetUseCustomHeroLevels(true); // 是否启用自定义英雄等级
        gamemode.SetCustomXPRequiredToReachNextLevel({
            // 设置自定义英雄每个等级所需经验，这里的经验是升级到这一级所需要的*总经验）
            1: 0,
        });
        gamemode.SetDaynightCycleDisabled(true); // 是否禁用白天黑夜循环
        gamemode.SetDeathOverlayDisabled(true); // 是否禁用死亡遮罩（灰色的遮罩）

        gamemode.SetCameraZRange(0, 999999);
        gamemode.SetCameraDistanceOverride(2000);

        // 设置自定义的队伍人数上限，这里的设置是10个队伍，每个队伍1人
        GameRules.SetCustomGameTeamMaxPlayers(DotaTeam.GOODGUYS, 3);
        GameRules.SetCustomGameTeamMaxPlayers(DotaTeam.BADGUYS, 3);
        for (let team = DotaTeam.CUSTOM_1; team <= DotaTeam.CUSTOM_8; ++team) {
            GameRules.SetCustomGameTeamMaxPlayers(team, 3);
        }
    }

    public OnStateChange(): void {
        const state = GameRules.State_Get();

        if (state === GameState.CUSTOM_GAME_SETUP) {
            print('CUSTOM_GAME_SETUP');
            // next frame otherwise no unit spawns
            Timers.CreateTimer(0.5, () => {
                GameRules.FinishCustomGameSetup();
            });
        }

        if (state === GameState.GAME_IN_PROGRESS) {
            print('GAME_IN_PROGRESS');
            Timers.CreateTimer(0.1, () => {
                this.StartGame();
            });
        }
    }

    private StartGame(): void {
        const testClass = new Test();
        print('Game starting!!', testClass.yolo);
    }

    public Reload() {
        print('GameMode reloaded!');
    }


    private OnNpcSpawned(event: NpcSpawnedEvent) {
        // After a hero unit spawns, apply modifier_panic for 8 seconds
        // const unit = EntIndexToHScript(event.entindex) as CDOTA_BaseNPC; // Cast to npc since this is the 'npc_spawned' event
        // Give all real heroes (not illusions) the meepo_earthbind_ts_example spell

        const unit = EntIndexToHScript(event.entindex) as CDOTA_BaseNPC;

        if (unit.GetClassname() === 'npc_dota_thinker' || unit.GetClassname() === 'npc_dota_base_additive') {
            return;
        }

        let name;

        if (unit.IsRealHero()) {
            name = unit.GetName();
        } else {
            name = unit.GetUnitName();
        }

        print(name, unit.GetClassname());
    }
}
