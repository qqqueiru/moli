/**
 * PseudoDate.now() is similar to Date.now() but only useful when calculating relative times,
 * and those times are in different frames.
 * Animation is supposed to run at 60 fps.
 */
class PseudoDate {
    static currentIteration = 0;
    static now() {
        return PseudoDate.currentIteration * 1000 / 60;
    }
}