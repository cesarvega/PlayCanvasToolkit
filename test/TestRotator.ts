/// <reference path="../src/winrt.d.ts" />
/// <reference path="../src/playcanvas.d.ts" />
/// <reference path="../src/playcanvas-tools.ts" />

// Build: tsc -m none TestRotator.ts

/**
 * Toolkit Test Rotator Class
 * @export
 * @class CanvasScript
 */
@createScript()
class TestRotator extends CanvasScript implements ScriptType {
    
    protected update(delta: number) {
        this.entity.rotate(0, 10 * delta, 0);
    }
    
}
