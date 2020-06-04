const formatMessage = require('format-message');
const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');

// eslint-disable-next-line max-len
const menuIconURI = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCwwLDQwLDQwIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjE1LjEwMDAxLC0xNTYuMTMzMzMpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTIxNS4xMDAwMSwxOTYuMTMzMzN2LTQwaDQwdjQweiIgZmlsbD0iIzllNmRmZiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PHBhdGggZD0iTTIyMS4xODMzMywxNzQuNjg4ODlsMTMuMTY2NjcsLTEzLjE2NjY3bDEzLDEzLjE2NjY3IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZjYwNjAiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cGF0aCBkPSJNMjM0LjUyNTAxLDE5MC41MjQxOGwtMC4xODMzNiwtMjcuNjcwNTgiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O29yaWdSb3QmcXVvdDs6MH0iIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmNjA2MCIgc3Ryb2tlLXdpZHRoPSIyLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvZz48L2c+PC9zdmc+';

const blockIconURI = menuIconURI;

const ON = 'on';
const OFF = 'off';

class AppleProBlocks {
    constructor (runtime) {
        this.runtime = runtime;
    }

    getInfo () {
        return {
            id: 'pro',
            name: formatMessage({
                id: 'pro.name',
                default: 'Pro',
                description: 'Name of Pro extension'
            }),
            blockIconURI: blockIconURI,
            menuIconURI: menuIconURI,
            blocks: [
                {
                    opcode: 'setTurbo',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'pro.setturbo',
                        default: 'set turbo mode [TURBO]',
                        description: 'Sets turbo mode'
                    }),
                    arguments: {
                        TURBO: {
                            type: ArgumentType.STRING,
                            menu: 'onOffMenu',
                            defaultValue: OFF
                        }
                    }
                },
                {
                    opcode: 'setCompatibilityMode',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'pro.setcompatibility',
                        default: 'set FPS to [FPS]',
                        description: 'Sets FPS'
                    }),
                    arguments: {
                        FPS: {
                            type: ArgumentType.NUMBER,
                            menu: 'fpsMenu',
                            defaultValue: 30
                        }
                    }
                },
                {
                    opcode: 'setTargetFencing',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'pro.settargetfencing',
                        default: 'set sprite fencing [FENCING]',
                        description: 'Sets sprite fencing'
                    }),
                    arguments: {
                        FENCING: {
                            type: ArgumentType.STRING,
                            menu: 'onOffMenu',
                            defaultValue: ON
                        }
                    }
                },
                {
                    opcode: 'setTargetSensing',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'pro.settargetsensing',
                        default: 'set sprite sensing [SENSING]',
                        description: 'Sets sprite sensing'
                    }),
                    arguments: {
                        SENSING: {
                            type: ArgumentType.STRING,
                            menu: 'onOffMenu',
                            defaultValue: ON
                        }
                    }
                }
            ],
            menus: {
                onOffMenu: {
                    acceptReporters: true,
                    items: [
                        {
                            text: formatMessage({
                                id: 'pro.on',
                                default: 'on',
                                description: 'menu when enabled'
                            }),
                            value: ON
                        },
                        {
                            text: formatMessage({
                                id: 'pro.off',
                                default: 'off',
                                description: 'menu when disabled'
                            }),
                            value: OFF
                        }
                    ]
                },
                fpsMenu: {
                    acceptReporters: true,
                    items: [
                        {
                            text: '30',
                            value: 30
                        },
                        {
                            text: '60',
                            value: 60
                        }
                    ]
                }
            }
        };
    }

    setTurbo (args) {
        const turbo = args.TURBO === ON;
        if (turbo !== this.runtime.turboMode) {
            this.runtime.turboMode = turbo;
            this.runtime.requestTurboModeUpdate();
        }
    }

    setCompatibilityMode (args) {
        const compatibilityMode = Cast.toNumber(args.FPS) !== 60;
        if (compatibilityMode !== this.runtime.compatibilityMode) {
            this.runtime.setCompatibilityMode(compatibilityMode);
        }
    }

    setTargetFencing (args, util) {
        const fencingEnabled = args.FENCING === ON;
        if (fencingEnabled !== util.target.fencingEnabled) {
            util.target.fencingEnabled = fencingEnabled;
        }
    }

    setTargetSensing (args, util) {
        const detectable = args.SENSING === ON;
        if (detectable !== util.target.detectable) {
            util.target.detectable = detectable;
        }
    }
}

export default AppleProBlocks;
