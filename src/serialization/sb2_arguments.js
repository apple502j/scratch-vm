/**
 * @fileoverview
 * The numArgsMap and dropdownArgsMap below handles a few pieces of
 * "translation" work between the SB2 arguments and SB3 arguments. For example,
 * 'drum' on Scratch 2.0 is 'music_menu_DRUM' on Scratch 3.0. For dropdowns
 * without inputOp, it becomes to text.
 */

/**
 * Mapping of Scratch 2.0 dropdown argument opcode to Scratch 3.0 block metadata.
 * @type {object}
 */
const dropdownArgsMap = {
    attribute: 'text',
    backdrop: 'looks_backdrops',
    broadcast: 'event_broadcast_menu',
    costume: 'looks_costume',
    effect: 'text',
    key: 'sensing_keyoptions',
    list: 'text',
    location: 'motion_goto_menu',
    mathOp: 'text',
    rotationStyle: 'text',
    scrollAlign: 'text',
    sound: 'sound_sounds_menu',
    spriteOnly: 'control_create_clone_of_menu',
    spriteOrMouse: 'sensing_distancetomenu',
    spriteOrStage: 'sensing_of_object_menu',
    stageOrThis: 'videoSensing.menu.SUBJECT',
    stop: 'text',
    timeAndDate: 'text',
    touching: 'sensing_touchingobjectmenu',
    triggerSensor: 'text',
    var: 'text',
    videoMotionType: 'videoSensing.menu.ATTRIBUTE',
    videoState: 'videoSensing.menu.VIDEO_STATE'
};

/**
 * Mapping of Scratch 2.0 number argument opcode to Scratch 3.0 block metadata.
 * @type {object}
 */
const numArgsMap = {
    direction: 'math_angle',
    drum: 'music_menu_DRUM',
    instrument: 'music.menu.INSTRUMENT',
    listDeleteItem: 'math_number',
    listItem: 'math_number',
    note: 'note'
};

module.exports = {
    dropdownArgsMap,
    numArgsMap
};
