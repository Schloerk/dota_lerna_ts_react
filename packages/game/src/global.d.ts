import { GameMode } from './modules/GameMode';
import { XNetTable } from './modules/xnet-table';

declare global {
    interface CDOTA_BaseNPC {
    }

    interface CDOTA_Ability_Lua {
        
    }

    interface CDOTA_Item {
    }

    interface CDOTA_BaseNPC_Hero {
        hiddenWearables: CBaseEntity[];
    }

    interface CDOTAGameRules {
        // 声明所有的GameRules模块，这个主要是为了方便其他地方的引用（保证单例模式）
        XNetTable: XNetTable;
        GameMode: GameMode;
    }

    interface UnitScript {
        Spawn: (entity: CDOTA_BaseNPC) => void; 
    }
}
