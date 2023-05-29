/**
 * 使用event-bus发送的事件在此处声明
 * @export
 * @interface LocalEvent
 */
export interface LocalEvent {
    // 收到网表更新事件
    x_net_table: {
        table_name: string;
        key: string;
        content: any;
    };

    switchScreen: {
        name: string;
        data: any;
    };

    customstats: {
        [uniqueId: string]: {
            [propertyKey: string]: (number|string)[]
        };
    }

    inventory: {
        [uniqueId: string]: string[];
    }

    equipment: {
        [uniqueId: string]: {
            [slot: string]: string;
        };
    }

    indexToUnique: {
        [index: EntityIndex]: string;
    }
}
