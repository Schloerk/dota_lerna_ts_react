interface PlayerState {
    team: DotaTeam;
    ready: boolean;
}

declare type PlayerTable = {
    [key in Partial<PlayerID>]: PlayerState;
};

declare type PartyTable = {
    [key in DotaTeam]: PlayerID[];
};

interface CharacterSlot {
    slot: number;
}

interface CharacterSelectionInfo extends CharacterSlot {
    name: string;
    level: number;
    class: number;
    slot: number;
}

declare interface CustomGameEventDeclarations {
    character_selection_start: (CharacterSelectionInfo | CharacterSlot)[];
    character_selection_result: {
        success: number;
    };

    character_selection_select: {
        slot: number;
        success?: number;
    };

    character_creation_check_name: {
        name: string;
        success?: number;
    };

    character_creation_create: {
        name: string;
        class: number;
        slot: number;
        success?: number;
    };

    character_selection_delete: {
        slot: number;
        success?: number;
    };

    game_options_voting: {
        season: number;
        gamemode: string[];
        party_size: number[];
        difficulty: number[];
        authorized_player: number;
    };

    game_options_voting_result: {
        season: number;
        gamemode: string;
        party_size: number;
        difficulty: number;
        success?: number;
    };

    party_composition_start: {
        party_size: number;
        composition: CustomGameEventDeclarations['party_composition_result'];
    };

    party_composition_invite: {
        inviter: PlayerID;
        invitee: PlayerID;
        success?: number;
    };

    // team present as soon as success 1
    party_composition_accept: {
        accepter: PlayerID;
        inviter: PlayerID;
        team?: DotaTeam;
        success?: number;
    };

    party_composition_ready_change: {
        player: PlayerID;
        ready: number;
    };

    party_composition_result: PartyTable;

    inventory_full: {
        max_size: number
    }

    inventory_equip_error: {
        code: number;
        slot?: string;
    }

    inventory_equip_success: {
        slot: string;
    }

    inventory_added: {
        index: number;
    }

    inventory_move: {
        from: number;
        to: number;
    }

    equipment_move: {
        from: string;
        to: string;
    }

    inventory_equip: {
        from: number;
        to: string;
    }

    equipment_dequip: {
        from: string;
        to?: number;
        error?: number;
    }

    inventory_drop: {
        from: number;
        error?: number;
    }

    equipment_drop: {
        from: string;
        error?: number;
    }
}
