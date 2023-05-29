/** 项目名称 */
let addon_name = 'custom_test_game'; // 必须为字母开头，而且只能包含字母、数字和下划线

/** 要加密的项目列表 */
let encrypt_files = [
    'packages/game/dota/**/*.lua',
    '!packages/game/dota/vscripts/lualib_bundle.lua',
    '!packages/game/dota/vscripts/addon_init.lua',
    '!packages/game/dota/vscripts/addon_game_mode.lua',
    '!packages/game/dota/vscripts/addon_game_mode_client.lua',
    '!packages/game/dota/vscripts/utils/decrypt.lua',
    '!packages/game/dota/vscripts/utils/aeslua.lua',
    '!packages/game/dota/vscripts/utils/aeslua/**/*.lua',
];

/** 发布时要排除的文件列表 */
let exclude_files = [
    'packages/game/src/**/*.*', // 不输出源码
    'packages/game/**/*.ts',
    'packages/game/**/*.bin',
    'packages/game/**/*.py',
    'packages/game/**/*.cfg',
];

/** 测试密钥，一般不需要修改 */
const encryptDedicatedServerKeyTest = `Invalid_NotOnDedicatedServer`;

/** 测试发布密钥，运行 yarn test 必须 */
const encryptDedicatedServerKeyRelease_Test = `这里需要填入测试图的密钥 GetDedicatedServerKeyV2('version') 的结果`;

/** 正式发布密钥，运行 yarn prod 必须 */
const encryptDedicatedServerKeyRelease = `这里需要填入正式的发布密钥 GetDedicatedServerKeyV2('version') 的结果`;

/** 验证配置是否合法 */
const assert = require('assert');
assert(
    addon_name.match(/^[a-zA-Z][a-zA-Z0-9_]*$/),
    'addon_name 必须为字母开头，而且只能包含字母、数字和下划线，请到 addon.config.js 修改\nplease change addon_name in addon.config.js to match /^[a-zA-Z][a-zA-Z0-9_]*$/'
);
assert(
    addon_name !== 'x_template',
    '请到 scripts/addon.config.js 修改 addon_name 为你的项目名称，不能为 x_template\nplease change addon_name in addon.config.js to your project name, not x_template'
);

module.exports = {
    addon_name: addon_name,
    encrypt_files: encrypt_files,
    exclude_files: exclude_files,
    encryptDedicatedServerKeyTest: encryptDedicatedServerKeyTest,
    encryptDedicatedServerKeyRelease_Test: encryptDedicatedServerKeyRelease_Test,
    encryptDedicatedServerKeyRelease: encryptDedicatedServerKeyRelease,
};
