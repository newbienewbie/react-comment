import {deepcopy} from '../../lib/utils'
const assert=require('assert');


describe('test 《utils.js》',function(){


    it("test deepcopy() ",function(){
        const obj={
            a:[1,2,3],
            b:[1,2,4]
        };
        const _obj=deepcopy(obj);
        obj.a[0]="sth";
        assert.equal(_obj.a[0],1);
    });
});