import thunkMw from 'redux-thunk';
import {createStore,applyMiddleware,compose} from 'redux';
import {reducer} from '../reducers';
import {ANONYMOUS_USER} from '../misc/user-contants';

const _state_shape={

    comment:{
        /**
        * 顶级评论数组，只包含当前页的顶级评论
        */
        comments:[
            {id:null,author:1,content:'',createdAt:new Date(),updatedAt:new Date(),upvotes:0,downvotes:0},
        ],
        /**
        * 总评论数量，用于分页
        */
        commentsCount:0,
        /**
        * 顶级评论的分页大小
        */
        commentPageSize:10,
        /**
         * 顶级评论的分页页码
         */
        commentPage:1,
    },

    reply:{

        /**
         * 当前页各顶级评论的次级回复信息组成的列表——不是数组，是普通Object，按comment.id 建立索引。
         */
        replies:{
            "1":{          // "1" 是commentId
                rows:[
                    {id:1,/* ... */author:'1'},
                ],   // 当前回复分页条件下的回复记录
                count:0,    // 总的评论数
                page:1,
                wantToreplyTo:null, // 当前回复组件中的回复表单正在回复那条回复或者是顶级评论
            },
        },
        /**
         * 每条评论的次级回复的分页大小
         */
        replyPageSize:6,
    
        replyFormTargetUser:{
            "1": "id of comment to reply"        // "1" 是所属哪个顶级评论下的commentId，也即回复的 replyUnder 作为key
        },
    },

    user:{
        list:{
            1:{ id:1,name:'',email:'',avatarUrl:'#',introduction:'', },
            2:{ id:2,name:'',email:'',avatarUrl:'#',introduction:'', },
            3:{ id:3,name:'',email:'',avatarUrl:'#',introduction:'', },
        },
        currentLoginUser:1,
        hasSignedIn:false,
    },
    


}
   
  


// export const store=createStore( reducer,applyMiddleware(thunkMw));
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
    reducer, 
    {
        user:{
            list:[],
            currentLoginUser:ANONYMOUS_USER,
            hasSignedIn:false,
        }
    },
    composeEnhancers(
        applyMiddleware( thunkMw, ) 
    )
);