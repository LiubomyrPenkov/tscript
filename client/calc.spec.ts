import {expect} from 'chai';
import {describe, it}  from 'mocha';
import mathFuncs from './calc';

let {sum, division, substr, multi} = mathFuncs;

describe('mathFunsc', (): void=>{
    it('should return proper sum', (): void=>{
        expect(sum(1,3)).to.be.equal(1+3);
    });

    it('should return proper multi', (): void=>{
        expect(multi(2,4)).to.be.equal(2*4);
    });

    it('should return proper division', (): void=>{
        expect(division(4,2)).to.be.equal(4/2);
    });

    it('should return proper substr', (): void=>{
        expect(substr(4,2)).to.be.equal(4-2);
    });
});
