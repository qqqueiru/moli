/**
 * PseudoDate.now() is similar to Date.now() but only useful when calculating relative times,
 * and those times are in different frames.
 * Animation is supposed to run at 60 fps.
 */
class PseudoDate {
    static currentIteration = 0;
    static lastPushIteration = 0;
    static push() {
        PseudoDate.lastPushIteration = PseudoDate.currentIteration;
    }
    static pop() {
        PseudoDate.currentIteration = PseudoDate.lastPushIteration;
    }
    static now() {
        return PseudoDate.currentIteration * 1000 / 60;
    }
    static reset() {
        PseudoDate.currentIteration = 0;
    }
}