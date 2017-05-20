import thunkMw from 'redux-thunk';
import {createStore,applyMiddleware,compose} from 'redux';
import {reducer} from '../reducers';

const _state_shape={

    comment:{
        /**
        * 顶级评论数组，只包含当前页的顶级评论
        */
        comments:[
            {id:null,author:{name:'',email:'',avatarUrl:'#',introduction:'',},content:'',createdAt:new Date(),updatedAt:new Date(),upvotes:0,downvotes:0},
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
                rows:[],   // 当前回复分页条件下的回复记录
                count:0    // 总的评论数
            },
        },
        /**
         * 每条评论的次级回复的分页大小
         */
        replyPageSize:6,
    
        replyFormTargetUser:{
            "1": "id of comment to reply"        // "1" 是所属哪个顶级评论下的commentId，也即回复的 replyUnder 作为key
        },
    }



}
   
  


// export const store=createStore( reducer,applyMiddleware(thunkMw));
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducer,  composeEnhancers(
    applyMiddleware( thunkMw, ) 
));