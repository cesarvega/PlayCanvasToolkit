The [PlayCanvas Engine Only](https://github.com/playcanvas/engine) toolkit enables modern **Unity-Style** game development using the Unity game editor and open source **WebGL**, **WebVR**, **WebAudio** and **GLTF** technologies to export scene content for the PlayCanvas game engine.

Toolkit Distribution Files:

* winrt.d.ts - Windows Runtime Xbox Live Declarations

* playcanvas.d.ts - PlayCanvas Game Engine Declarations

* playcanvas.toolkit.js - PlayCanvas Game Development Tools Bundle

* playcanvas.toolkit.d.ts - PlayCanvas Game Development Type Declarations


# Build Toolkit Package

Execute node package manager installer to initialize project

    npm install

Build project library project files

    gulp


# Require Script Libraries

The PlayCanvas toolkit provides an extension method called **require** to the **pc.Application** prototype to load required script library dependencies. Including your component script backing classes. The method takes a string or a string array of script library urls. The method will **sequentially** load all required script libraries and execute the specfied callback function on complete.

    var canvas = document.getElementById("application");
    var libs = ["test/TestRotator.js"];
    var app = new pc.Application(canvas, { });
    app.require(libs, function() {
        app.start();
    }


# Toolkit Script Classes 

To create **JavaScript** component classes:

    var TestRotator = pc.createScript("TestRotator");
    TestRotator.prototype.update = function (delta) {
        this.entity.rotate(0, 10 * delta, 0);
    };

To create **TypeScript** component classes:

    @createScript()
    class TestRotator extends CanvasScript implements ScriptType {
        protected update(delta: number) {
            this.entity.rotate(0, 10 * delta, 0);
        }
    }

The PlayCanvas toolkit includes a **CanvasScript** base class allows easy TypeScript subclassing of PlayCanvas script classes

    /**
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


# Create Script Decorator

The PlayCanvas toolkit includes a **create script** tool that is ported from the Neoflash [Create Script Decorator](https://github.com/Neoflash1979/typescript-playcanvas-template/blob/master/lib/create-script-decorator.ts) plugin to enable **constructor** class names. 

    /**
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


# Transmission File Format

The PlayCanvas toolkit includes a **scene loader** tool that is ported from the PlayCanvas [GLTF Transmission Format](https://github.com/playcanvas/playcanvas-gltf) to allow for scene and entity metadata deserialztion. 

.