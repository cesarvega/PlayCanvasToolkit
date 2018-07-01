/// <reference path="winrt.d.ts" />
/// <reference path="playcanvas.d.ts" />
/**
 * PlayCanvas Toolkit Bundle - Version 1.4.3 
 * ==============================================================================
 * Base class to be extended when implementing PlayCanvas ScriptType classes
 * @export
 * @class CanvasScript
 */
class CanvasScript {
    /**
     * The pc.Application that the instance of this type belongs to.
     * @type {pc.Application}
     * @memberof ScriptType
     */
    public app: pc.Application;
    /**
     * 	The pc.Entity that the instance of this type belongs to.
     * @type {pc.Entity}
     * @memberof ScriptType
     */
    public entity: pc.Entity;
    /**
     * True if the instance of this type is in running state.
     * @type {boolean}
     * @memberof ScriptType
     */
    public enabled: boolean;    
}
/**
 * PlayCanvas Toolkit Bundle - Version 1.4.3 
 * ==============================================================================
 * Class decorator allowing the use of ES6 classes to define and create PlayCanvas script types. 
 * @param {pc.Application} [app]
 */
const createScript = function(app?: pc.Application) {
    return function (obj: any) {
        const instance:any = new obj();
        if (instance && instance.constructor && instance.constructor.name) {
            const classname:string = instance.constructor.name;
            const script:any = pc.createScript(classname, app);
            const attributes:any = [];
            // ..
            // Add public attributes accessible in the editor
            // ..
            if (instance.attributes) {
                for (let attr in instance.attributes) {
                    attributes.push(attr);
                    script.attributes.add(attr, instance.attributes[attr]);
                }
            }
            // ..
            // Add intance properties and methods to prototype
            // ..
            for (let prop in instance) {
                if (prop === 'attributes' || prop === 'name' || attributes.includes(prop)) {
                    // do nothing
                } else {
                    script.prototype[prop] = instance[prop];
                }
            }
            // ..
            // Add static properties
            // ..
            for (let prop in obj) {
                script[prop] = obj[prop];
            }
        } else {
            console.warn("Failed instantiate a PlayCanvas script class constructor.");
        }
    }
};