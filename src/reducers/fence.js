/**
 * Created by tianzx on 16/8/26.
 */
import {
    FETCH_FENCE_ERROR,
    FETCH_FENCE_PENDING,
    FETCH_FENCE_SUCCESS,
    ADD_FENCE,
    EDIT_FENCE_ERROR,
    EDIT_FENCE_PENDING,
    EDIT_FENCE_SUCCESS,
    SUBMIT_FENCE_ERROR,
    SUBMIT_FENCE_PENDING,
    SUBMIT_FENCE_SUCCESS,
    LIST,
    EDIT,
    ADD,
} from '../actions/fence';

const initialState = {
    /**
     * list 的数据
     */
    data: [],
    /**
     * 存放分页数据
     */
    meta: {},
    /**
     * 区分不同的状态
     */
    message:"",
    /**
     * 区分不同的页面
     * list、edit
     */
    status: LIST,
    /**
     * 单条fence数据
     */
    fence: {}
};

export default function fence(state = initialState, action = {}) {
    switch (action.type) {
        case FETCH_FENCE_PENDING:
            return Object.assign({}, initialState,{message:"pending"});
        case FETCH_FENCE_SUCCESS:
            return Object.assign({}, state, {
                data: action.payload.fences.data,
                meta: action.payload.fences.meta,
                message: "success"
            });
        case FETCH_FENCE_ERROR:
            return {
                ...state,
                fences: null,
                message: action.payload.message
            };
        case ADD_FENCE:
            return Object.assign({}, state, {
                status:action.payload.status
            });
        case EDIT_FENCE_PENDING:
            return Object.assign({}, state,{message:"pending"});
        case EDIT_FENCE_SUCCESS:
            return Object.assign({}, state, {
                fence:action.payload.fence,
                status:EDIT,
                message: "success"
            });
        case EDIT_FENCE_ERROR:
            return Object.assign({}, state,{message:"error"});
        case SUBMIT_FENCE_SUCCESS:
            return Object.assign({}, initialState,{message:"success"})
        case SUBMIT_FENCE_PENDING:
            return Object.assign({}, initialState,{message:"pending"})
        case SUBMIT_FENCE_ERROR:
            return Object.assign({}, initialState,{message:"error"})
        default:
            return state;
    }
}