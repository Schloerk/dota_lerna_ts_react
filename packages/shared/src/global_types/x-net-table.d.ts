type UniqueID = string;

// 面向所有人的XNetTables
declare interface XNetTableDefinations {
    test: {
        [key: string]: any
    }
}

// 单个玩家的XNetTables
declare interface PlayerXNetTableDefinations {}

// 以下是库内部使用的，勿动
declare interface CustomGameEventDeclarations {
    x_net_table: { data: string };
}

declare interface XNetTableDataJSON {
    table: string;
    key: string;
    value: any;
}
