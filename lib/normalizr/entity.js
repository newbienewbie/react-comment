import {schema} from 'normalizr';


export const userEntity=new schema.Entity('users');
export const commentEntity=new schema.Entity('comments',{author:userEntity});
export const replyEntity=new schema.Entity('replies',{author:userEntity});


