/**
 * PlayCanvas Toolkit Bundle - Version 1.4.3
 * ==============================================================================
 * Base class to be extended when implementing PlayCanvas ScriptType classes
 * @export
 * @class CanvasScript
 */
declare class CanvasScript {
    /**
     * The pc.Application that the instance of this type belongs to.
     * @type {pc.Application}
     * @memberof ScriptType
     */
    app: pc.Application;
    /**
     * 	The pc.Entity that the instance of this type belongs to.
     * @type {pc.Entity}
     * @memberof ScriptType
     */
    entity: pc.Entity;
    /**
     * True if the instance of this type is in running state.
     * @type {boolean}
     * @memberof ScriptType
     */
    enabled: boolean;
}
/**
 * PlayCanvas Toolkit Bundle - Version 1.4.3
 * ==============================================================================
 * Class decorator allowing the use of ES6 classes to define and create PlayCanvas script types.
 * @param {pc.Application} [app]
 */
declare const createScript: (app?: pc.Application) => (obj: any) => void;
