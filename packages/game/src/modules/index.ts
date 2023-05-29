import { GameMode } from './GameMode';
import { XNetTable } from './xnet-table';

/**
 * 这个方法会在game_mode实体生成之后调用，且仅调用一次
 * 因此在这里作为单例模式使用
 **/
export function ActivateModules() {
    if (GameRules.XNetTable == null) {
        // 初始化所有的GameRules模块
        GameRules.XNetTable = new XNetTable();
        // 如果某个模块不需要在其他地方使用，那么直接在这里使用即可
    }
    if (GameRules.GameMode == null) {
        GameRules.GameMode = new GameMode();
    }
}
