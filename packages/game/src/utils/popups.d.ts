/** @noSelfInFile */
declare enum Popup_Symbol_Pre {
    PLUS = 0,
    MINUS = 1,
    SADFACE = 2,
    BROKENARROW = 3,
    SHADES = 4,
    MISS = 5,
    EVADE = 6,
    DENY = 7,
    ARROW = 8,
}

declare enum Popup_Symbol_Post {
    EXCLAMATION = 0,
    POINTZERO = 1,
    MEDAL = 2,
    DROP = 3,
    LIGHTNING = 4,
    SKULL = 5,
    EYE = 6,
    SHIELD = 7,
    POINTFIVE = 8,
}

declare function PopupHealing(target: CDOTA_BaseNPC, amount: number, player?: CDOTAPlayerController): void;
declare function PopupDamage(target: CDOTA_BaseNPC, amount: number, player?: CDOTAPlayerController): void;
declare function PopupDamageColored(target: CDOTA_BaseNPC, amount: number, color: Vector, player?: CDOTAPlayerController): void;
declare function PopupCriticalDamage(target: CDOTA_BaseNPC, amount: number, player?: CDOTAPlayerController): void;
declare function PopupCriticalDamageColored(target: CDOTA_BaseNPC, amount: number, color: Vector, player?: CDOTAPlayerController): void;
declare function PopupDamageOverTime(target: CDOTA_BaseNPC, amount: number, player?: CDOTAPlayerController): void;
declare function PopupDamageBlock(target: CDOTA_BaseNPC, amount: number, player?: CDOTAPlayerController): void;
declare function PopupGoldGain(target: CDOTA_BaseNPC, amount: number, player?: CDOTAPlayerController): void;
declare function PopupManaGain(target: CDOTA_BaseNPC, amount: number, player?: CDOTAPlayerController): void;
declare function PopupMiss(target: CDOTA_BaseNPC, player?: CDOTAPlayerController): void;
declare function PopupDamageBig(target: CDOTA_BaseNPC, amount: number, player?: CDOTAPlayerController): void;
declare function PopupAddGold(target: CDOTA_BaseNPC, amount: number, player?: CDOTAPlayerController): void;
declare function PopupNumbers(
    target: CBaseEntity,
    particleEffect: string,
    color: Vector,
    lifetime: number,
    value?: number,
    presymbol?: Popup_Symbol_Pre,
    postsymbol?: Popup_Symbol_Post
);
